// ==========================================
// COMPU DESK
// CLIENTE DASHBOARD
// Producción v2.0
// ==========================================


import {

auth,
db

}

from "../../assets/firebase/firebase-config.js";


import {

onAuthStateChanged,
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






onAuthStateChanged(

auth,

async(user)=>{


if(!user){


location.href="login.html";

return;


}



cargarDashboard();



});








async function cargarDashboard(){



try{



const sesion =

JSON.parse(

localStorage.getItem(
"clienteCompudesk"
)

);





if(!sesion){


location.href="login.html";

return;


}





// ===========================
// INFORMACION LOCAL
// ===========================



nombre.textContent =
sesion.nombre || "Cliente";



empresa.textContent =

sesion.empresa

?

sesion.empresa

:

"Empresa registrada";




plan.textContent =

sesion.plan || "Sin plan";







datos.innerHTML = `

<div class="empresa-grid">


<div>

<label>Contacto</label>

<strong>${sesion.nombre}</strong>

</div>


<div>

<label>Correo</label>

<strong>${sesion.correo}</strong>

</div>


<div>

<label>Teléfono</label>

<strong>${sesion.telefono || "No registrado"}</strong>

</div>


<div>

<label>RFC</label>

<strong>${sesion.rfc || "No registrado"}</strong>

</div>


</div>

`;









// ===========================
// TICKETS
// ===========================


const ticketsQuery = query(

collection(
db,
"tickets"
),

where(

"clienteId",

"==",

sesion.clienteId

)

);




const ticketsSnap =

await getDocs(
ticketsQuery
);




let abiertosTotal=0;

let cerradosTotal=0;





ticketsSnap.forEach((ticket)=>{


const estado =
ticket.data().estado;



if(
estado==="cerrado"
){


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

"Error dashboard:",

error

);



}



}







document
.getElementById("logout")
?.addEventListener(
"click",
async()=>{


await signOut(auth);


localStorage.removeItem(
"clienteCompudesk"
);


location.href="login.html";


});
