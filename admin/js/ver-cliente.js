// ==========================================
// COMPU DESK ADMIN
// Perfil Cliente
// ==========================================


import { db } from "../../assets/firebase/firebase-config.js";


import {

doc,
getDoc

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const parametros =
new URLSearchParams(
window.location.search
);



const clienteID =
parametros.get("id");





if(!clienteID){

window.location.href="index.html";

}





const clienteRef =
doc(
db,
"clientes",
clienteID
);







async function cargarCliente(){


try{


const resultado =
await getDoc(clienteRef);



if(!resultado.exists()){


alert("Cliente no encontrado");

window.location.href="index.html";

return;

}



const cliente =
resultado.data();





document.getElementById("empresa")
.textContent =
cliente.empresa;



document.getElementById("contacto")
.textContent =
cliente.contacto;



document.getElementById("correo")
.textContent =
cliente.correo;



document.getElementById("telefono")
.textContent =
cliente.telefono;



document.getElementById("plan")
.textContent =
cliente.plan;





const estado =
document.getElementById("estado");


estado.textContent =
cliente.estado.toUpperCase();



estado.className =
"estado " + cliente.estado;



// Botón PDF

document
.getElementById("btnPDF")
.dataset.cliente =
JSON.stringify(cliente);



}
catch(error){

console.error(error);

}



}



cargarCliente();
