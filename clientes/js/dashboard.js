// ==========================================
// COMPU DESK
// CLIENTE DASHBOARD
// Producción 3.0
// Firebase UID + Perfil UID
// ==========================================


import {
auth,
db
}
from "../../assets/firebase/firebase-config.js";


import {
onAuthStateChanged,
signOut
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {

collection,
query,
where,
getDocs,
doc,
getDoc

}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



const nombre =
document.getElementById("nombreCliente");


const empresa =
document.getElementById("empresaCliente");


const plan =
document.getElementById("planCliente");


const datos =
document.getElementById("datosEmpresa");


const abiertos =
document.getElementById("ticketsAbiertos");


const cerrados =
document.getElementById("ticketsCerrados");





onAuthStateChanged(auth, async(user)=>{


if(!user){

window.location.href="login.html";

return;

}



try{


// =================================
// BUSCAR PERFIL POR UID
// =================================


const usuariosQuery = query(

collection(db,"usuarios"),

where(
"uid",
"==",
user.uid
)

);



const usuariosSnap =
await getDocs(usuariosQuery);



if(usuariosSnap.empty){

throw new Error(
"No existe perfil asociado"
);

}



const usuario =
usuariosSnap.docs[0].data();





// =================================
// BUSCAR EMPRESA
// =================================


const clienteSnap =
await getDoc(

doc(

db,

"clientes",

usuario.clienteId

)

);



if(!clienteSnap.exists()){

throw new Error(
"Empresa no encontrada"
);

}



const cliente =
clienteSnap.data();





// =================================
// MOSTRAR INFORMACION
// =================================


nombre.textContent =
usuario.nombre;



empresa.textContent =
cliente.empresa;



plan.textContent =
cliente.plan || "Sin plan";





datos.innerHTML = `


<div class="empresa-grid">


<div>

<label>
Empresa
</label>

<strong>
${cliente.empresa || "-"}
</strong>

</div>



<div>

<label>
Contacto
</label>

<strong>
${cliente.contacto || "-"}
</strong>

</div>



<div>

<label>
Correo
</label>

<strong>
${cliente.correo || "-"}
</strong>

</div>



<div>

<label>
Teléfono
</label>

<strong>
${cliente.telefono || "-"}
</strong>

</div>



<div>

<label>
RFC
</label>

<strong>
${cliente.rfc || "No registrado"}
</strong>

</div>


</div>

`;




// =================================
// TICKETS
// =================================


const ticketsQuery = query(

collection(
db,
"tickets"
),

where(

"clienteId",

"==",

usuario.clienteId

)

);



const ticketsSnap =
await getDocs(ticketsQuery);



let abiertosTotal=0;

let cerradosTotal=0;



ticketsSnap.forEach(ticket=>{


const data =
ticket.data();



if(data.estado==="cerrado"){

cerradosTotal++;

}else{

abiertosTotal++;

}


});




abiertos.textContent =
abiertosTotal;


cerrados.textContent =
cerradosTotal;



}

catch(error){


console.error(
"Error Dashboard:",
error
);


datos.innerHTML =

`
<p>
No fue posible cargar información.
</p>
`;

}


});







// LOGOUT


document
.getElementById("logout")
?.addEventListener(
"click",
async()=>{


await signOut(auth);


localStorage.removeItem(
"clienteCompudesk"
);


window.location.href="login.html";


});
