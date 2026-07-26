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


import {

onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";





const tabla =
document.getElementById("ticketsLista");





async function cargarTickets(user){


try{



console.log(
"Usuario autenticado:",
user.uid
);




// Buscar tickets

const ticketsQuery = query(

collection(db,"tickets"),

where(
"usuarioId",
"==",
user.uid
),

orderBy(
"fechaCreacion",
"desc"
)

);




const resultado =
await getDocs(ticketsQuery);




tabla.innerHTML="";





if(resultado.empty){


tabla.innerHTML=`

<tr>

<td colspan="5">

No tienes tickets registrados.

</td>

</tr>

`;


return;

}





resultado.forEach(ticketDoc=>{


const ticket =
ticketDoc.data();



let fecha="Procesando";


if(ticket.fechaCreacion){


fecha =
ticket.fechaCreacion
.toDate()
.toLocaleDateString("es-MX");


}



tabla.innerHTML += `

<tr>


<td>

#${ticketDoc.id.substring(0,8)}

</td>


<td>

${ticket.titulo || "-"}

</td>



<td>

${ticket.prioridad || "-"}

</td>



<td>

${ticket.estado || "-"}

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

<td colspan="5">

Error cargando información.

</td>

</tr>

`;


}



}







onAuthStateChanged(

auth,

(user)=>{


if(!user){


window.location.href="../login.html";


return;


}



cargarTickets(user);


}

);
