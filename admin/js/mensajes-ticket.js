// ==========================================
// COMPU DESK
// MENSAJES TICKET ADMIN
// Producción v1.0
// ==========================================


import {

db

}

from "../../assets/firebase/firebase-config.js";



import {

collection,
query,
where,
orderBy,
getDocs,
addDoc,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const params =
new URLSearchParams(
window.location.search
);



const ticketId =
params.get("id");



const lista =
document.getElementById(
"listaMensajes"
);



const textarea =
document.getElementById(
"nuevoMensaje"
);



const boton =
document.getElementById(
"btnEnviarMensaje"
);





// ==========================================
// CARGAR MENSAJES
// ==========================================


async function cargarMensajes(){


try{


const q = query(


collection(
db,
"mensajes"
),


where(
"ticketId",
"==",
ticketId
),


orderBy(
"fechaCreacion",
"asc"
)


);




const snapshot =
await getDocs(q);





if(snapshot.empty){


lista.innerHTML =

`
<p>
No hay mensajes todavía.
</p>
`;


return;


}





let html="";





snapshot.forEach(doc=>{


const msg =
doc.data();




html +=


`

<div class="mensaje-box ${msg.autorTipo}">


<div class="mensaje-header">


<strong>

${msg.autorNombre}

</strong>



<span>

${msg.fechaCreacion?.toDate()
.toLocaleString("es-MX") || ""}

</span>


</div>



<p>

${msg.mensaje}

</p>


</div>


`;


});





lista.innerHTML =
html;



}



catch(error){


console.error(
error
);


lista.innerHTML =
"Error cargando mensajes";


}



}








// ==========================================
// ENVIAR MENSAJE
// ==========================================


async function enviarMensaje(){


const texto =
textarea.value.trim();



if(!texto)

return;




try{


await addDoc(

collection(
db,
"mensajes"
),

{


ticketId,


autorNombre:
"Administrador",


autorTipo:
"admin",


mensaje:
texto,


fechaCreacion:
serverTimestamp()


}

);





textarea.value="";



cargarMensajes();



}



catch(error){


console.error(
"Error enviando mensaje",
error
);


}



}







if(boton){


boton.addEventListener(

"click",

enviarMensaje

);


}





cargarMensajes();
