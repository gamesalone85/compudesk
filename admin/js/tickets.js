// ==========================================
// COMPU DESK
// ADMIN TICKETS
// Producción v2.0
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


const tabla = document.getElementById(
    "tablaTickets"
);



const abiertos = document.getElementById(
    "ticketsAbiertos"
);


const proceso = document.getElementById(
    "ticketsProceso"
);


const pendientes = document.getElementById(
    "ticketsPendientes"
);


const cerrados = document.getElementById(
    "ticketsCerrados"
);




// ==========================================
// BADGE ESTADO
// ==========================================


function estadoBadge(estado){


    switch(estado){


        case "abierto":

            return `

            <span class="badge-warning">

            <i class="fa-solid fa-envelope-open"></i>

            Abierto

            </span>

            `;



        case "en_proceso":

            return `

            <span class="badge-info">

            <i class="fa-solid fa-spinner"></i>

            En proceso

            </span>

            `;




        case "pendiente_cliente":

            return `

            <span class="badge-warning">

            <i class="fa-solid fa-clock"></i>

            Pendiente cliente

            </span>

            `;




        case "cerrado":

            return `

            <span class="badge-success">

            <i class="fa-solid fa-circle-check"></i>

            Cerrado

            </span>

            `;




        default:

            return `

            <span class="badge-danger">

            Sin estado

            </span>

            `;


    }


}




// ==========================================
// BADGE PRIORIDAD
// ==========================================


function prioridadBadge(prioridad){



switch(
    prioridad?.toLowerCase()
){


case "alta":

return `

<span class="badge-danger">

Alta

</span>

`;



case "media":

return `

<span class="badge-warning">

Media

</span>

`;



case "baja":

return `

<span class="badge-success">

Baja

</span>

`;



case "critica":

return `

<span class="badge-danger">

Crítica

</span>

`;



default:

return `

<span class="badge-info">

${prioridad || "Normal"}

</span>

`;


}


}






// ==========================================
// FORMATO FECHA
// ==========================================


function formatoFecha(timestamp){


if(!timestamp)

return "--";



return timestamp
.toDate()
.toLocaleString(
"es-MX",
{

dateStyle:"short",

timeStyle:"short"

}

);


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





const snapshot = await getDocs(
    consulta
);





let contador = {


abierto:0,


en_proceso:0,


pendiente_cliente:0,


cerrado:0


};







if(snapshot.empty){



tabla.innerHTML = `


<div class="empty-state">


<i class="fa-solid fa-ticket"></i>


<p>

No existen tickets registrados.

</p>


</div>


`;



actualizarContadores(contador);


return;


}








let html = `



<table class="admin-table">



<thead>


<tr>


<th>
Ticket
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
Acción
</th>


</tr>


</thead>



<tbody>


`;







snapshot.forEach(
(ticketDoc)=>{


const ticket =
ticketDoc.data();




const estado =
ticket.estado || "abierto";




if(
contador[estado] !== undefined
){

contador[estado]++;

}






html += `


<tr>



<td>


<div class="ticket-title">


<strong>

${ticket.titulo || "Sin título"}

</strong>



<small>

ID:
${ticketDoc.id.substring(0,8)}

</small>


</div>


</td>







<td>

${ticket.empresa || "--"}

</td>







<td>

${ticket.nombreUsuario || "--"}

</td>







<td>

${prioridadBadge(
ticket.prioridad
)}

</td>







<td>

${estadoBadge(
estado
)}

</td>







<td>

${formatoFecha(
ticket.fechaCreacion
)}

</td>







<td>


<a

href="editar.html?id=${ticketDoc.id}"

class="btn-action"

title="Ver ticket"


>


<i class="fa-solid fa-eye"></i>


</a>



</td>




</tr>



`;



});








html += `


</tbody>


</table>


`;







tabla.innerHTML =
html;




actualizarContadores(
contador
);



}



catch(error){



console.error(

"Error tickets:",

error

);




tabla.innerHTML = `


<div class="empty-state">


<i class="fa-solid fa-triangle-exclamation"></i>


<p>

Error cargando tickets.

</p>


</div>


`;



}



}






// ==========================================
// ACTUALIZAR KPI
// ==========================================


function actualizarContadores(
contador
){



if(abiertos)

abiertos.textContent =
contador.abierto;



if(proceso)

proceso.textContent =
contador.en_proceso;



if(pendientes)

pendientes.textContent =
contador.pendiente_cliente;



if(cerrados)

cerrados.textContent =
contador.cerrado;



}






// ==========================================
// INICIO
// ==========================================


cargarTickets();
