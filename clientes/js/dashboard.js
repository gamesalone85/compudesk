// ==========================================
// COMPU DESK
// CLIENTE DASHBOARD
// Producción 4.0
// ==========================================

import {
    auth
}
from "../../assets/firebase/firebase-config.js";

import {
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

import {
    db
}
from "../../assets/firebase/firebase-config.js";


// ==========================================
// ELEMENTOS
// ==========================================

const nombre =
document.getElementById("nombreCliente");

const empresa =
document.getElementById("empresaCliente");

const plan =
document.getElementById("planCliente");

const datos =
document.getElementById("datosEmpresa");

const abiertos =
document.getElementById("ticketsAbiertos");

const cerrados =
document.getElementById("ticketsCerrados");


// ==========================================
// CARGAR DASHBOARD
// ==========================================

async function cargarDashboard(){


const sesion = JSON.parse(
localStorage.getItem("clienteCompudesk")
);


if(!sesion){

location.replace("login.html");
return;

}


// ==========================================
// DATOS DEL USUARIO
// ==========================================

nombre.textContent =
sesion.nombre;

empresa.textContent =
sesion.empresa;

plan.textContent =
sesion.plan || "Sin plan";




// ==========================================
// INFORMACIÓN EMPRESA
// ==========================================

datos.innerHTML = `

<div class="empresa-grid">

<div>
<label>Empresa</label>
<strong>${sesion.empresa}</strong>
</div>

<div>
<label>Contacto</label>
<strong>${sesion.contacto}</strong>
</div>

<div>
<label>Correo</label>
<strong>${sesion.empresaCorreo}</strong>
</div>

<div>
<label>Teléfono</label>
<strong>${sesion.empresaTelefono}</strong>
</div>

<div>
<label>RFC</label>
<strong>${sesion.rfc || "No registrado"}</strong>
</div>

</div>

`;




// ==========================================
// CONSULTAR TICKETS
// ==========================================

try{

const consulta = query(

collection(db,"tickets"),

where(
"correoUsuario",
"==",
auth.currentUser.email
)

);

const resultado =
await getDocs(consulta);

let abiertosTotal = 0;
let cerradosTotal = 0;

resultado.forEach(doc=>{

const ticket = doc.data();

if(ticket.estado==="cerrado"){

cerradosTotal++;

}else{

abiertosTotal++;

}

});

abiertos.textContent =
abiertosTotal;

cerrados.textContent =
cerradosTotal;

}
catch(error){

console.error(error);

abiertos.textContent = "0";
cerrados.textContent = "0";

}

}

cargarDashboard();




// ==========================================
// LOGOUT
// ==========================================

document
.getElementById("logout")
.addEventListener(
"click",
async()=>{

await signOut(auth);

localStorage.removeItem(
"clienteCompudesk"
);

location.replace(
"login.html"
);

}
);
