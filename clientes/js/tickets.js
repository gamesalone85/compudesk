// ==========================================
// COMPU DESK
// CLIENTE MIS TICKETS
// Producción 2.0
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
getDocs,
orderBy

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




const tabla =
document.getElementById("ticketsLista");





async function cargarTickets(){


try{


const user = auth.currentUser;


if(!user){

window.location.href="../login.html";

return;

}



// =====================================
// BUSCAR PERFIL CLIENTE
// =====================================


const usuarioQuery = query(

collection(db,"usuarios"),

where(
"uid",
"==",
user.uid
)

);



const usuarioSnap =
await getDocs(usuarioQuery);



if(usuarioSnap.empty){

throw new Error(
"Usuario no encontrado"
);

}



const usuario =
usuarioSnap.docs[0].data();




// =====================================
// BUSCAR TICKETS EMPRESA
// =====================================


const ticketsQuery = query(

collection(db,"tickets"),

where(
"clienteId",
"==",
usuario.clienteId
),

orderBy(
"fechaCreacion",
"desc"
)

);




const ticketsSnap =
await getDocs(ticketsQuery);




tabla.innerHTML="";




if(ticketsSnap.empty){


tabla.innerHTML=`

<tr>

<td colspan="6">

<div class="empty-state">


<i class="fa-solid fa-ticket"></i>


<h3>
No tienes tickets registrados
</h3>


<p>
Cuando generes una solicitud aparecerá aquí.
</p>


</div>

</td>

</tr>

`;

return;

}






ticketsSnap.forEach(doc=>{


const ticket =
doc.data();



let fecha="";


if(ticket.fechaCreacion){


fecha =
ticket.fechaCreacion
.toDate()
.toLocaleDateString(
"es-MX"
);


}





tabla.innerHTML += `


<tr>


<td>

<strong>
#${doc.id.substring(0,8).toUpperCase()}
</strong>

</td>



<td>

${ticket.titulo || "-"}

</td>



<td>

${ticket.categoria || "-"}

</td>




<td>

<span class="ticket-priority ${ticket.prioridad}">

${ticket.prioridad}

</span>

</td>




<td>

<span class="ticket-status ${ticket.estado}">

${ticket.estado}

</span>

</td>



<td>

${fecha}

</td>



</tr>



`;



});




}

catch(error){


console.error(
"Error tickets:",
error
);



tabla.innerHTML=`

<tr>

<td colspan="6">

Error cargando tickets.

</td>


</tr>

`;


}



}




auth.onAuthStateChanged(()=>{


cargarTickets();


});
