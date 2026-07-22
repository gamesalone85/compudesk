/*
========================================
COMPU DESK
Nuevo Ticket JS
Versión 1.0
========================================
*/


document.addEventListener(
"DOMContentLoaded",
function(){


console.log(
"Nuevo Ticket cargado"
);




const formulario =
document.getElementById(
"nuevoTicketForm"
);



if(formulario){



formulario.addEventListener(
"submit",
function(e){


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




if(
categoria === ""
||
titulo === ""
||
descripcion === ""
){


mostrarMensaje(
"Completa todos los campos",
"error"
);


return;

}




const ticket = {


categoria,
titulo,
descripcion,


fecha:
new Date()
.toISOString(),


estado:
"Nuevo"


};



console.log(
"Ticket preparado:",
ticket
);



mostrarMensaje(
"Ticket creado correctamente (modo prueba)",
"success"
);



formulario.reset();



});



}





function mostrarMensaje(
texto,
tipo
){


const mensaje =
document.getElementById(
"mensajeTicket"
);



if(mensaje){


mensaje.textContent =
texto;



mensaje.className =
tipo;


}



}



});
