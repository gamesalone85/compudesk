// ==========================================
// COMPU DESK
// CLIENTE DASHBOARD
// Producción v1.0
// ==========================================


import {

auth,
db

}

from "../../assets/firebase/firebase-config.js";


import {

doc,
getDoc,
collection,
query,
where,
getDocs

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



const nombre =
document.getElementById("nombreCliente");


const empresa =
document.getElementById("empresaCliente");


const plan =
document.getElementById("planCliente");


const datosEmpresa =
document.getElementById("datosEmpresa");



const abiertos =
document.getElementById("ticketsAbiertos");


const cerrados =
document.getElementById("ticketsCerrados");




async function cargarDashboard(){



try{


const user = auth.currentUser;



if(!user){

window.location.href="login.html";

return;

}






// ===============================
// USUARIO
// ===============================


const usuarioRef =

doc(

db,

"usuarios",

user.uid

);



const usuarioSnap =

await getDoc(usuarioRef);



if(!usuarioSnap.exists()){

throw new Error(
"Usuario no encontrado"
);

}



const usuario =
usuarioSnap.data();






// ===============================
// CLIENTE
// ===============================


const clienteRef =

doc(

db,

"clientes",

usuario.clienteId

);



const clienteSnap =

await getDoc(clienteRef);



if(!clienteSnap.exists()){

throw new Error(
"Cliente no encontrado"
);

}



const cliente =
clienteSnap.data();







nombre.textContent =
usuario.nombre;



empresa.textContent =
cliente.empresa;



plan.textContent =
cliente.plan;








datosEmpresa.innerHTML=`

<p><b>Empresa:</b> ${cliente.empresa}</p>

<p><b>Contacto:</b> ${cliente.contacto}</p>

<p><b>Correo:</b> ${cliente.correo}</p>

<p><b>Teléfono:</b> ${cliente.telefono}</p>

<p><b>RFC:</b> ${cliente.rfc || "No registrado"}</p>

`;








// ===============================
// TICKETS
// ===============================


const ticketsQuery =

query(

collection(db,"tickets"),

where(
"clienteId",
"==",
usuario.clienteId
)

);



const tickets =
await getDocs(ticketsQuery);




let abiertosCount=0;
let cerradosCount=0;




tickets.forEach(t=>{


const estado =
t.data().estado;



if(
estado==="cerrado"
){

cerradosCount++;

}else{

abiertosCount++;

}



});




abiertos.textContent =
abiertosCount;


cerrados.textContent =
cerradosCount;



}



catch(error){

console.error(
error
);

}



}







auth.onAuthStateChanged(()=>{

cargarDashboard();

});









document
.getElementById("logout")
?.addEventListener(
"click",
async()=>{


await auth.signOut();


localStorage.removeItem(
"clienteCompudesk"
);


window.location.href="login.html";


}
);
