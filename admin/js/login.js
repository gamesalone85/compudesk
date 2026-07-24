// ==========================================
// COMPU DESK
// ADMIN LOGIN
// Producción v1.1
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
    getDoc,
    serverTimestamp

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
    document.getElementById("rememberSession");


const message =
    document.getElementById("loginMessage");


const togglePassword =
    document.getElementById("togglePassword");


const btnLogin =
    document.getElementById("btnLogin");


const btnText =
    document.getElementById("btnText");


const spinner =
    document.getElementById("loadingSpinner");





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


clearMessage();



const correo =
email.value.trim();


const clave =
password.value;



if(
!correo ||
!clave
){


showMessage(
"Completa todos los campos.",
"error"
);


return;


}




setLoading(true);




try{



// ==========================================
// LIMPIAR SESION LOCAL
// ==========================================


localStorage.removeItem(
"compudeskAdmin"
);





// ==========================================
// PERSISTENCIA
// ==========================================


await setPersistence(

auth,

remember.checked

?

browserLocalPersistence

:

browserSessionPersistence

);





// ==========================================
// FIREBASE AUTH
// ==========================================


const credential =

await signInWithEmailAndPassword(

auth,

correo,

clave

);



const uid =

credential.user.uid;





// ==========================================
// BUSCAR ADMIN
// admins/{UID}
// ==========================================


const adminRef =

doc(

db,

"admins",

uid

);



const adminSnap =

await getDoc(
adminRef
);





if(
!adminSnap.exists()
){



await signOut(auth);



showMessage(

"No tienes permisos para acceder al panel administrativo.",

"error"

);



return;


}







const datosAdmin =

adminSnap.data();






// ==========================================
// VALIDAR ESTADO
// ==========================================


if(
datosAdmin.activo !== true
){



await signOut(auth);



showMessage(

"Cuenta deshabilitada. Contacta al administrador.",

"error"

);



return;


}







// ==========================================
// GUARDAR SESION ADMIN
// ==========================================


const sesionAdmin = {


uid:

uid,


correo:

credential.user.email,


nombre:

datosAdmin.nombre || "",


rol:

datosAdmin.rol || "admin",


activo:

datosAdmin.activo,


fechaAcceso:

new Date().toISOString(),


...datosAdmin


};






localStorage.setItem(

"compudeskAdmin",

JSON.stringify(
sesionAdmin
)

);






// ==========================================
// OK
// ==========================================


showMessage(

"Autenticación correcta.",

"success"

);





setTimeout(()=>{


window.location.replace(
"index.html"
);



},800);






}

catch(error){



console.error(

"Error Login Admin:",

error

);





let texto =

"No fue posible iniciar sesión.";





switch(error.code){



case "auth/invalid-credential":

case "auth/user-not-found":

case "auth/wrong-password":

texto =
"Correo o contraseña incorrectos.";

break;




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





showMessage(
texto,
"error"
);



}

finally{


setLoading(false);


}



});







// ==========================================
// UI
// ==========================================


function showMessage(
texto,
tipo
){


if(!message)
return;



message.textContent =
texto;


message.className =

"login-message " + tipo;



}




function clearMessage(){


if(!message)
return;


message.textContent =
"";


message.className =
"login-message";


}






function setLoading(
estado
){


if(btnLogin)

btnLogin.disabled =
estado;



if(spinner)

spinner.classList.toggle(
"hidden",
!estado
);



if(btnText)

btnText.textContent =

estado

?

"Validando..."

:

"Iniciar sesión";



}
