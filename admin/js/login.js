// ==========================================
// COMPU DESK
// Login Firebase Authentication
// Admin + Usuarios
// ==========================================


import {

auth,
db

}

from "../../assets/firebase/firebase-config.js";



import {

signInWithEmailAndPassword,
signOut

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



import {

doc,
getDoc

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





// ==========================================
// ELEMENTOS
// ==========================================


const formulario =

document.getElementById(
"loginForm"
);



const mensaje =

document.getElementById(
"loginMessage"
);



const togglePassword =

document.getElementById(
"togglePassword"
);



const passwordInput =

document.getElementById(
"password"
);





// ==========================================
// MOSTRAR / OCULTAR PASSWORD
// ==========================================


if(
togglePassword &&
passwordInput
){


togglePassword.addEventListener(
"click",
()=>{


const visible =

passwordInput.type === "text";



passwordInput.type =

visible
?
"password"
:
"text";



togglePassword.innerHTML =

visible

?

'<i class="fa-solid fa-eye"></i>'

:

'<i class="fa-solid fa-eye-slash"></i>';



});


}








// ==========================================
// LOGIN
// ==========================================


if(formulario){


formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();





const correoInput =

document.getElementById(
"email"
);



const passwordInput =

document.getElementById(
"password"
);





if(
!correoInput ||
!passwordInput
){


console.error(
"No se encontraron los campos de login"
);


return;


}





const correo =

correoInput
.value
.trim();




const password =

passwordInput
.value;







if(
correo === "" ||
password === ""
){


mostrarMensaje(
"Completa todos los campos",
"error"
);


return;


}






try{



mostrarMensaje(
"Iniciando sesión...",
""
);





// ==========================================
// FIREBASE AUTH
// ==========================================


const resultado =

await signInWithEmailAndPassword(

auth,

correo,

password

);





const usuarioAuth =

resultado.user;





console.log(
"Firebase Auth:",
usuarioAuth.uid
);









// ==========================================
// VALIDAR ADMIN
// ==========================================


const adminRef =

doc(

db,

"admins",

usuarioAuth.uid

);



const adminSnap =

await getDoc(
adminRef
);





if(
adminSnap.exists()
){



const datosAdmin = {


uid:

usuarioAuth.uid,


...adminSnap.data()


};





localStorage.setItem(

"compudeskAdmin",

JSON.stringify(
datosAdmin
)

);






mostrarMensaje(
"Acceso correcto",
"success"
);





setTimeout(
()=>{


window.location.href =

"dashboard.html";


},
800
);



return;


}









// ==========================================
// VALIDAR USUARIO CLIENTE
// ==========================================


const usuarioRef =

doc(

db,

"usuarios",

usuarioAuth.uid

);




const usuarioSnap =

await getDoc(
usuarioRef
);







if(
!usuarioSnap.exists()
){



mostrarMensaje(

"Usuario no registrado en el sistema.",

"error"

);



await signOut(auth);


return;


}








const usuario =

usuarioSnap.data();







// ==========================================
// ESTADO
// ==========================================


if(
usuario.estado !== "activo"
){



mostrarMensaje(

"Usuario desactivado. Contacta a soporte.",

"error"

);



await signOut(auth);


return;


}








// ==========================================
// GUARDAR SESION CLIENTE
// ==========================================


localStorage.setItem(

"clienteCompudesk",

JSON.stringify({

uid:

usuarioAuth.uid,


...usuario


})

);







mostrarMensaje(
"Acceso correcto",
"success"
);





setTimeout(
()=>{


window.location.href =

"../clientes/dashboard.html";


},
800
);







}

catch(error){



console.error(

"Error login Firebase:",

error

);




let texto =

"Error al iniciar sesión.";






switch(error.code){



case "auth/invalid-credential":

texto =
"Correo o contraseña incorrectos.";

break;



case "auth/user-not-found":

texto =
"Usuario no encontrado.";

break;



case "auth/wrong-password":

texto =
"Contraseña incorrecta.";

break;



case "auth/too-many-requests":

texto =
"Demasiados intentos. Intenta más tarde.";

break;



}





mostrarMensaje(
texto,
"error"
);



}



});


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





mensaje.textContent =

texto;



mensaje.className =

"login-message " + tipo;




}
