// ==========================================
// COMPU DESK
// CLIENTE DASHBOARD
// ==========================================


import {

auth,
db

}

from "../../assets/firebase/firebase-config.js";



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






async function cargar(){



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





nombre.textContent =
sesion.nombre;



empresa.textContent =
"Portal de "+sesion.empresa;



plan.textContent =
sesion.plan || "Cliente";






datos.innerHTML = `

<p><b>Usuario:</b> ${sesion.nombre}</p>

<p><b>Correo:</b> ${sesion.correo}</p>

<p><b>Teléfono:</b> ${sesion.telefono}</p>

<p><b>Empresa ID:</b> ${sesion.clienteId}</p>

`;







// TICKETS


const q = query(

collection(db,"tickets"),

where(
"clienteId",
"==",
sesion.clienteId
)

);



const snap =
await getDocs(q);




let a=0;
let c=0;



snap.forEach(t=>{


if(t.data().estado==="cerrado"){

c++;

}else{

a++;

}


});



abiertos.textContent=a;


cerrados.textContent=c;



}




cargar();





document
.getElementById("logout")
?.addEventListener(
"click",
async()=>{


await auth.signOut();


localStorage.removeItem(
"clienteCompudesk"
);


location.href="login.html";


});
