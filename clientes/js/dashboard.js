// ==========================================
// COMPU DESK
// CLIENTE DASHBOARD
// Producción 4.1
// ==========================================

import {
    auth,
    db
}
from "../../assets/firebase/firebase-config.js";


import {
    signOut,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    collection,
    query,
    where,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



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

async function cargarDashboard(user){


const sesion = JSON.parse(
localStorage.getItem("clienteCompudesk")
);



if(!sesion){

location.replace("login.html");
return;

}




nombre.textContent =
sesion.nombre || "-";


empresa.textContent =
sesion.empresa || "-";


plan.textContent =
sesion.plan || "Sin plan";





datos.innerHTML = `

<div class="empresa-grid">

<div>
<label>Empresa</label>
<strong>${sesion.empresa || "-"}</strong>
</div>


<div>
<label>Contacto</label>
<strong>${sesion.contacto || "-"}</strong>
</div>


<div>
<label>Correo</label>
<strong>${sesion.empresaCorreo || "-"}</strong>
</div>


<div>
<label>Teléfono</label>
<strong>${sesion.empresaTelefono || "-"}</strong>
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


const q = query(

collection(db,"tickets"),

where(
"usuarioId",
"==",
user.uid
)

);



const snapshot =
await getDocs(q);



let abiertosTotal = 0;

let cerradosTotal = 0;



snapshot.forEach(doc=>{


const ticket =
doc.data();



if(ticket.estado === "cerrado"){

cerradosTotal++;

}

else{

abiertosTotal++;

}


});



abiertos.textContent =
abiertosTotal;


cerrados.textContent =
cerradosTotal;



}

catch(error){

console.error(
"Error dashboard tickets:",
error
);


abiertos.textContent="0";

cerrados.textContent="0";

}


}





// ==========================================
// ESPERAR FIREBASE AUTH
// ==========================================


onAuthStateChanged(
auth,
(user)=>{


if(user){

cargarDashboard(user);

}

else{

location.replace("login.html");

}


}

);





// ==========================================
// LOGOUT
// ==========================================

document
.getElementById("logout")
?.addEventListener(
"click",
async()=>{


await signOut(auth);


localStorage.removeItem(
"clienteCompudesk"
);



location.replace(
"login.html"
);


});
