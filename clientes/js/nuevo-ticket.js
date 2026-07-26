// ==========================================
// COMPU DESK
// NUEVO TICKET CLIENTE
// Producción 2.0
// Firebase Auth + Firestore
// ==========================================


import {

auth,
db

}

from "../../assets/firebase/firebase-config.js";



import {

collection,
query,
where,
getDocs,
doc,
getDoc,
addDoc,
serverTimestamp

}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




// ==========================================
// ELEMENTOS
// ==========================================


const form = 
document.getElementById("ticketForm");



const mensaje =
document.getElementById("mensaje");





// ==========================================
// EVENTO CREAR TICKET
// ==========================================


form?.addEventListener(

"submit",

async(e)=>{


e.preventDefault();





const user =
auth.currentUser;



if(!user){


window.location.href="../login.html";


return;


}






try{



// ==========================================
// BUSCAR USUARIO POR UID
// ==========================================


const usuarioQuery = query(


collection(db,"usuarios"),


where(

"uid",

"==",

user.uid

)


);



const usuarioSnap =

await getDocs(usuarioQuery);





if(usuarioSnap.empty){


throw new Error(
"No existe perfil de usuario"
);


}





const usuario =

usuarioSnap.docs[0].data();






if(
!usuario.clienteId
){


throw new Error(
"Usuario sin empresa asociada"
);


}







// ==========================================
// BUSCAR EMPRESA
// ==========================================


const clienteRef =

doc(

db,

"clientes",

usuario.clienteId

);



const clienteSnap =

await getDoc(clienteRef);





if(
!clienteSnap.exists()
){


throw new Error(
"No existe empresa registrada"
);


}



const cliente =

clienteSnap.data();







// ==========================================
// CAPTURAR FORMULARIO
// ==========================================


const categoria =

document
.getElementById("categoria")
.value
.trim();



const prioridad =

document
.getElementById("prioridad")
.value
.trim();



const titulo =

document
.getElementById("titulo")
.value
.trim();



const descripcion =

document
.getElementById("descripcion")
.value
.trim();






if(
!categoria ||
!prioridad ||
!titulo ||
!descripcion
){


mostrar(

"Completa todos los campos.",

"error"

);


return;


}






// ==========================================
// CREAR TICKET
// ==========================================


console.log("AUTH UID:", user.uid);
console.log("DATOS TICKET:", {

clienteId: usuario.clienteId,

usuarioId: user.uid,
uidValidacion: user.uid,

nombreUsuario: usuario.nombre,

correoUsuario: usuario.correo,

empresa: cliente.empresa

});


const ticketRef = await addDoc(

collection(db,"tickets"),

{


// Identificación empresa

clienteId:
usuario.clienteId,


empresa:
cliente.empresa || "",




// Usuario creador

usuarioId:
user.uid,


nombreUsuario:
usuario.nombre || "",


correoUsuario:
usuario.correo || "",




// Información ticket

categoria,


prioridad,


titulo,


descripcion,



// Estado inicial

estado:
"abierto",




// Fechas

fechaCreacion:
serverTimestamp(),


fechaActualizacion:
serverTimestamp()



}

);








console.log(

"Ticket creado:",

ticketRef.id

);






mostrar(

"Ticket creado correctamente.",

"success"

);






setTimeout(()=>{


window.location.href="index.html";


},1200);







}

catch(error){



console.error(

"Error creando ticket:",

error

);




mostrar(

"No fue posible crear el ticket.",

"error"

);



}



});








// ==========================================
// MENSAJES
// ==========================================


function mostrar(texto,tipo){



if(!mensaje){

return;

}



mensaje.textContent = texto;



mensaje.className =

"login-alert "+tipo;



}
