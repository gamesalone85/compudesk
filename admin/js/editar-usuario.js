// ==========================================
// COMPU DESK
// EDITAR USUARIO
// Producción v1.0
// ==========================================


import {

db

}

from "../../assets/firebase/firebase-config.js";



import {

doc,
getDoc,
getDocs,
collection,
updateDoc

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const parametros =

new URLSearchParams(
window.location.search
);



const usuarioId =

parametros.get("id");




if(!usuarioId){

window.location.href="index.html";

}




const formulario =

document.getElementById(
"editarUsuarioForm"
);


const mensaje =

document.getElementById(
"mensaje"
);


const clienteSelect =

document.getElementById(
"clienteId"
);





// ==========================================
// CARGAR EMPRESAS
// ==========================================


async function cargarClientes(){


const snapshot =

await getDocs(

collection(
db,
"clientes"
)

);



snapshot.forEach(
(cliente)=>{


const datos =
cliente.data();



const option =
document.createElement(
"option"
);


option.value =
cliente.id;


option.textContent =
datos.empresa;



clienteSelect.appendChild(
option
);


});


}







// ==========================================
// CARGAR USUARIO
// ==========================================


async function cargarUsuario(){


const referencia =

doc(
db,
"usuarios",
usuarioId
);



const snapshot =

await getDoc(
referencia
);



if(!snapshot.exists()){


alert(
"Usuario no encontrado"
);


window.location.href="index.html";


return;


}




const usuario =

snapshot.data();





document.getElementById("nombre").value =
usuario.nombre || "";



document.getElementById("correo").value =
usuario.correo || "";



document.getElementById("telefono").value =
usuario.telefono || "";



document.getElementById("rol").value =
usuario.rol || "cliente";



document.getElementById("estado").value =
usuario.estado || "pendiente";



await cargarClientes();



clienteSelect.value =
usuario.clienteId;





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
"usuarios",
usuarioId
),

{


nombre:

document.getElementById("nombre").value.trim(),



correo:

document.getElementById("correo").value.trim(),



telefono:

document.getElementById("telefono").value.trim(),



clienteId:

clienteSelect.value,



rol:

document.getElementById("rol").value,



estado:

document.getElementById("estado").value


}


);





mostrarMensaje(

"Usuario actualizado correctamente.",

"success"

);





setTimeout(()=>{


window.location.href="index.html";


},1200);





}

catch(error){


console.error(error);



mostrarMensaje(

"No fue posible actualizar usuario.",

"error"

);


}



});








function mostrarMensaje(texto,tipo){


mensaje.textContent =
texto;


mensaje.className =
"login-message "+tipo;


}





cargarUsuario();
