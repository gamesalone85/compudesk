/*
========================================
COMPU DESK
Portal Clientes Login JS
Versión 1.1
========================================
*/


document.addEventListener(
"DOMContentLoaded",
function(){


console.log(
"Login Portal Clientes Compu Desk cargado"
);





/*
========================================
MOSTRAR / OCULTAR CONTRASEÑA
========================================
*/


const passwordInput =
document.getElementById("password");


const togglePassword =
document.getElementById("togglePassword");



if(togglePassword && passwordInput){


togglePassword.addEventListener(
"click",
function(){


const type =
passwordInput.getAttribute("type")
===
"password"
?
"text"
:
"password";



passwordInput.setAttribute(
"type",
type
);



this.innerHTML =
type === "password"
?
'<i class="fa-solid fa-eye"></i>'
:
'<i class="fa-solid fa-eye-slash"></i>';



});


}






/*
========================================
LOGIN
========================================
*/


const form =
document.getElementById("loginForm");



if(form){


form.addEventListener(
"submit",
function(e){


e.preventDefault();



const email =
document.getElementById("email").value.trim();



const password =
document.getElementById("password").value.trim();



const remember =
document.getElementById("remember").checked;





/*
========================================
VALIDACIÓN BÁSICA
========================================
*/


if(
email === ""
||
password === ""
){


mostrarMensaje(
"Completa todos los campos",
"error"
);


return;


}





/*
========================================
LOGIN TEMPORAL DE PRUEBA
========================================

Después será reemplazado
por Firebase Authentication

========================================
*/


const usuarioDemo = {


correo:
"admin@compudesk.org",


password:
"CompuDesk2026",


datos:{


id:"001",


nombre:"Administrador",


empresa:"Compu Desk",


plan:"Administrador"


}


};





if(
email === usuarioDemo.correo
&&
password === usuarioDemo.password

){



localStorage.setItem(
"clienteCompudesk",
JSON.stringify(
usuarioDemo.datos
)
);



if(remember){


localStorage.setItem(
"recordarCliente",
"true"
);


}



mostrarMensaje(
"Acceso correcto",
"success"
);




setTimeout(
function(){


window.location.href =
"dashboard.html";


},
1000
);




}else{



mostrarMensaje(
"Correo o contraseña incorrectos",
"error"
);



}




});


}






/*
========================================
MENSAJES
========================================
*/


function mostrarMensaje(
mensaje,
tipo
){



let alerta =
document.querySelector(
".login-alert"
);



if(!alerta){


alerta =
document.createElement(
"div"
);



alerta.className =
"login-alert";



const card =
document.querySelector(
".login-card"
);



card.insertBefore(
alerta,
card.firstChild
);



}




alerta.textContent =
mensaje;



alerta.className =
"login-alert "
+
tipo;



setTimeout(
function(){


alerta.remove();


},
3000
);



}





});
