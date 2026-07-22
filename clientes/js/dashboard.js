/*
==========================================================
COMPU DESK
Support Center
Dashboard JavaScript
Versión 2.0
==========================================================
*/


document.addEventListener(
"DOMContentLoaded",
function(){


console.log(
"Dashboard Compu Desk cargado correctamente"
);



/*
==========================================================
MODELO DE DATOS DEL DASHBOARD
==========================================================
*/


const dashboard = {


cliente:{


id:null,

nombre:null,

empresa:null,

plan:null,

rol:null,

horario:null,

contacto:null


},


estadisticas:{


abiertos:0,

pendientes:0,

resueltos:0,

tiempo:"0 h"


},


actividad:[]



};






/*
==========================================================
CARGAR SESIÓN
==========================================================
*/


function cargarSesion(){


const sesion =
localStorage.getItem(
"clienteCompudesk"
);



if(!sesion){


console.warn(
"No existe sesión activa"
);


return;


}



try{


const datos =
JSON.parse(sesion);



dashboard.cliente = {


id:
datos.id || null,


nombre:
datos.nombre || "Usuario",


empresa:
datos.empresa || "Empresa no asignada",


plan:
datos.plan || "Sin plan",


rol:
datos.rol || "Cliente",


horario:
datos.horario || "Lunes a Viernes 09:00 - 18:00",


contacto:
datos.contacto || "soporte@compudesk.org"


};



console.log(
"Cliente cargado:",
dashboard.cliente
);



}

catch(error){


console.error(
"Error leyendo sesión",
error
);


}



}






/*
==========================================================
MOSTRAR INFORMACIÓN USUARIO
==========================================================
*/


function mostrarUsuario(){


const nombreCliente =
document.getElementById(
"nombreCliente"
);


const usuarioNombre =
document.getElementById(
"usuarioNombre"
);


const usuarioRol =
document.getElementById(
"usuarioRol"
);


const avatar =
document.getElementById(
"usuarioAvatar"
);



let nombre =
dashboard.cliente.nombre;



if(nombreCliente){

nombreCliente.textContent =
nombre;

}



if(usuarioNombre){

usuarioNombre.textContent =
nombre;

}



if(usuarioRol){

usuarioRol.textContent =
dashboard.cliente.rol;

}



if(avatar){


avatar.textContent =
nombre
.substring(0,2)
.toUpperCase();


}



}







/*
==========================================================
DATOS EMPRESA
==========================================================
*/


function mostrarEmpresa(){



const empresa =
document.getElementById(
"empresaCliente"
);



const plan =
document.getElementById(
"planCliente"
);



const horario =
document.getElementById(
"horarioCliente"
);



const contacto =
document.getElementById(
"contactoCliente"
);




if(empresa){

empresa.textContent =
dashboard.cliente.empresa;

}



if(plan){

plan.textContent =
dashboard.cliente.plan;

}



if(horario){

horario.textContent =
dashboard.cliente.horario;

}



if(contacto){

contacto.textContent =
dashboard.cliente.contacto;

}



}






/*
==========================================================
WIDGETS TICKETS
==========================================================
*/


function mostrarEstadisticas(){



const elementos = {


ticketsAbiertos:
dashboard.estadisticas.abiertos,


ticketsPendientes:
dashboard.estadisticas.pendientes,


ticketsResueltos:
dashboard.estadisticas.resueltos,


tiempoPromedio:
dashboard.estadisticas.tiempo


};




Object.keys(elementos)
.forEach(
function(id){


const elemento =
document.getElementById(id);



if(elemento){


elemento.textContent =
elementos[id];


}


});


}






/*
==========================================================
ACTIVIDAD RECIENTE
==========================================================
*/


function mostrarActividad(){



const contenedor =
document.getElementById(
"actividadReciente"
);



if(!contenedor){

return;

}



if(
dashboard.actividad.length === 0
){


contenedor.innerHTML = `

<p>
No existen actividades recientes.
</p>

`;



return;

}




let html = "";



dashboard.actividad.forEach(
function(item){


html += `

<div class="activity-item">

<strong>
${item.titulo}
</strong>

<p>
${item.fecha}
</p>

</div>


`;


});



contenedor.innerHTML =
html;



}






/*
==========================================================
FECHA ACTUAL
==========================================================
*/


function mostrarFecha(){


const fecha =
document.getElementById(
"fechaActual"
);



if(fecha){


fecha.textContent =
new Date()
.toLocaleDateString(
"es-MX",
{

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

}

);


}



}






/*
==========================================================
MENU MOVIL
==========================================================
*/


function menuMovil(){



const boton =
document.querySelector(
".cd-menu-toggle"
);



const sidebar =
document.querySelector(
".cd-sidebar"
);



if(
boton &&
sidebar
){


boton.addEventListener(
"click",
function(){


sidebar.classList.toggle(
"open"
);


});


}


}






/*
==========================================================
CERRAR SESIÓN
==========================================================
*/


function cerrarSesion(){


const boton =
document.querySelector(
".fa-right-from-bracket"
);



if(!boton){

return;

}



boton.parentElement
.addEventListener(
"click",
function(){


console.log(
"Cerrando sesión"
);



localStorage.removeItem(
"clienteCompudesk"
);



window.location.href =
"login.html";


});


}






/*
==========================================================
INICIALIZACIÓN
==========================================================
*/


cargarSesion();


mostrarUsuario();


mostrarEmpresa();


mostrarEstadisticas();


mostrarActividad();


mostrarFecha();


menuMovil();


cerrarSesion();



});
