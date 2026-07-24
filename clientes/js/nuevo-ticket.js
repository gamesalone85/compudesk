// ==========================================
// COMPU DESK
// NUEVO TICKET CLIENTE
// Producción v1.0
// ==========================================


import {

auth,
db

}

from "../../assets/firebase/firebase-config.js";



import {

doc,
getDoc,
collection,
addDoc,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const form =

document.getElementById(
"ticketForm"
);



form?.addEventListener(

"submit",

async(e)=>{


e.preventDefault();





const user = auth.currentUser;



if(!user){

window.location.href="../login.html";

return;

}





try{



// ================================
// DATOS USUARIO
// ================================


const usuarioRef =

doc(

db,

"usuarios",

user.uid

);



const usuarioSnap =

await getDoc(usuarioRef);



if(!usuarioSnap.exists()){


throw new Error(
"Usuario no encontrado"
);


}



const usuario =

usuarioSnap.data();







// ================================
// DATOS CLIENTE
// ================================


const clienteRef =

doc(

db,

"clientes",

usuario.clienteId

);



const clienteSnap =

await getDoc(clienteRef);



if(!clienteSnap.exists()){


throw new Error(
"Cliente no encontrado"
);


}



const cliente =

clienteSnap.data();








// ================================
// CREAR TICKET
// ================================



await addDoc(

collection(
db,
"tickets"
),

{


clienteId:

usuario.clienteId,


usuarioId:

user.uid,


empresa:

cliente.empresa,


nombreUsuario:

usuario.nombre,



categoria:

document.getElementById(
"categoria"
).value,



prioridad:

document.getElementById(
"prioridad"
).value,



titulo:

document.getElementById(
"titulo"
).value.trim(),



descripcion:

document.getElementById(
"descripcion"
).value.trim(),



estado:

"abierto",



fechaCreacion:

serverTimestamp(),



fechaActualizacion:

serverTimestamp()



}

);





mostrar(

"Ticket creado correctamente",

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



mostrar(

"No fue posible crear el ticket",

"error"

);



}



});








function mostrar(texto,tipo){


const div =

document.getElementById(
"mensaje"
);



div.textContent=texto;


div.className=
"login-alert "+tipo;



}
