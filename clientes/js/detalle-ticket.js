// ==========================================
// COMPU DESK
// DETALLE TICKET CLIENTE
// Producción 2.0
// Firebase Auth + Firestore
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
    orderBy,
    getDocs,
    addDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



// ==========================================
// ELEMENTOS
// ==========================================

const ticketInfo =
document.getElementById("ticketInfo");


const conversacion =
document.getElementById("conversacion");


const respuestaForm =
document.getElementById("respuestaForm");


const respuesta =
document.getElementById("respuesta");




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
// FECHA
// ==========================================


function fecha(valor){

    if(!valor)
        return "-";


    if(valor.toDate){

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


const usuario =
auth.currentUser;



if(!usuario){

location.replace("../login.html");

return;

}




const ref =
doc(
db,
"tickets",
ticketId
);



const snap =
await getDoc(ref);



if(!snap.exists()){


ticketInfo.innerHTML = `

<div class="ticket-error">

<h3>
El ticket no existe.
</h3>

</div>

`;

return;

}



ticketActual =
{
id:snap.id,
...snap.data()
};





// SEGURIDAD CLIENTE

if(
ticketActual.usuarioId !== usuario.uid
){

ticketInfo.innerHTML=`

<div class="ticket-error">

<h3>
No tienes permiso para ver este ticket.
</h3>

</div>

`;

return;

}





renderTicket();


cargarMensajes();



}

catch(error){


console.error(
"Error detalle ticket:",
error
);


ticketInfo.innerHTML=`

<div class="ticket-error">

<h3>
Error cargando ticket.
</h3>

<p>
${error.message}
</p>

</div>

`;

}


}






// ==========================================
// MOSTRAR TICKET
// ==========================================


function renderTicket(){


ticketInfo.innerHTML = `


<div class="ticket-detail-card">


<div class="ticket-detail-header">


<div>

<div class="ticket-detail-folio">

${ticketActual.folio}

</div>


<h2>

${ticketActual.titulo}

</h2>


</div>



<span class="ticket-status">

${ticketActual.estado}

</span>


</div>





<div class="ticket-detail-grid">


<div>

<label>
Empresa
</label>

<strong>
${ticketActual.empresa}
</strong>

</div>



<div>

<label>
Solicitante
</label>

<strong>
${ticketActual.nombreUsuario}
</strong>

</div>



<div>

<label>
Categoría
</label>

<strong>
${ticketActual.categoria}
</strong>

</div>




<div>

<label>
Prioridad
</label>

<strong>
${ticketActual.prioridad}
</strong>

</div>




<div>

<label>
Técnico
</label>

<strong>

${ticketActual.tecnicoNombre}

</strong>

</div>




<div>

<label>
Creado
</label>

<strong>

${fecha(ticketActual.fechaCreacion)}

</strong>

</div>


</div>




<hr>


<h3>

Descripción

</h3>


<p>

${ticketActual.descripcion}

</p>



</div>


`;

}






// ==========================================
// CARGAR MENSAJES
// ==========================================


async function cargarMensajes(){


conversacion.innerHTML="";



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



if(snap.empty){


conversacion.innerHTML=`

<p>
Sin mensajes todavía.
</p>

`;

return;


}



snap.forEach(doc=>{


const msg =
doc.data();



conversacion.innerHTML += `


<div class="mensaje">


<strong>

${msg.autor}

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








// ==========================================
// RESPONDER
// ==========================================


respuestaForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const texto =
respuesta.value.trim();



if(!texto)
return;



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


autor:"cliente",


uid:user.uid,


nombre:
ticketActual.nombreUsuario,


mensaje:texto,


tipo:"texto",


fecha:
serverTimestamp()


}


);



respuesta.value="";


await cargarMensajes();



}

);






// ==========================================
// INIT
// ==========================================


auth.onAuthStateChanged(
auth,
(user)=>{


if(user){

cargarTicket();

}

else{

location.replace("../login.html");

}


});
