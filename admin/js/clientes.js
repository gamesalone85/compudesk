// ==========================================
// COMPU DESK
// ADMIN CLIENTES
// Producción v2.0
// ==========================================


import {

db

}

from "../../assets/firebase/firebase-config.js";


import {

collection,
getDocs

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




// ==========================================
// ELEMENTOS
// ==========================================


const tabla = document.getElementById(
"clientesTabla"
);




// ==========================================
// CARGAR CLIENTES
// ==========================================


async function cargarClientes(){


try{


const snapshot = await getDocs(

collection(
db,
"clientes"
)

);




if(snapshot.empty){


tabla.innerHTML =

`

<div class="empty-state">

<i class="fa-solid fa-building-circle-exclamation"></i>

<p>
No existen clientes registrados.
</p>

</div>

`;


return;


}




let html =


`

<table class="tabla-clientes">


<thead>


<tr>


<th>
Empresa
</th>


<th>
Contacto
</th>


<th>
Plan
</th>


<th>
Estado
</th>


<th>
Acciones
</th>


</tr>


</thead>



<tbody>

`;





snapshot.forEach(doc=>{


const cliente = doc.data();



const estado = 
(cliente.estado || "Activo")
.toLowerCase();



let badgeEstado = "";



if(estado === "activo"){


badgeEstado =

`

<span class="badge-activo">

<i class="fa-solid fa-circle-check"></i>

Activo

</span>

`;

}

else{


badgeEstado =

`

<span class="badge-inactivo">

<i class="fa-solid fa-circle-xmark"></i>

${cliente.estado}

</span>

`;

}





html +=


`

<tr>


<td>


<div class="empresa-cell">


<div class="empresa-icon">

<i class="fa-solid fa-building"></i>

</div>


<div>


<strong>

${cliente.empresa || "Sin nombre"}

</strong>


<small>

ID:
${doc.id.substring(0,8)}

</small>


</div>


</div>


</td>





<td>

${cliente.contacto || "Sin contacto"}

</td>





<td>

<span class="plan-badge">

${cliente.plan || "Básico"}

</span>


</td>





<td>

${badgeEstado}

</td>





<td>


<a

href="editar.html?id=${doc.id}"

class="accion-editar"

title="Editar cliente"

>


<i class="fa-solid fa-pen"></i>

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



tabla.innerHTML = html;



}



catch(error){



console.error(

"Error clientes:",
error

);



tabla.innerHTML =


`

<div class="empty-state">


<i class="fa-solid fa-triangle-exclamation"></i>


<p>
Error cargando clientes.
</p>


</div>

`;



}



}




cargarClientes();
