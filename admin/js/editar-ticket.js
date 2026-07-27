// ==========================================
// COMPU DESK
// ADMIN EDITAR TICKET
// Producción v3.0
// Firebase Auth + Firestore
// ==========================================


import {
    auth,
    db
}
from "../../assets/firebase/firebase-config.js";


import {
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {

    doc,
    getDoc,
    updateDoc,
    collection,
    query,
    orderBy,
    getDocs,
    addDoc,
    serverTimestamp

}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




// ==========================================
// ID TICKET
// ==========================================

const params =
new URLSearchParams(
window.location.search
);


const ticketId =
params.get("id");



if(!ticketId){

console.error(
"No existe ID de ticket"
);

}




let ticketActual=null;



// ==========================================
// ELEMENTOS
// ==========================================

const titulo =
document.getElementById("ticketTitulo");


const folio =
document.getElementById("ticketFolio");


const empresa =
document.getElementById("ticketEmpresa");


const usuario =
document.getElementById("ticketUsuario");


const categoria =
document.getElementById("ticketCategoria");


const prioridad =
document.getElementById("ticketPrioridad");


const estado =
document.getElementById("ticketEstado");


const descripcion =
document.getElementById("ticketDescripcion");


const conversacion =
document.getElementById("conversacion");


const respuestaForm =
document.getElementById("respuestaForm");


const respuesta =
document.getElementById("respuesta");


const nuevoEstado =
document.getElementById("nuevoEstado");


const btnGuardarEstado =
document.getElementById("btnGuardarEstado");


const mensaje =
document.getElementById("mensajeTicket");




// ==========================================
// FECHA
// ==========================================

function fecha(valor){


if(!valor)
return "--";


if(typeof valor.toDate==="function"){

valor=valor.toDate();

}


return valor.toLocaleString("es-MX");


}




// ==========================================
// CARGAR TICKET
// ==========================================

async function cargarTicket(){


try{


console.log(
"Cargando ticket:",
ticketId
);



const ref =
doc(
db,
"tickets",
ticketId
);



const snap =
await getDoc(ref);



if(!snap.exists()){


mostrarMensaje(
"Ticket no encontrado",
"error"
);


return;

}



ticketActual={

id:snap.id,

...snap.data()

};



titulo.textContent =
ticketActual.titulo || "--";


folio.textContent =
ticketActual.folio || "--";


empresa.textContent =
ticketActual.empresa || "--";


usuario.textContent =
ticketActual.nombreUsuario || "--";


categoria.textContent =
ticketActual.categoria || "--";


prioridad.textContent =
ticketActual.prioridad || "--";


estado.textContent =
ticketActual.estado || "--";


descripcion.textContent =
ticketActual.descripcion || "--";



if(nuevoEstado){

nuevoEstado.value =
ticketActual.estado || "abierto";

}



await cargarMensajes();



}

catch(error){


console.error(
"ERROR TICKET:",
error
);


mostrarMensaje(
error.message,
"error"
);


}



}






// ==========================================
// MENSAJES
// ==========================================


async function cargarMensajes(){


try{


console.log(
"Cargando mensajes"
);



const ref =

collection(

db,

"tickets",

ticketId,

"mensajes"

);



const q =

query(

ref,

orderBy(
"fecha",
"asc"
)

);



const snap =
await getDocs(q);



conversacion.innerHTML="";



if(snap.empty){


conversacion.innerHTML=

`

<p>
Sin mensajes todavía.
</p>

`;


return;


}



snap.forEach(item=>{


const msg =
item.data();



conversacion.innerHTML +=


`

<div class="mensaje">

<strong>
${msg.autor || "Usuario"}
</strong>


<p>
${msg.mensaje || ""}
</p>


<small>
${fecha(msg.fecha)}
</small>


</div>

`;


});



}

catch(error){


console.error(
"ERROR MENSAJES:",
error
);


conversacion.innerHTML=

`

<p>
No se pudieron cargar mensajes
</p>

`;


}



}







// ==========================================
// RESPONDER CLIENTE
// ==========================================


respuestaForm?.addEventListener(
"submit",

async(e)=>{


e.preventDefault();


const texto =
respuesta.value.trim();


if(!texto)
return;



try{


const user =
auth.currentUser;



await addDoc(


collection(

db,

"tickets",

ticketId,

"mensajes"

),


{


autor:"admin",

uid:user.uid,

nombre:"Administrador",

mensaje:texto,

tipo:"texto",

fecha:
serverTimestamp()


}



);



await updateDoc(


doc(
db,
"tickets",
ticketId
),


{


ultimaRespuesta:"admin",

ultimaActividad:
serverTimestamp(),

ultimaActualizacion:
serverTimestamp()


}



);



respuesta.value="";


await cargarMensajes();



}

catch(error){


console.error(
"ERROR RESPUESTA:",
error
);


mostrarMensaje(
error.message,
"error"
);


}



}

);







// ==========================================
// CAMBIAR ESTADO
// ==========================================


btnGuardarEstado?.addEventListener(
"click",

async()=>{


try{


await updateDoc(


doc(
db,
"tickets",
ticketId
),


{


estado:
nuevoEstado.value,


ultimaActualizacion:
serverTimestamp()


}


);



estado.textContent =
nuevoEstado.value;



mostrarMensaje(
"Estado actualizado",
"success"
);



}

catch(error){


console.error(
error
);


mostrarMensaje(
error.message,
"error"
);


}



}

);







// ==========================================
// MENSAJE UI
// ==========================================


function mostrarMensaje(texto,tipo){


if(!mensaje)
return;



mensaje.innerHTML=

`

<div class="alert ${tipo}">
${texto}
</div>

`;



}







// ==========================================
// INICIO
// ==========================================


document.addEventListener(
"compudesk-auth-ready",
()=>{

console.log(
"Admin autorizado"
);


cargarTicket();


}
);
