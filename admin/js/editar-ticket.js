// ==========================================
// COMPU DESK
// ADMIN EDITAR TICKET
// Producción v2.0
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





// ==========================================
// ELEMENTOS
// ==========================================


const ticketTitulo =
document.getElementById(
"ticketTitulo"
);


const ticketFolio =
document.getElementById(
"ticketFolio"
);


const ticketEmpresa =
document.getElementById(
"ticketEmpresa"
);


const ticketUsuario =
document.getElementById(
"ticketUsuario"
);


const ticketCorreo =
document.getElementById(
"ticketCorreo"
);


const ticketCategoria =
document.getElementById(
"ticketCategoria"
);


const ticketPrioridad =
document.getElementById(
"ticketPrioridad"
);


const ticketEstado =
document.getElementById(
"ticketEstado"
);


const ticketTecnico =
document.getElementById(
"ticketTecnico"
);


const ticketComentarios =
document.getElementById(
"ticketComentarios"
);


const ticketDescripcion =
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


const fechaCreacion =
document.getElementById(
"fechaCreacion"
);


const fechaActualizacion =
document.getElementById(
"fechaActualizacion"
);






// ==========================================
// FORMATO FECHA
// ==========================================


function formatoFecha(fecha){


if(!fecha)

return "--";



if(fecha.toDate){


return fecha
.toDate()
.toLocaleString(
"es-MX"
);

}



return "--";


}






// ==========================================
// MENSAJES
// ==========================================


function mostrarMensaje(
texto,
tipo
){


if(!mensaje)

return;



mensaje.innerHTML =


`

<div class="alert ${tipo}">

${texto}

</div>

`;


}








// ==========================================
// CARGAR TICKET
// ==========================================


async function cargarTicket(){


if(!ticketId){


mostrarMensaje(
"Ticket inválido",
"error"
);


return;


}



try{


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





ticketTitulo.textContent =

ticket.titulo || 
"Sin título";




ticketFolio.textContent =

ticket.folio ||
ticketId;





ticketEmpresa.textContent =

ticket.empresa ||
"--";




ticketUsuario.textContent =

ticket.nombreUsuario ||
"--";




ticketCorreo.textContent =

ticket.correoUsuario ||
"--";




ticketCategoria.textContent =

ticket.categoria ||
"--";




ticketPrioridad.textContent =

ticket.prioridad ||
"--";




ticketEstado.textContent =

ticket.estado ||
"--";




ticketTecnico.textContent =

ticket.tecnicoNombre ||
"Sin asignar";




ticketComentarios.textContent =

ticket.totalComentarios || 
0;




ticketDescripcion.textContent =

ticket.descripcion ||
"Sin descripción";





fechaCreacion.textContent =

formatoFecha(
ticket.fechaCreacion
);



fechaActualizacion.textContent =

formatoFecha(
ticket.ultimaActualizacion
);



nuevoEstado.value =

ticket.estado || 
"abierto";



}



catch(error){


console.error(
"Error cargando ticket:",
error
);



mostrarMensaje(
"Error cargando ticket",
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



const estadoNuevo =
nuevoEstado.value;



try{


const referencia =

doc(
db,
"tickets",
ticketId
);




let datos = {


estado:estadoNuevo,


fechaActualizacion:
serverTimestamp(),


ultimaActualizacion:
serverTimestamp(),


ultimaActividad:
serverTimestamp(),


ultimaRespuesta:
"tecnico"


};






if(
estadoNuevo === "cerrado"
){


datos.fechaCierre =
serverTimestamp();


datos.fechaResolucion =
serverTimestamp();


}





await updateDoc(

referencia,

datos

);





ticketEstado.textContent =
estadoNuevo;



mostrarMensaje(

"Ticket actualizado correctamente",

"success"

);



}



catch(error){


console.error(
"Error actualizando ticket:",
error
);



mostrarMensaje(

"No se pudo actualizar el ticket",

"error"

);



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
// START
// ==========================================


cargarTicket();
