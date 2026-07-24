// ==========================================
// COMPU DESK
// CLIENTE MIS TICKETS
// Producción v1.0
// ==========================================


import {

auth,
db

}

from "../../assets/firebase/firebase-config.js";



import {

doc,
getDoc,
collection,
query,
where,
getDocs,
orderBy

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const tabla =

document.getElementById(
"ticketsLista"
);





async function cargarTickets(){



try{



const usuarioAuth = auth.currentUser;



if(!usuarioAuth){


window.location.href="../login.html";


return;


}






// ===============================
// OBTENER USUARIO
// ===============================


const usuarioRef =

doc(

db,

"usuarios",

usuarioAuth.uid

);



const usuarioSnap =

await getDoc(usuarioRef);




if(!usuarioSnap.exists()){

throw new Error(
"Perfil no encontrado"
);

}




const usuario = usuarioSnap.data();






// ===============================
// CONSULTAR TICKETS
// ===============================


const ticketsQuery =

query(

collection(db,"tickets"),


where(

"clienteId",

"==",

usuario.clienteId

),


orderBy(

"fechaCreacion",

"desc"

)

);





const resultado =

await getDocs(
ticketsQuery
);






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


const ticket = ticketDoc.data();



const fecha =

ticket.fechaCreacion

?

ticket.fechaCreacion
.toDate()
.toLocaleDateString("es-MX")

:

"Procesando";





tabla.innerHTML += `

<tr>


<td>

#${ticketDoc.id.substring(0,8)}

</td>



<td>

${ticket.titulo}

</td>



<td>

<span class="badge ${ticket.prioridad}">

${ticket.prioridad}

</span>

</td>



<td>

${ticket.estado}

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
"Error cargando tickets:",
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





// Firebase tarda un instante en recuperar sesión

auth.onAuthStateChanged(()=>{

cargarTickets();

});
