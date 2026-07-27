// ==========================================
// COMPU DESK
// ADMIN EDITAR TICKET
// Producción v1.1
// ==========================================


import {

db

}

from "../../assets/firebase/firebase-config.js";



import {

doc,
getDoc,
updateDoc,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




// ==========================================
// ID TICKET
// ==========================================


const params =
new URLSearchParams(
    window.location.search
);


const ticketId =
params.get("id");



console.log(
    "Ticket:",
    ticketId
);




// ==========================================
// ELEMENTOS
// ==========================================


const titulo =
document.getElementById(
    "ticketTitulo"
);


const empresa =
document.getElementById(
    "ticketEmpresa"
);


const usuario =
document.getElementById(
    "ticketUsuario"
);


const prioridad =
document.getElementById(
    "ticketPrioridad"
);


const estado =
document.getElementById(
    "ticketEstado"
);


const descripcion =
document.getElementById(
    "ticketDescripcion"
);


const nuevoEstado =
document.getElementById(
    "nuevoEstado"
);


const btnGuardar =
document.getElementById(
    "btnGuardarEstado"
);


const mensaje =
document.getElementById(
    "mensajeTicket"
);





// ==========================================
// MENSAJES
// ==========================================


function mostrarMensaje(
texto,
tipo="success"
){


if(!mensaje)
return;



mensaje.innerHTML = `

<div class="alert ${tipo}">

${texto}

</div>

`;



}






// ==========================================
// CARGAR TICKET
// ==========================================


async function cargarTicket(){


try{


if(!ticketId){


mostrarMensaje(
"ID de ticket inválido",
"error"
);


return;

}




const referencia =
doc(
db,
"tickets",
ticketId
);



const snap =
await getDoc(
referencia
);




if(!snap.exists()){


mostrarMensaje(
"El ticket no existe",
"error"
);


return;

}





const ticket =
snap.data();




titulo.textContent =
ticket.titulo ||
"Ticket sin título";



empresa.textContent =
ticket.empresa ||
"--";



usuario.textContent =
ticket.nombreUsuario ||
"--";



prioridad.textContent =
ticket.prioridad ||
"Media";



estado.textContent =
ticket.estado ||
"abierto";



descripcion.textContent =
ticket.descripcion ||
"Sin descripción";




if(nuevoEstado){

nuevoEstado.value =
ticket.estado ||
"abierto";

}



}


catch(error){


console.error(
"Cargar ticket:",
error
);



mostrarMensaje(
error.message,
"error"
);


}



}






// ==========================================
// ACTUALIZAR ESTADO
// ==========================================


async function actualizarEstado(){



if(!ticketId)
return;



if(!nuevoEstado)
return;




try{


btnGuardar.disabled=true;



await updateDoc(

doc(
db,
"tickets",
ticketId
),

{


estado:
nuevoEstado.value,


ultimaActualizacion:
serverTimestamp()


}

);




estado.textContent =
nuevoEstado.value;




mostrarMensaje(
"Ticket actualizado correctamente"
);




}



catch(error){


console.error(
"Actualizar ticket:",
error
);



mostrarMensaje(
error.message,
"error"
);



}



finally{


btnGuardar.disabled=false;


}



}






// ==========================================
// EVENTO
// ==========================================


if(btnGuardar){


btnGuardar.addEventListener(

"click",

actualizarEstado

);


}




// ==========================================
// INICIO
// ==========================================


cargarTicket();
