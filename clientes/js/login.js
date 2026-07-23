/*
========================================
COMPU DESK
Portal Clientes Login
Firebase Authentication + Firestore
Versión 3.0
========================================
*/


import { auth, db } 
from "../../assets/firebase/firebase-config.js";


import {

signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {

collection,
query,
where,
getDocs

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





console.log(
"Login Firebase Compu Desk cargado"
);





/*
========================================
MOSTRAR / OCULTAR PASSWORD
========================================
*/


const passwordInput =
document.getElementById(
"password"
);


const togglePassword =
document.getElementById(
"togglePassword"
);



if(
togglePassword &&
passwordInput
){


togglePassword.addEventListener(
"click",
()=>{


const tipo =

passwordInput.type === "password"

?
"text"

:
"password";



passwordInput.type = tipo;



togglePassword.innerHTML =

tipo === "text"

?

'<i class="fa-solid fa-eye-slash"></i>'

:

'<i class="fa-solid fa-eye"></i>';



});


}





/*
========================================
LOGIN
========================================
*/


const formulario =

document.getElementById(
"loginForm"
);





formulario.addEventListener(
"submit",
async(e)=>{


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







if(
email === "" ||
password === ""
){


mostrarMensaje(
"Completa todos los campos",
"error"
);


return;


}





try{


/*
================================
AUTENTICAR FIREBASE
================================
*/


const credencial =

await signInWithEmailAndPassword(

auth,

email,

password

);





const usuarioAuth =

credencial.user;






console.log(
"Usuario autenticado:",
usuarioAuth.uid
);








/*
================================
BUSCAR PERFIL FIRESTORE
================================
*/


const consulta =

query(

collection(
db,
"usuarios"
),


where(
"correo",
"==",
email
)


);






const resultado =

await getDocs(
consulta
);






if(
resultado.empty
){


mostrarMensaje(
"Usuario sin perfil registrado",
"error"
);


return;


}








let perfil = null;






resultado.forEach(
(documento)=>{


perfil = {


id:
documento.id,


...documento.data(),


uidAuth:
usuarioAuth.uid


};



});


}





if(!perfil){


mostrarMensaje(
"No se encontró información del usuario",
"error"
);


return;


}







if(
perfil.estado &&
perfil.estado !== "activo"
){


mostrarMensaje(
"Usuario desactivado",
"error"
);


return;


}









/*
================================
CREAR SESIÓN CLIENTE
================================
*/


const datosSesion = {


id:

perfil.id,



uidAuth:

usuarioAuth.uid,



nombre:

perfil.nombre || "",



correo:

perfil.correo || email,



empresa:

perfil.empresa || "",



rol:

perfil.rol || "cliente",



telefono:

perfil.telefono || "",



plan:

perfil.plan || "",



horario:

perfil.horario || "",



contacto:

perfil.contacto || ""


};







localStorage.setItem(

"clienteCompudesk",

JSON.stringify(
datosSesion
)

);







console.log(

"Sesión creada:",

datosSesion

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

1000

);






}

catch(error){



console.error(
"Error login:",
error
);





let mensaje =

"Correo o contraseña incorrectos";




switch(error.code){


case "auth/user-not-found":

mensaje =
"Usuario no encontrado";

break;



case "auth/wrong-password":

mensaje =
"Contraseña incorrecta";

break;



case "auth/invalid-credential":

mensaje =
"Credenciales inválidas";

break;



case "auth/too-many-requests":

mensaje =
"Demasiados intentos. Intenta más tarde.";

break;


}





mostrarMensaje(
mensaje,
"error"
);




}



});









/*
========================================
MENSAJES
========================================
*/


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

card.insertBefore(
alerta,
card.firstChild
);


}



}






alerta.textContent =
texto;



alerta.className =

"login-alert " + tipo;






setTimeout(
()=>{


if(alerta){

alerta.remove();

}


},
3000
);



}
