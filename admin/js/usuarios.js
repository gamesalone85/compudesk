// ==========================================
// COMPU DESK
// ADMIN USUARIOS
// Producción v1.0
// ==========================================


import {

db

}

from "../../assets/firebase/firebase-config.js";



import {

collection,
getDocs,
doc,
getDoc,
query,
orderBy

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




const tabla =
document.getElementById(
"usuariosTabla"
);





async function cargarUsuarios(){


try{


const consulta = query(

collection(
db,
"usuarios"
),

orderBy(
"fechaAlta",
"desc"
)

);



const snapshot = await getDocs(
consulta
);



if(snapshot.empty){


tabla.innerHTML =

`
<p>
No existen usuarios registrados.
</p>
`;


return;


}




let html = `


<table class="clientes-table">


<thead>

<tr>

<th>
Nombre
</th>


<th>
Correo
</th>


<th>
Empresa
</th>


<th>
Rol
</th>


<th>
Estado
</th>


<th>
Acción
</th>


</tr>


</thead>


<tbody>


`;





for(const item of snapshot.docs){



const usuario =
item.data();



let empresa =
"--";



if(usuario.clienteId){


const clienteRef =
doc(
db,
"clientes",
usuario.clienteId
);



const clienteSnap =
await getDoc(
clienteRef
);



if(clienteSnap.exists()){


empresa =
clienteSnap.data().empresa;


}



}





html += `


<tr>


<td>

${usuario.nombre || "--"}

</td>


<td>

${usuario.correo || "--"}

</td>


<td>

${empresa}

</td>


<td>

${usuario.rol || "--"}

</td>


<td>


<span class="status ${usuario.estado}">

${usuario.estado}

</span>


</td>


<td>


<a

href="editar.html?id=${item.id}"

class="btn-action">


<i class="fa-solid fa-pen"></i>


</a>


</td>


</tr>


`;



}





html += `

</tbody>

</table>

`;




tabla.innerHTML =
html;



}
catch(error){


console.error(
"Error usuarios:",
error
);



tabla.innerHTML =
"No fue posible cargar usuarios";


}



}




cargarUsuarios();
