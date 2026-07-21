/*
========================================
COMPU DESK
Portal Clientes Login JS
========================================
*/


document.addEventListener(
"DOMContentLoaded",
function(){



console.log(
"Login Portal Clientes Compu Desk cargado"
);





// Mostrar / ocultar contraseña


const passwordInput =
document.getElementById("password");


const togglePassword =
document.getElementById("togglePassword");



if(togglePassword){


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





// Validación visual temporal


const form =
document.getElementById("loginForm");



if(form){


form.addEventListener(
"submit",
function(e){


e.preventDefault();



console.log(
"Intento de acceso preparado para Firebase"
);



});


}



});
