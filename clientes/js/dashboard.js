// ==========================================
// COMPU DESK
// DASHBOARD CLIENTE
// Producción v1.0
// ==========================================


import {

auth,
db

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





const sesion =

JSON.parse(

localStorage.getItem(
"clienteCompudesk"
)

);






if(!sesion){

window.location.href="login.html";

}




document.getElementById(
"clienteNombre"
).textContent = sesion.nombre;



document.getElementById(
"nombreUsuario"
).textContent = sesion.nombre;



document.getElementById(
"empresa"
).textContent = sesion.empresa;



document.getElementById(
"plan"
).textContent = sesion.plan;



document.getElementById(
"rfc"
).textContent = sesion.rfc || "No registrado";



document.getElementById(
"estado"
).textContent = sesion.estado;






// ==========================================
// CONTADORES TICKETS
// ==========================================


const ticketsRef =

collection(
db,
"tickets"
);



const consulta =

query(

ticketsRef,

where(
"clienteId",
"==",
sesion.clienteId

)

);



const resultado =

await getDocs(
consulta
);




let abiertos=0;
let proceso=0;
let cerrados=0;




resultado.forEach(

(doc)=>{


const ticket = doc.data();



switch(ticket.estado){


case "abierto":

abiertos++;

break;



case "proceso":

proceso++;

break;



case "cerrado":

cerrados++;

break;


}



}

);





document.getElementById(
"ticketsAbiertos"
).textContent=abiertos;


document.getElementById(
"ticketsProceso"
).textContent=proceso;


document.getElementById(
"ticketsCerrados"
).textContent=cerrados;






// ==========================================
// LOGOUT
// ==========================================


document
.getElementById(
"cerrarSesion"
)
.addEventListener(

"click",

async()=>{


await signOut(auth);


localStorage.removeItem(
"clienteCompudesk"
);


window.location.href="login.html";


}

);
