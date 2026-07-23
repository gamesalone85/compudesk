/*
========================================
COMPU DESK
Mis Tickets
Firebase Firestore
========================================
*/


import { db } from "../../assets/firebase/firebase-config.js";


import {

collection,
query,
where,
getDocs,
orderBy

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const tabla =
document.getElementById(
"listaTickets"
);





async function cargarTickets(){



const cliente =

JSON.parse(

localStorage.getItem(
"clienteCompudesk"
)

);





if(!cliente){

tabla.innerHTML = `

<tr>

<td colspan="5">

No existe sesión.

</td>

</tr>

`;

return;


}





try{



const consulta =

query(

collection(
db,
"tickets"
),


where(
"clienteId",
"==",
cliente.id
),


orderBy(
"fechaCreacion",
"desc"
)


);






const resultado =

await getDocs(
consulta
);






if(resultado.empty){


tabla.innerHTML = `

<tr>

<td colspan="5">

No tienes tickets registrados.

</td>

</tr>

`;


return;


}







tabla.innerHTML = "";






resultado.forEach((doc)=>{



const ticket =
doc.data();





const fila =
document.createElement(
"tr"
);





fila.innerHTML = `


<td>

${ticket.titulo}

</td>


<td>

${ticket.categoria}

</td>



<td>

${ticket.prioridad}

</td>


<td>

<span class="estado">

${ticket.estado}

</span>

</td>


<td>

Pendiente

</td>


`;





tabla.appendChild(
fila
);





});



}

catch(error){


console.error(
"Error cargando tickets:",
error
);



tabla.innerHTML = `

<tr>

<td colspan="5">

Error cargando tickets.

</td>

</tr>

`;



}



}





cargarTickets();



});
