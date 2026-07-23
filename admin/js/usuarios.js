// ==========================================
// COMPU DESK ADMIN
// Gestión de Usuarios
// Firebase Firestore
// ==========================================


import { db } from "../../assets/firebase/firebase-config.js";


import {

collection,
getDocs,
query,
orderBy,
doc,
deleteDoc

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





// ==========================================
// ELEMENTOS
// ==========================================


const tablaUsuarios =
document.getElementById("usuariosTabla");


const totalUsuarios =
document.getElementById("totalUsuarios");


const usuariosActivos =
document.getElementById("usuariosActivos");


const buscarUsuario =
document.getElementById("buscarUsuario");




let usuarios = [];





// ==========================================
// CARGAR USUARIOS
// ==========================================


async function cargarUsuarios(){


try{


const referencia =
collection(
    db,
    "usuarios"
);



const consulta =
query(
    referencia,
    orderBy(
        "fechaAlta",
        "desc"
    )
);



const resultado =
await getDocs(
    consulta
);



usuarios=[];



resultado.forEach((doc)=>{


usuarios.push({

id:doc.id,

...doc.data()

});


});




mostrarUsuarios(
usuarios
);



actualizarResumen();



}
catch(error){


console.error(
"Error cargando usuarios:",
error
);



if(tablaUsuarios){

tablaUsuarios.innerHTML=`

<tr>

<td colspan="6">

Error cargando usuarios

</td>

</tr>

`;

}


}


}





// ==========================================
// MOSTRAR TABLA
// ==========================================


function mostrarUsuarios(lista){



if(!tablaUsuarios)
return;



if(lista.length===0){


tablaUsuarios.innerHTML=`

<tr>

<td colspan="6">

No existen usuarios registrados.

</td>

</tr>

`;

return;


}




tablaUsuarios.innerHTML="";




lista.forEach((usuario)=>{


const fila =
document.createElement("tr");



fila.innerHTML=`

<td>
${usuario.nombre || "-"}
</td>


<td>
${usuario.correo || "-"}
</td>


<td>
${usuario.empresa || "-"}
</td>


<td>
${usuario.rol || "cliente"}
</td>


<td>

<span class="estado ${usuario.estado || "inactivo"}">

${(usuario.estado || "inactivo").toUpperCase()}

</span>

</td>



<td class="acciones">


<a href="editar.html?id=${usuario.id}"
title="Editar usuario">

<i class="fa-solid fa-pen"></i>

</a>



<a href="#"
class="eliminarUsuario"
data-id="${usuario.id}"
title="Eliminar usuario">

<i class="fa-solid fa-trash"></i>

</a>


</td>


`;



tablaUsuarios.appendChild(fila);



});



}

// ==========================================
// ELIMINAR USUARIO
// ==========================================


async function eliminarUsuario(id){


const confirmar =
confirm(
"¿Deseas eliminar este usuario?"
);



if(!confirmar){

return;

}



try{


await deleteDoc(

doc(
db,
"usuarios",
id
)

);



alert(
"Usuario eliminado correctamente."
);



cargarUsuarios();



}
catch(error){


console.error(
"Error eliminando usuario:",
error
);


alert(
"No se pudo eliminar el usuario."
);


}



}



// ==========================================
// RESUMEN
// ==========================================


function actualizarResumen(){



if(totalUsuarios){

totalUsuarios.textContent =
usuarios.length;

}



if(usuariosActivos){


usuariosActivos.textContent =

usuarios.filter(
(usuario)=>
usuario.estado==="activo"
).length;


}


}





// ==========================================
// BUSCADOR
// ==========================================


if(buscarUsuario){


buscarUsuario.addEventListener(
"input",
()=>{


const texto =
buscarUsuario.value
.toLowerCase()
.trim();



const filtrados =
usuarios.filter(
(usuario)=>{


return (

usuario.nombre?.toLowerCase().includes(texto)

||

usuario.correo?.toLowerCase().includes(texto)

||

usuario.empresa?.toLowerCase().includes(texto)

);


}

);



mostrarUsuarios(
filtrados
);



});


}



document.addEventListener(
"click",
(e)=>{


const boton =
e.target.closest(
".eliminarUsuario"
);



if(boton){

e.preventDefault();


const id =
boton.dataset.id;


eliminarUsuario(id);

}


});

// ==========================================
// INICIO
// ==========================================

await cargarUsuarios();
