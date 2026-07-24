// ==========================================
// COMPU DESK
// ADMIN TICKETS
// Producción v1.0
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
<p>
No existen tickets registrados.
</p>
`;

return;


}






let html = `


<table class="clientes-table">


<thead>

<tr>

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
Acción
</th>


</tr>


</thead>


<tbody>

`;







snapshot.forEach((ticketDoc)=>{


const ticket =
ticketDoc.data();



if(contador[ticket.estado] !== undefined){

contador[ticket.estado]++;

}





let fecha="--";


if(ticket.fechaCreacion){


fecha =

ticket.fechaCreacion
.toDate()
.toLocaleDateString(
"es-MX"
);

}




html += `


<tr>


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

${ticket.prioridad || "--"}

</td>



<td>

${ticket.estado || "--"}

</td>



<td>

${fecha}

</td>



<td>


<a
href="editar.html?id=${ticketDoc.id}"
class="btn-action">

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
"Error cargando tickets";


}



}





cargarTickets();
