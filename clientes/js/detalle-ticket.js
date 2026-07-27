// ==========================================
// COMPU DESK
// DETALLE TICKET CLIENTE
// Producción 2.1
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


    if(typeof valor.toDate === "function"){

        valor = valor.toDate();

    }


    return valor.toLocaleString(
        "es-MX"
    );


}







// ==========================================
// CARGAR TICKET
// ==========================================


async function cargarTicket(user){


console.log(
"Buscando ticket:",
ticketId
);



try{


const ticketRef =
doc(
    db,
    "tickets",
    ticketId
);



const snap =
await getDoc(ticketRef);



console.log(
"Respuesta Firestore:",
snap
);




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




ticketActual = {

id:snap.id,

...snap.data()

};




console.log(
"Ticket encontrado:",
ticketActual
);




// ==========================================
// SEGURIDAD CLIENTE
// ==========================================


if(
ticketActual.usuarioId !== user.uid
){


console.warn(
"Usuario no propietario del ticket"
);



ticketInfo.innerHTML = `

<div class="ticket-error">

<h3>
No tienes permiso para ver este ticket.
</h3>

</div>

`;


return;


}




renderTicket();


await cargarMensajes();



}


catch(error){


console.error(
"ERROR DETALLE TICKET:",
error
);



ticketInfo.innerHTML = `

<div class="ticket-error">

<h3>
Error cargando ticket
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

${ticketActual.empresa || "-"}

</strong>

</div>




<div>

<label>
Solicitante
</label>

<strong>

${ticketActual.nombreUsuario || "-"}

</strong>

</div>




<div>

<label>
Categoría
</label>

<strong>

${ticketActual.categoria || "-"}

</strong>

</div>




<div>

<label>
Prioridad
</label>

<strong>

${ticketActual.prioridad || "-"}

</strong>

</div>




<div>

<label>
Técnico
</label>

<strong>

${ticketActual.tecnicoNombre || "Sin asignar"}

</strong>

</div>




<div>

<label>
Fecha creación
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

${ticketActual.descripcion || ""}

</p>



</div>


`;

}







// ==========================================
// MENSAJES
// ==========================================


async function cargarMensajes(){



console.log(
"Cargando mensajes..."
);



try{


const mensajesRef =
collection(
db,
"tickets",
ticketId,
"mensajes"
);



const q =
query(
mensajesRef,
orderBy(
"fecha",
"asc"
)
);



const snap =
await getDocs(q);



console.log(
"Mensajes:",
snap.size
);




conversacion.innerHTML="";



if(
snap.empty
){


conversacion.innerHTML = `

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



conversacion.innerHTML = `

<p>
Error cargando conversación.
</p>

`;

}


}








// ==========================================
// RESPONDER
// ==========================================


respuestaForm?.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const texto =
respuesta.value.trim();



if(!texto)
return;



const user =
auth.currentUser;



if(!user)
return;




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
// INICIO
// ==========================================


onAuthStateChanged(

auth,

(user)=>{


console.log(
"Estado auth detalle:",
user
);



if(user){


cargarTicket(user);


}
else{


console.warn(
"No hay sesión Firebase"
);



location.replace(
"../login.html"
);


}


}

);
