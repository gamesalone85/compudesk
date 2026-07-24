// ==========================================
// COMPU DESK
// PORTAL CLIENTES
// LOGIN PRODUCCIÓN v4.0
// Firebase Authentication + Firestore
// ==========================================


import { auth, db } 
from "../../assets/firebase/firebase-config.js";


import {

signInWithEmailAndPassword,
setPersistence,
browserLocalPersistence,
browserSessionPersistence,
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


const form =
document.getElementById("loginForm");


const emailInput =
document.getElementById("email");


const passwordInput =
document.getElementById("password");


const remember =
document.getElementById("remember");


const togglePassword =
document.getElementById("togglePassword");





// ==========================================
// MOSTRAR PASSWORD
// ==========================================


togglePassword?.addEventListener(
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






// ==========================================
// LOGIN
// ==========================================


form?.addEventListener(

"submit",

async(e)=>{


e.preventDefault();





const correo =
emailInput.value.trim();


const password =
passwordInput.value;





if(!correo || !password){

mostrarMensaje(
"Completa todos los campos",
"error"
);

return;

}





try{



await setPersistence(

auth,

remember.checked

?

browserLocalPersistence

:

browserSessionPersistence

);







const credencial =

await signInWithEmailAndPassword(

auth,

correo,

password

);






const user =

credencial.user;






console.log(

"UID Firebase:",

user.uid

);








// ==========================================
// BUSCAR PERFIL USUARIO
// ==========================================


const usuarioRef =

doc(

db,

"usuarios",

user.uid

);





const usuarioSnap =

await getDoc(

usuarioRef

);







if(!usuarioSnap.exists()){


await signOut(auth);


mostrarMensaje(

"Usuario sin perfil registrado.",

"error"

);


return;


}





const usuario =

usuarioSnap.data();







// ==========================================
// VALIDAR ESTADO
// ==========================================


if(usuario.estado !== "activo"){



await signOut(auth);


mostrarMensaje(

"Usuario desactivado.",

"error"

);


return;


}






// ==========================================
// VALIDAR CLIENTE ASIGNADO
// ==========================================


if(!usuario.clienteId){



await signOut(auth);


mostrarMensaje(

"Usuario sin empresa asignada.",

"error"

);


return;


}







// ==========================================
// OBTENER EMPRESA
// ==========================================


const clienteRef =

doc(

db,

"clientes",

usuario.clienteId

);





const clienteSnap =

await getDoc(

clienteRef

);







if(!clienteSnap.exists()){


await signOut(auth);


mostrarMensaje(

"No existe la empresa asociada.",

"error"

);


return;


}






const cliente =

clienteSnap.data();








// ==========================================
// CREAR SESIÓN
// ==========================================


const sesion = {


uid:user.uid,


clienteId:usuario.clienteId,


nombre:usuario.nombre || "",


correo:usuario.correo || correo,


telefono:usuario.telefono || "",


rol:usuario.rol || "cliente",


empresa:cliente.empresa || "",


plan:cliente.plan || "",


rfc:cliente.rfc || "",


estado:usuario.estado


};







localStorage.setItem(

"clienteCompudesk",

JSON.stringify(sesion)

);







console.log(

"Sesión cliente:",

sesion

);







mostrarMensaje(

"Acceso correcto",

"success"

);







setTimeout(()=>{


window.location.href =

"dashboard.html";


},1000);







}

catch(error){



console.error(

"Error login:",

error

);




let mensaje =

"Correo o contraseña incorrectos.";





switch(error.code){


case "auth/too-many-requests":

mensaje =
"Demasiados intentos. Intenta más tarde.";

break;



case "auth/network-request-failed":

mensaje =
"Error de conexión.";

break;



}




mostrarMensaje(

mensaje,

"error"

);



}




});








// ==========================================
// MENSAJES
// ==========================================


function mostrarMensaje(

texto,

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



document
.querySelector(".login-card")
.prepend(alerta);


}





alerta.textContent =
texto;



alerta.className =

"login-alert " + tipo;




}
