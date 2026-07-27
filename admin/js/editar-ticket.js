// ==========================================
// COMPU DESK
// ADMIN EDITAR TICKET
// Producción v2.0
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





let ticketActual = null;






// ==========================================
// ELEMENTOS
// ==========================================


const titulo =
document.getElementById(
"ticketTitulo"
);



const folio =
document.getElementById(
"ticketFolio"
);



const empresa =
document.getElementById(
"ticketEmpresa"
);



const usuario =
document.getElementById(
"ticketUsuario"
);



const categoria =
document.getElementById(
"ticketCategoria"
);



const prioridad =
document.getElementById(
"ticketPrioridad"
);



const estado =
document.getElementById(
"ticketEstado"
);



const descripcion =
document.getElementById(
"ticketDescripcion"
);



const conversacion =
document.getElementById(
"conversacion"
);



const respuestaForm =
document.getElementById(
"respuestaForm"
);



const respuesta =
document.getElementById(
"respuesta"
);



const nuevoEstado =
document.getElementById(
"nuevoEstado"
);



const btnGuardarEstado =
document.getElementById(
"btnGuardarEstado"
);



const mensaje =
document.getElementById(
"mensajeTicket"
);








// ==========================================
// FECHA
// ==========================================


function fecha(valor){


if(!valor)
return "--";



if(
typeof valor.toDate === "function"
){

valor =
valor.toDate();

}



return valor.toLocaleString(
"es-MX"
);


}








// ==========================================
// CARGAR TICKET
// ==========================================


async function cargarTicket(){


try{


const referencia =

doc(
db,
"tickets",
ticketId
);



const snap =

await getDoc(
referencia
);





if(!snap.exists()){


mostrarMensaje(
"Ticket no encontrado",
"error"
);


return;


}



ticketActual = {

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
"Error cargando ticket:",
error
);



mostrarMensaje(
"Error cargando ticket",
"error"
);



}



}








// ==========================================
// CARGAR MENSAJES
// ==========================================


async function cargarMensajes(){



try{


const mensajesRef =

collection(

db,

"tickets",

ticketId,

"mensajes"

);





const consulta =

query(

mensajesRef,

orderBy(
"fecha",
"asc"
)

);





const snap =

await getDocs(
consulta
);






conversacion.innerHTML="";






if(snap.empty){


conversacion.innerHTML =

`

<p>
Sin mensajes todavía.
</p>

`;

return;


}






snap.forEach(doc=>{


const msg =
doc.data();




conversacion.innerHTML +=


`

<div class="mensaje">


<strong>

${msg.autor || "Usuario"}

</strong>



<p>

${msg.mensaje}

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
"Error mensajes:",
error
);



conversacion.innerHTML =

`

<p>
Error cargando conversación.
</p>

`;



}



}








// ==========================================
// RESPONDER AL CLIENTE
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



const admin =
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


uid:
admin.uid,


nombre:

"Administrador",


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


ultimaRespuesta:
"admin",


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
"Error enviando respuesta:",
error
);


mostrarMensaje(
"Error enviando mensaje",
"error"
);



}



}

);









// ==========================================
// CAMBIO ESTADO
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

"Estado actualizado correctamente",

"success"

);



}

catch(error){


console.error(
"Error estado:",
error
);



mostrarMensaje(
"No se pudo actualizar",
"error"
);



}



}

);










// ==========================================
// MENSAJES UI
// ==========================================


function mostrarMensaje(
texto,
tipo
){


if(!mensaje)
return;



mensaje.innerHTML =


`

<div class="alert ${tipo}">

${texto}

</div>

`;


}








// ==========================================
// INICIO
// ==========================================


onAuthStateChanged(

auth,

(user)=>{


if(user){


cargarTicket();


}
else{


location.replace(
"../login.html"
);


}


}

);
