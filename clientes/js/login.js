// ==========================================
// COMPU DESK
// PORTAL CLIENTES LOGIN
// Producción v1.0
// Firebase Authentication + Firestore
// ==========================================


import {
    auth,
    db
}
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


const email =
document.getElementById("email");


const password =
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
password.type === "text";


password.type =
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
email.value.trim();



const clave =
password.value;



if(
!correo ||
!clave
){


mostrarMensaje(
"Completa todos los campos.",
"error"
);


return;


}




try{



// ==========================================
// PERSISTENCIA
// ==========================================


await setPersistence(

auth,

remember?.checked

?

browserLocalPersistence

:

browserSessionPersistence

);





// ==========================================
// FIREBASE AUTH
// ==========================================


const credencial =

await signInWithEmailAndPassword(

auth,

correo,

clave

);





const usuarioAuth =

credencial.user;



const uid =

usuarioAuth.uid;





console.log(
"UID Firebase:",
uid
);






// ==========================================
// BUSCAR USUARIO
// usuarios/{UID}
// ==========================================


const usuarioRef =

doc(

db,

"usuarios",

uid

);



const usuarioSnap =

await getDoc(
usuarioRef
);






if(
!usuarioSnap.exists()
){


await signOut(auth);


mostrarMensaje(

"Usuario sin perfil registrado en Compu Desk.",

"error"

);


return;


}






const usuario =

usuarioSnap.data();






// ==========================================
// VALIDAR ROL
// ==========================================


if(
usuario.rol !== "cliente"
){


await signOut(auth);


mostrarMensaje(

"Esta cuenta no pertenece al portal clientes.",

"error"

);


return;


}





// ==========================================
// VALIDAR ESTADO
// ==========================================


if(
usuario.estado !== "activo"
){


await signOut(auth);


mostrarMensaje(

"Usuario desactivado. Contacta soporte.",

"error"

);


return;


}






// ==========================================
// BUSCAR EMPRESA
// ==========================================


let empresa = {};



if(usuario.clienteId){



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



if(
clienteSnap.exists()
){

empresa =
clienteSnap.data();

}


}







// ==========================================
// CREAR SESIÓN
// ==========================================


const sesion = {


uid:

uid,


nombre:

usuario.nombre || "",



correo:

usuario.correo || correo,



telefono:

usuario.telefono || "",



rol:

usuario.rol,



clienteId:

usuario.clienteId || "",



empresa:

empresa.empresa || "",



plan:

empresa.plan || "",



estado:

usuario.estado



};






localStorage.setItem(

"clienteCompudesk",

JSON.stringify(
sesion
)

);







mostrarMensaje(

"Acceso correcto.",

"success"

);






setTimeout(()=>{


window.location.href =
"dashboard.html";


},800);






}

catch(error){



console.error(
"Error login cliente:",
error
);



let texto =
"Correo o contraseña incorrectos.";





switch(error.code){


case "auth/too-many-requests":

texto =
"Demasiados intentos. Intenta más tarde.";

break;



case "auth/network-request-failed":

texto =
"Error de conexión.";

break;



case "auth/user-disabled":

texto =
"Usuario bloqueado.";

break;



}



mostrarMensaje(
texto,
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



const card =

document.querySelector(
".login-card"
);



if(card){

card.prepend(alerta);

}


}



alerta.textContent =
texto;



alerta.className =
"login-alert " + tipo;



}
