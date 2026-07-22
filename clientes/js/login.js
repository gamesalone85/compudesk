/*
========================================
COMPU DESK
Portal Clientes Login JS
Versión 2.0
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



if(
togglePassword &&
passwordInput
){


togglePassword.addEventListener(
"click",
function(){


const visible =
passwordInput.type === "text";



passwordInput.type =
visible
?
"password"
:
"text";



this.innerHTML =
visible
?
'<i class="fa-solid fa-eye"></i>'
:
'<i class="fa-solid fa-eye-slash"></i>';



});


}







/*
========================================
FORMULARIO LOGIN
========================================
*/


const form =
document.getElementById(
"loginForm"
);



if(form){



form.addEventListener(
"submit",
function(e){


e.preventDefault();




const email =
document
.getElementById("email")
.value
.trim();



const password =
document
.getElementById("password")
.value
.trim();



const remember =
document
.getElementById("remember")
.checked;






/*
========================================
VALIDACIONES
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
BUSCAR USUARIO
========================================
*/


const usuarioEncontrado =

usuariosCompuDesk.find(

function(usuario){


return (

usuario.correo === email

&&

usuario.password === password


);


}


);







/*
========================================
ACCESO CORRECTO
========================================
*/


if(usuarioEncontrado){



const datosSesion = {


id:
usuarioEncontrado.id,


nombre:
usuarioEncontrado.nombre,


correo:
usuarioEncontrado.correo,


empresa:
usuarioEncontrado.empresa,


plan:
usuarioEncontrado.plan,


rol:
usuarioEncontrado.rol,


horario:
usuarioEncontrado.horario,


contacto:
usuarioEncontrado.contacto



};




localStorage.setItem(

"clienteCompudesk",

JSON.stringify(
datosSesion
)

);





if(remember){


localStorage.setItem(
"recordarCliente",
"true"
);


}




console.log(
"Sesión creada:",
datosSesion
);




mostrarMensaje(
"Acceso correcto",
"success"
);





setTimeout(
function(){


window.location.href =
"dashboard.html";


},
800
);




}



/*
========================================
ERROR LOGIN
========================================
*/


else{


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



if(card){


card.insertBefore(
alerta,
card.firstChild
);


}


}




alerta.textContent =
mensaje;



alerta.className =
"login-alert "
+
tipo;




setTimeout(
function(){


if(alerta){

alerta.remove();

}


},
3000
);



}




});
