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

signInWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



import {

doc,
getDoc

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";







const formulario =

document.getElementById(
"loginForm"
);



const mensaje =

document.getElementById(
"mensaje"
);








formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();




const correo =

document
.getElementById("email")
.value
.trim();




const password =

document
.getElementById("password")
.value;





try{



mensaje.textContent =
"Iniciando sesión...";





// ==========================================
// LOGIN AUTH
// ==========================================


const resultado =

await signInWithEmailAndPassword(

auth,

correo,

password

);




const usuarioAuth =

resultado.user;






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





if(adminSnap.exists()){


localStorage.setItem(

"compudeskAdmin",

JSON.stringify({

uid:
usuarioAuth.uid,


...adminSnap.data()

})

);



window.location.href =

"dashboard.html";


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






if(!usuarioSnap.exists()){



mensaje.textContent =

"Usuario no registrado en el sistema.";



return;


}





const usuario =

usuarioSnap.data();






// ==========================================
// VALIDAR ESTADO
// ==========================================


if(usuario.estado !== "activo"){



mensaje.textContent =

"Usuario desactivado. Contacta a soporte.";



await auth.signOut();


return;


}








// ==========================================
// GUARDAR SESIÓN CLIENTE
// ==========================================


localStorage.setItem(

"compudeskUsuario",

JSON.stringify({

uid:
usuarioAuth.uid,


...usuario


})

);






window.location.href =

"../cliente/dashboard.html";






}
catch(error){



console.error(

"Error login:",

error

);





if(error.code === "auth/invalid-credential"){


mensaje.textContent =

"Correo o contraseña incorrectos.";


}

else{


mensaje.textContent =

"Error al iniciar sesión.";


}



}



});
