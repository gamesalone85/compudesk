// ==========================================
// COMPU DESK ADMIN
// Reset Password Firebase Auth
// ==========================================


import { auth } 
from "../../assets/firebase/firebase-config.js";



import {

sendPasswordResetEmail

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";





const correoInput =
document.getElementById(
"correo"
);



const formulario =
document.getElementById(
"resetPasswordForm"
);



const mensaje =
document.getElementById(
"mensaje"
);






// Obtener correo desde URL


const parametros =
new URLSearchParams(
window.location.search
);



const correo =
parametros.get(
"correo"
);




if(correo){


correoInput.value =
correo;


}






formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



try{



await sendPasswordResetEmail(

auth,

correoInput.value

);




mensaje.textContent =

"Correo de recuperación enviado correctamente.";


mensaje.style.color =
"green";



}
catch(error){


console.error(
error
);



mensaje.textContent =

"No se pudo enviar el correo.";


mensaje.style.color =
"red";



}



});
