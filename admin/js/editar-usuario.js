// ==========================================
// COMPU DESK ADMIN
// Editar Usuario
// Firebase Firestore
// ==========================================


import { db } from "../../assets/firebase/firebase-config.js";


import {

doc,
getDoc,
updateDoc

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const formulario =
document.getElementById(
"editarUsuarioForm"
);


const mensaje =
document.getElementById(
"mensaje"
);




// ID USUARIO

const parametros =
new URLSearchParams(
window.location.search
);


const usuarioId =
parametros.get(
"id"
);





if(!usuarioId){


mensaje.textContent =
"No se encontró usuario.";


throw new Error(
"Usuario sin ID"
);


}





const referencia =
doc(
db,
"usuarios",
usuarioId
);






// ==========================================
// CARGAR DATOS
// ==========================================


async function cargarUsuario(){


try{


const resultado =
await getDoc(
referencia
);



if(!resultado.exists()){


mensaje.textContent =
"Usuario no encontrado.";


return;


}



const usuario =
resultado.data();




document.getElementById("nombre").value =
usuario.nombre || "";



document.getElementById("correo").value =
usuario.correo || "";



document.getElementById("telefono").value =
usuario.telefono || "";



document.getElementById("empresa").value =
usuario.empresa || "";



document.getElementById("rol").value =
usuario.rol || "cliente";



document.getElementById("estado").value =
usuario.estado || "activo";




}
catch(error){


console.error(
error
);


}


}








// ==========================================
// ACTUALIZAR
// ==========================================


formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



try{


await updateDoc(

referencia,

{


nombre:
document.getElementById("nombre").value.trim(),


correo:
document.getElementById("correo").value.trim(),


telefono:
document.getElementById("telefono").value.trim(),


empresa:
document.getElementById("empresa").value.trim(),


rol:
document.getElementById("rol").value,


estado:
document.getElementById("estado").value


}

);





mensaje.textContent =
"Usuario actualizado correctamente.";


mensaje.style.color =
"green";



setTimeout(()=>{


window.location.href =
"index.html";


},1500);





}
catch(error){


console.error(
"Error actualizando:",
error
);


mensaje.textContent =
"Error al actualizar usuario.";


mensaje.style.color =
"red";


}



});





cargarUsuario();
