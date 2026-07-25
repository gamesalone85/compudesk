// ==========================================
// COMPU DESK
// PORTAL CLIENTES LOGIN
// Producción
// Firebase Authentication
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

collection,
query,
where,
getDocs

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




// ELEMENTOS


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





// PASSWORD

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








form.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const correo =
email.value.trim().toLowerCase();


const clave =
password.value;




if(!correo || !clave){

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





// LOGIN FIREBASE


const credencial =

await signInWithEmailAndPassword(

auth,

correo,

clave

);



const uid =
credencial.user.uid;






// BUSCAR PERFIL POR CORREO


const q = query(

collection(db,"usuarios"),

where(
"correo",
"==",
correo
)

);



const snap =
await getDocs(q);





if(snap.empty){


await signOut(auth);


mostrarMensaje(
"No existe perfil registrado",
"error"
);


return;


}





const documento =
snap.docs[0];


const usuario =
documento.data();







if(usuario.rol !== "cliente"){


await signOut(auth);


mostrarMensaje(
"Usuario no pertenece al portal clientes",
"error"
);


return;


}





if(usuario.estado !== "activo"){


await signOut(auth);


mostrarMensaje(
"Usuario desactivado",
"error"
);


return;


}







// GUARDAR SESION


const sesion = {


uid:uid,


usuarioId:documento.id,


nombre:usuario.nombre || "",


correo:usuario.correo,


telefono:usuario.telefono || "",


clienteId:usuario.clienteId || "",


rol:usuario.rol,


estado:usuario.estado


};





localStorage.setItem(

"clienteCompudesk",

JSON.stringify(sesion)

);





mostrarMensaje(
"Acceso correcto",
"success"
);




setTimeout(()=>{


window.location.href="dashboard.html";


},800);





}

catch(error){



console.error(error);


mostrarMensaje(

"Correo o contraseña incorrectos",

"error"

);



}



});






function mostrarMensaje(
texto,
tipo
){



let alerta =
document.querySelector(".login-alert");



if(!alerta){


alerta=document.createElement("div");


alerta.className="login-alert";


document
.querySelector(".login-card")
.prepend(alerta);


}



alerta.textContent=texto;


alerta.className=
"login-alert "+tipo;



}
