/*
==========================================================
COMPU DESK
Support Center
Dashboard JavaScript
Versión 1.0
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
CONFIGURACIÓN DASHBOARD
==========================================================
*/


const dashboard = {


    cliente:{

        nombre:"Iván",

        empresa:"Empresa Demo",

        plan:"Soporte Empresarial"

    },


    estadisticas:{


        abiertos:3,

        pendientes:1,

        resueltos:18,

        tiempo:"2 h"


    }


};





/*
==========================================================
CARGAR INFORMACIÓN CLIENTE
==========================================================
*/


function cargarCliente(){


const nombre =
document.getElementById(
"nombreCliente"
);



if(nombre){


nombre.textContent =
dashboard.cliente.nombre;


}



console.log(
"Cliente cargado:",
dashboard.cliente
);



}





/*
==========================================================
ACTUALIZAR WIDGETS
==========================================================
*/


function cargarEstadisticas(){



const widgets = {


"ticketsAbiertos":
dashboard.estadisticas.abiertos,


"ticketsPendientes":
dashboard.estadisticas.pendientes,


"ticketsResueltos":
dashboard.estadisticas.resueltos,


"tiempoPromedio":
dashboard.estadisticas.tiempo



};




Object.keys(widgets).forEach(
function(id){



const elemento =
document.getElementById(id);



if(elemento){


elemento.textContent =
widgets[id];


}



});


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



if(!boton || !sidebar){

return;

}




boton.addEventListener(
"click",
function(){



sidebar.classList.toggle(
"open"
);



});


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



boton.parentElement.addEventListener(
"click",
function(){



console.log(
"Cerrando sesión..."
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
FECHA ACTUAL
==========================================================
*/


function mostrarFecha(){



const fecha =
document.getElementById(
"fechaActual"
);



if(!fecha){

return;

}



const hoy =
new Date();



fecha.textContent =
hoy.toLocaleDateString(
"es-MX",
{

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

}

);



}





/*
==========================================================
INICIALIZACIÓN
==========================================================
*/


cargarCliente();


cargarEstadisticas();


menuMovil();


cerrarSesion();


mostrarFecha();



});
