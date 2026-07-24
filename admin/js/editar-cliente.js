// ==========================================
// COMPU DESK
// EDITAR CLIENTE
// Producción v1.0
// ==========================================


import {

db

}

from "../../assets/firebase/firebase-config.js";


import {

doc,
getDoc,
updateDoc

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




// ==========================================
// ID CLIENTE
// ==========================================


const parametros =

new URLSearchParams(
window.location.search
);


const clienteId =

parametros.get(
"id"
);



if(!clienteId){

window.location.href="index.html";

}



// ==========================================
// ELEMENTOS
// ==========================================


const formulario =

document.getElementById(
"editarClienteForm"
);


const mensaje =

document.getElementById(
"mensaje"
);




// ==========================================
// CARGAR DATOS
// ==========================================


async function cargarCliente(){


try{


const referencia =

doc(
db,
"clientes",
clienteId
);



const snapshot =

await getDoc(
referencia
);



if(!snapshot.exists()){


alert(
"Cliente no encontrado"
);


window.location.href="index.html";


return;


}



const cliente =

snapshot.data();





document.getElementById("empresa").value =
cliente.empresa || "";


document.getElementById("rfc").value =
cliente.rfc || "";


document.getElementById("contacto").value =
cliente.contacto || "";


document.getElementById("correo").value =
cliente.correo || "";


document.getElementById("telefono").value =
cliente.telefono || "";


document.getElementById("plan").value =
cliente.plan || "Enterprise";


document.getElementById("tipo").value =
cliente.tipo || "empresa";


document.getElementById("estado").value =
cliente.estado || "activo";



}

catch(error){


console.error(error);


}



}





// ==========================================
// ACTUALIZAR
// ==========================================


formulario.addEventListener(

"submit",

async(e)=>{


e.preventDefault();



try{


await updateDoc(


doc(
db,
"clientes",
clienteId
),


{


empresa:

document.getElementById("empresa").value.trim(),



rfc:

document.getElementById("rfc").value.trim().toUpperCase(),



contacto:

document.getElementById("contacto").value.trim(),



correo:

document.getElementById("correo").value.trim(),



telefono:

document.getElementById("telefono").value.trim(),



plan:

document.getElementById("plan").value,



tipo:

document.getElementById("tipo").value,



estado:

document.getElementById("estado").value


}


);



mostrarMensaje(
"Cliente actualizado correctamente.",
"success"
);



setTimeout(()=>{


window.location.href="index.html";


},1200);



}

catch(error){


console.error(error);


mostrarMensaje(
"No fue posible actualizar.",
"error"
);


}



}



);






function mostrarMensaje(texto,tipo){


mensaje.textContent=texto;


mensaje.className=

"login-message "+tipo;


}





cargarCliente();
