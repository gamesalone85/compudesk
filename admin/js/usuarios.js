// ==========================================
// COMPU DESK
// ADMIN USUARIOS
// Producción v1.1
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





// ==========================================
// CARGAR USUARIOS
// ==========================================


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
Fecha alta
</th>


<th>
Acción
</th>


</tr>


</thead>


<tbody>

`;







for(const usuarioDoc of snapshot.docs){



const usuario = usuarioDoc.data();





let empresa = "Sin empresa";





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






let fecha = "--";



if(usuario.fechaAlta){


fecha =

usuario.fechaAlta
.toDate()
.toLocaleDateString(
"es-MX"
);


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

${fecha}

</td>




<td>


<a

href="editar.html?id=${usuarioDoc.id}"

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

"Error cargando usuarios:",

error

);



tabla.innerHTML =

`
<p>
Error al cargar usuarios.
</p>
`;



}



}





cargarUsuarios();
