// ==========================================
// COMPU DESK
// NUEVO USUARIO
// Producción v1.0
// ==========================================


import {

db

}

from "../../assets/firebase/firebase-config.js";



import {

collection,
getDocs,
addDoc,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




// ELEMENTOS


const clienteSelect =
document.getElementById("clienteId");


const formulario =
document.getElementById("usuarioForm");


const mensaje =
document.getElementById("mensaje");





// ==========================================
// CARGAR CLIENTES
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
(doc)=>{


const cliente =
doc.data();



const option =
document.createElement(
"option"
);


option.value =
doc.id;


option.textContent =
cliente.empresa;


clienteSelect.appendChild(
option
);



});



}




// ==========================================
// GUARDAR USUARIO
// ==========================================


formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



try{


const admin =
JSON.parse(
localStorage.getItem(
"compudeskAdmin"
)
);





await addDoc(

collection(
db,
"usuarios"
),

{


nombre:

document.getElementById(
"nombre"
).value.trim(),



correo:

document.getElementById(
"correo"
).value.trim(),



telefono:

document.getElementById(
"telefono"
).value.trim(),



clienteId:

clienteSelect.value,



rol:

document.getElementById(
"rol"
).value,



estado:

document.getElementById(
"estado"
).value,



creadoPor:

admin.uid,



creadoPorCorreo:

admin.correo,



fechaAlta:

serverTimestamp()



}

);





mostrarMensaje(

"Usuario creado correctamente.",

"success"

);




setTimeout(()=>{


window.location.href =
"index.html";


},1200);



}

catch(error){


console.error(error);


mostrarMensaje(

"No fue posible crear usuario.",

"error"

);


}



});







function mostrarMensaje(
texto,
tipo
){


mensaje.textContent =
texto;


mensaje.className =
"login-message "+tipo;


}




cargarClientes();
