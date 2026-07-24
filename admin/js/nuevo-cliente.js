// ==========================================
// COMPU DESK
// NUEVO CLIENTE
// Producción v1.0
// ==========================================


import {

db

}

from "../../assets/firebase/firebase-config.js";


import {

collection,
addDoc,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



// ==========================================
// ELEMENTOS
// ==========================================


const formulario =

document.getElementById(
"clienteForm"
);


const mensaje =

document.getElementById(
"mensaje"
);





// ==========================================
// GUARDAR
// ==========================================


formulario.addEventListener(

"submit",

async(e)=>{


e.preventDefault();



try{


const admin = JSON.parse(
    localStorage.getItem("compudeskAdmin")
);


if(!admin){

    throw new Error(
        "Sesión administrativa no encontrada"
    );

}




await addDoc(

collection(
db,
"clientes"
),

{


empresa:

document.getElementById(
"empresa"
).value.trim(),



rfc:

document.getElementById(
"rfc"
).value.trim()
.toUpperCase(),



contacto:

document.getElementById(
"contacto"
).value.trim(),



correo:

document.getElementById(
"correo"
).value.trim(),



telefono:

document.getElementById(
"telefono"
).value.trim(),



plan:

document.getElementById(
"plan"
).value,



tipo:

document.getElementById(
"tipo"
).value,



estado:

document.getElementById(
"estado"
).value,



fechaAlta:

serverTimestamp(),



creadoPor:

admin.uid,


creadoPorCorreo:

admin.correo


}

);





mostrarMensaje(

"Cliente creado correctamente.",

"success"

);





setTimeout(()=>{


window.location.href="index.html";


},1200);





}

catch(error){


console.error(
error
);



mostrarMensaje(

"No fue posible guardar el cliente.",

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
