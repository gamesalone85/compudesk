/*
==========================================================
COMPU DESK
Support Center
Dashboard JavaScript
Versión 1.1
==========================================================
*/


document.addEventListener(
"DOMContentLoaded",
function(){



console.log(
"Dashboard Compu Desk cargado correctamente"
);




const dashboard = {


cliente:{


id:null,

nombre:null,

empresa:null,

plan:null,

rol:null


}


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


console.log(
"No existe sesión"
);


return;


}




const datos =
JSON.parse(sesion);



console.log(
"Sesión encontrada:",
datos
);



dashboard.cliente.id =
datos.id;



dashboard.cliente.nombre =
datos.nombre;



dashboard.cliente.empresa =
datos.empresa;



dashboard.cliente.plan =
datos.plan;



dashboard.cliente.rol =
datos.rol;



}




/*
==========================================================
MOSTRAR USUARIO
==========================================================
*/


function mostrarUsuario(){



const nombre =
document.getElementById(
"nombreCliente"
);



const usuario =
document.getElementById(
"usuarioNombre"
);



const rol =
document.getElementById(
"usuarioRol"
);



const avatar =
document.getElementById(
"usuarioAvatar"
);





const nombreCliente =
dashboard.cliente.nombre
||
"Usuario";





if(nombre){

nombre.textContent =
nombreCliente;

}




if(usuario){

usuario.textContent =
nombreCliente;

}




if(rol){

rol.textContent =
dashboard.cliente.rol
||
"Usuario";

}




if(avatar){


avatar.textContent =
nombreCliente
.substring(0,2)
.toUpperCase();


}



}




/*
==========================================================
FECHA
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
CERRAR SESIÓN
==========================================================
*/


function cerrarSesion(){


const boton =
document.querySelector(
".fa-right-from-bracket"
);



if(boton){


boton.parentElement
.addEventListener(
"click",
function(){


localStorage.removeItem(
"clienteCompudesk"
);



window.location.href =
"login.html";


});


}


}





/*
==========================================================
INICIO
==========================================================
*/


cargarSesion();

mostrarUsuario();

mostrarFecha();

cerrarSesion();



});
