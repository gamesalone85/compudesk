/*
========================================
COMPU DESK
Crear Nuevo Ticket
Firebase Firestore
========================================
*/


import { db } from "../../assets/firebase/firebase-config.js";


import {

collection,
addDoc,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const formulario =
document.getElementById(
"nuevoTicketForm"
);





const mensaje =
document.getElementById(
"mensajeTicket"
);






if(formulario){



formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();





const categoria =
document.getElementById(
"categoria"
).value;




const titulo =
document.getElementById(
"titulo"
).value.trim();




const descripcion =
document.getElementById(
"descripcion"
).value.trim();




const prioridad =
document.getElementById(
"prioridad"
).value;





if(
categoria === "" ||
titulo === "" ||
descripcion === ""
){


mostrarMensaje(
"Completa todos los campos",
"error"
);


return;


}





const cliente =

JSON.parse(

localStorage.getItem(
"clienteCompudesk"
)

);






if(!cliente){


mostrarMensaje(
"No existe sesión activa",
"error"
);


return;


}






const nuevoTicket = {


clienteId:
cliente.id || "",



empresa:
cliente.empresa || "",



cliente:
cliente.nombre || "",



correo:
cliente.correo || "",



categoria,

titulo,

descripcion,

prioridad,



estado:
"Abierto",



fechaCreacion:
serverTimestamp(),



fechaActualizacion:
serverTimestamp()



};







try{


await addDoc(

collection(
db,
"tickets"
),

nuevoTicket

);





mostrarMensaje(
"Ticket enviado correctamente",
"success"
);





formulario.reset();



}

catch(error){



console.error(
"Error:",
error
);



mostrarMensaje(
"Error creando ticket",
"error"
);



}



});

}



function mostrarMensaje(
texto,
tipo
){



if(mensaje){


mensaje.textContent =
texto;



mensaje.className =
tipo;


}



}
