// ==========================================
// COMPU DESK
// ADMIN CLIENTES
// Producción v1.0
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


const tabla =

document.getElementById(
"clientesTabla"
);




// ==========================================
// CARGAR CLIENTES
// ==========================================


async function cargarClientes(){


try{


const snapshot =

await getDocs(

collection(
db,
"clientes"
)

);



if(snapshot.empty){


tabla.innerHTML =

`

<p>
No existen clientes registrados.
</p>

`;

return;


}





let html =

`

<table width="100%">


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



html +=


`

<tr>


<td>
${cliente.empresa || ""}
</td>


<td>
${cliente.contacto || ""}
</td>


<td>
${cliente.plan || ""}
</td>


<td>
${cliente.estado || ""}
</td>



<td>

<a href="editar.html?id=${doc.id}">
Editar
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

<p>
Error cargando clientes.
</p>

`;


}



}



cargarClientes();
