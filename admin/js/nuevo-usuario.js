// ==========================================
// COMPU DESK ADMIN
// Nuevo Usuario
// Firebase Authentication + Firestore
// ==========================================


import { 
    db,
    auth
} from "../../assets/firebase/firebase-config.js";



import {

    collection,
    addDoc,
    serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



import {

    createUserWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";





// ==========================================
// ELEMENTOS
// ==========================================


const formulario =
document.getElementById(
    "usuarioForm"
);



const mensaje =
document.getElementById(
    "mensaje"
);






// ==========================================
// ADMIN ACTUAL
// ==========================================


const admin =
JSON.parse(
    localStorage.getItem(
        "compudeskAdmin"
    )
);







// ==========================================
// CREAR USUARIO
// ==========================================


formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



try{



mensaje.textContent =
"Creando usuario...";





// ==========================================
// DATOS FORMULARIO
// ==========================================


const nombre =
document
.getElementById("nombre")
.value
.trim();



const correo =
document
.getElementById("correo")
.value
.trim();



const password =
document
.getElementById("password")
.value;





// ==========================================
// CREAR CUENTA AUTH
// ==========================================


const credencial =

await createUserWithEmailAndPassword(

    auth,

    correo,

    password

);





const uid =
credencial.user.uid;







// ==========================================
// DATOS FIRESTORE
// ==========================================


const usuario = {


uid:



uid,



nombre:



nombre,



correo:



correo,



telefono:

document
.getElementById("telefono")
.value
.trim(),



empresa:

document
.getElementById("empresa")
.value
.trim(),



rol:

document
.getElementById("rol")
.value,



estado:

document
.getElementById("estado")
.value,



fechaAlta:

serverTimestamp(),



creadoPor:

admin

?
admin.nombre

:

"Administrador"



};








// ==========================================
// GUARDAR PERFIL
// ==========================================


await addDoc(

collection(
db,
"usuarios"
),

usuario

);







mensaje.textContent =

"Usuario creado correctamente.";



mensaje.style.color =

"green";






formulario.reset();






setTimeout(()=>{


window.location.href =

"index.html";


},1500);






}
catch(error){



console.error(

"Error creando usuario:",

error

);





if(error.code === "auth/email-already-in-use"){



mensaje.textContent =

"El correo ya está registrado.";



}

else if(error.code === "auth/weak-password"){



mensaje.textContent =

"La contraseña debe tener mínimo 6 caracteres.";



}

else{



mensaje.textContent =

"Error al crear usuario.";



}



mensaje.style.color =

"red";



}



});
