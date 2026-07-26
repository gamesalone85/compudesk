// ==========================================
// COMPU DESK
// PORTAL CLIENTES
// LOGIN
// Producción 4.0
// ==========================================

import {
    auth,
    db
}
from "../../assets/firebase/firebase-config.js";

import {

    signInWithEmailAndPassword,
    browserLocalPersistence,
    browserSessionPersistence,
    setPersistence,
    signOut

}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {

    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc

}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {

    guardarSesion

}
from "./session.js";


// ==========================================
// ELEMENTOS
// ==========================================

const form = document.getElementById("loginForm");

const txtCorreo = document.getElementById("email");

const txtPassword = document.getElementById("password");

const remember = document.getElementById("remember");

const togglePassword =
document.getElementById("togglePassword");


// ==========================================
// VER PASSWORD
// ==========================================

togglePassword?.addEventListener("click",()=>{

    const visible =
    txtPassword.type==="text";

    txtPassword.type =
    visible ? "password":"text";

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

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const correo =
txtCorreo.value.trim().toLowerCase();

const password =
txtPassword.value;


if(!correo || !password){

mostrarMensaje(
"Completa todos los campos.",
"error"
);

return;

}


try{

// Persistencia

await setPersistence(

auth,

remember.checked

?

browserLocalPersistence

:

browserSessionPersistence

);


// Login Firebase

const credencial =
await signInWithEmailAndPassword(

auth,

correo,

password

);

const uid =
credencial.user.uid;


// Buscar perfil

const usuariosQuery =
query(

collection(db,"usuarios"),

where(
"correo",
"==",
correo
)

);

const usuariosSnap =
await getDocs(usuariosQuery);


if(usuariosSnap.empty){

await signOut(auth);

mostrarMensaje(
"No existe un perfil registrado.",
"error"
);

return;

}


const perfilDoc =
usuariosSnap.docs[0];

const perfil =
perfilDoc.data();


// Validaciones

if(perfil.estado!=="activo"){

await signOut(auth);

mostrarMensaje(
"Tu cuenta está deshabilitada.",
"error"
);

return;

}


if(perfil.rol!=="cliente"){

await signOut(auth);

mostrarMensaje(
"Esta cuenta no pertenece al Portal Clientes.",
"error"
);

return;

}


// Buscar empresa

let empresa={};

if(perfil.clienteId){

const empresaSnap =
await getDoc(

doc(

db,

"clientes",

perfil.clienteId

)

);

if(empresaSnap.exists()){

empresa =
empresaSnap.data();

}

}


// ==========================================
// CREAR SESIÓN
// ==========================================

guardarSesion({

uid,

usuarioId:perfilDoc.id,

nombre:perfil.nombre,

correo:perfil.correo,

telefono:perfil.telefono ?? "",

rol:perfil.rol,

estado:perfil.estado,

clienteId:perfil.clienteId,

empresa:empresa.empresa ?? "",

contacto:empresa.contacto ?? "",

empresaCorreo:empresa.correo ?? "",

empresaTelefono:empresa.telefono ?? "",

rfc:empresa.rfc ?? "",

plan:empresa.plan ?? "",

tipo:empresa.tipo ?? ""

});

mostrarMensaje(
"Bienvenido a Compu Desk.",
"success"
);

setTimeout(()=>{

location.href="dashboard.html";

},500);

}

catch(error){

console.error(error);

let mensaje =
"Correo o contraseña incorrectos.";

switch(error.code){

case "auth/user-disabled":
mensaje="Cuenta deshabilitada.";
break;

case "auth/network-request-failed":
mensaje="Sin conexión a Internet.";
break;

case "auth/too-many-requests":
mensaje="Demasiados intentos.";
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

function mostrarMensaje(texto,tipo){

let alerta =
document.querySelector(".login-alert");

if(!alerta){

alerta =
document.createElement("div");

alerta.className="login-alert";

document
.querySelector(".login-card")
.prepend(alerta);

}

alerta.className =
"login-alert "+tipo;

alerta.textContent =
texto;

}
