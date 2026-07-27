// ==========================================
// COMPU DESK
// ADMIN TICKETS
// Producción v2.0
// Firebase Firestore
// ==========================================


import {

db

}

from "../../assets/firebase/firebase-config.js";



import {

collection,
getDocs,
query,
orderBy

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";






// ==========================================
// ELEMENTOS
// ==========================================


const tabla =

document.getElementById(
"tablaTickets"
);



const abiertos =

document.getElementById(
"ticketsAbiertos"
);



const proceso =

document.getElementById(
"ticketsProceso"
);



const pendientes =

document.getElementById(
"ticketsPendientes"
);



const cerrados =

document.getElementById(
"ticketsCerrados"
);







// ==========================================
// FECHA
// ==========================================


function formatoFecha(valor){


if(!valor)

return "--";



if(
typeof valor.toDate === "function"
){

valor =
valor.toDate();

}



return valor.toLocaleDateString(
"es-MX",
{

day:"2-digit",

month:"2-digit",

year:"numeric"

}

);



}







// ==========================================
// BADGES
// ==========================================


function badgeEstado(estado){


switch(estado){


case "abierto":

return `

<span class="badge-ticket abierto">

<i class="fa-solid fa-envelope-open"></i>

Abierto

</span>

`;



case "en_proceso":

return `

<span class="badge-ticket proceso">

<i class="fa-solid fa-spinner"></i>

En proceso

</span>

`;



case "pendiente_cliente":

return `

<span class="badge-ticket pendiente">

<i class="fa-solid fa-clock"></i>

Pendiente

</span>

`;



case "cerrado":

return `

<span class="badge-ticket cerrado">

<i class="fa-solid fa-circle-check"></i>

Cerrado

</span>

`;



default:


return `

<span class="badge-ticket">

${estado || "--"}

</span>

`;



}


}







function badgePrioridad(prioridad){


switch(prioridad){


case "alta":

return `

<span class="prioridad alta">

Alta

</span>

`;



case "media":

return `

<span class="prioridad media">

Media

</span>

`;



case "baja":

return `

<span class="prioridad baja">

Baja

</span>

`;



default:

return `

<span class="prioridad">

--

</span>

`;



}



}









// ==========================================
// CARGAR TICKETS
// ==========================================


async function cargarTickets(){



try{



const consulta = query(

collection(
db,
"tickets"
),

orderBy(
"fechaCreacion",
"desc"
)

);





const snapshot =

await getDocs(
consulta
);






let contador = {


abierto:0,

en_proceso:0,

pendiente_cliente:0,

cerrado:0


};






if(snapshot.empty){


tabla.innerHTML =


`

<div class="empty-state">

<i class="fa-solid fa-ticket"></i>

<p>
No existen tickets registrados.
</p>

</div>

`;


return;


}






let html =


`

<table class="tickets-table">


<thead>


<tr>


<th>
Folio
</th>


<th>
Título
</th>


<th>
Empresa
</th>


<th>
Usuario
</th>


<th>
Prioridad
</th>


<th>
Estado
</th>


<th>
Fecha
</th>


<th>
Comentarios
</th>


<th>
Acción
</th>


</tr>


</thead>



<tbody>

`;







snapshot.forEach(ticketDoc=>{


const ticket =
ticketDoc.data();





if(
contador[ticket.estado] !== undefined
){

contador[ticket.estado]++;

}





html +=


`

<tr>



<td>


<strong>

${ticket.folio || ticketDoc.id}

</strong>


</td>





<td>


${ticket.titulo || "--"}


</td>





<td>


${ticket.empresa || "--"}


</td>





<td>


${ticket.nombreUsuario || "--"}


</td>






<td>


${badgePrioridad(
ticket.prioridad
)}


</td>






<td>


${badgeEstado(
ticket.estado
)}


</td>






<td>


${formatoFecha(
ticket.fechaCreacion
)}


</td>





<td>


<i class="fa-solid fa-comments"></i>


${ticket.totalComentarios || 0}


</td>







<td>


<a

href="editar.html?id=${ticketDoc.id}"

class="btn-action"

title="Ver ticket">


<i class="fa-solid fa-eye"></i>


</a>



</td>




</tr>


`;



});







html +=


`

</tbody>


</table>

`;







tabla.innerHTML =
html;







abiertos.textContent =
contador.abierto;


proceso.textContent =
contador.en_proceso;


pendientes.textContent =
contador.pendiente_cliente;


cerrados.textContent =
contador.cerrado;




}



catch(error){



console.error(

"Error tickets:",

error

);



tabla.innerHTML =


`

<div class="empty-state">

<i class="fa-solid fa-triangle-exclamation"></i>


<p>

Error cargando tickets.

</p>


</div>

`;



}



}








cargarTickets();
