// ==========================================
// COMPU DESK ADMIN
// Nuevo Usuario
// Firestore preparado para Firebase Auth + Blaze
// ==========================================


import { db } from "../../assets/firebase/firebase-config.js";


import {

    collection,
    addDoc,
    serverTimestamp,
    getDocs

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




// ==========================================
// ELEMENTOS
// ==========================================


const formulario =
document.getElementById(
    "usuarioForm"
);


const mensaje =
document.getElementById(
    "mensaje"
);


const clienteSelect =
document.getElementById(
    "clienteId"
);





// ==========================================
// ADMIN ACTUAL
// ==========================================


const admin =

JSON.parse(

localStorage.getItem(
    "compudeskAdmin"
)

);






// ==========================================
// CARGAR CLIENTES
// ==========================================


async function cargarClientes(){


    if(!clienteSelect){

        return;

    }



    try{


        const resultado =

        await getDocs(

            collection(
                db,
                "clientes"
            )

        );



        resultado.forEach((doc)=>{


            const cliente =
            doc.data();



            const opcion =
            document.createElement(
                "option"
            );



            opcion.value =
            doc.id;



            opcion.textContent =

            cliente.empresa || 
            "Empresa sin nombre";



            clienteSelect.appendChild(
                opcion
            );



        });



    }
    catch(error){


        console.error(
            "Error cargando clientes:",
            error
        );


    }


}






// ==========================================
// CREAR USUARIO
// ==========================================


if(formulario){


formulario.addEventListener(

"submit",

async(e)=>{


e.preventDefault();




try{


mostrarMensaje(
"Guardando usuario...",
""
);





const nombre =

document
.getElementById("nombre")
.value
.trim();




const correo =

document
.getElementById("correo")
.value
.trim();




const telefono =

document
.getElementById("telefono")
.value
.trim();




const clienteId =

document
.getElementById("clienteId")
.value;




const rol =

document
.getElementById("rol")
.value;




const estado =

document
.getElementById("estado")
.value;






if(
nombre === "" ||
correo === "" ||
clienteId === ""
){


mostrarMensaje(
"Completa los campos obligatorios.",
"error"
);


return;


}







// ==========================================
// PERFIL FIRESTORE
// ==========================================


const nuevoUsuario = {


nombre,


correo,


telefono,


clienteId,



rol,



estado,



authPendiente:true,



uid:null,



fechaAlta:
serverTimestamp(),



creadoPor:

admin
?
admin.nombre
:
"Administrador"



};






await addDoc(


collection(
db,
"usuarios"
),


nuevoUsuario


);







mostrarMensaje(

"Usuario registrado correctamente. Pendiente de activación.",

"success"

);






formulario.reset();





setTimeout(()=>{


window.location.href =
"index.html";


},1500);





}

catch(error){


console.error(

"Error creando usuario:",

error

);



mostrarMensaje(

"Error al guardar usuario.",

"error"

);



}



});


}








// ==========================================
// MENSAJES
// ==========================================


function mostrarMensaje(
texto,
tipo
){



if(!mensaje){

return;

}



mensaje.textContent =
texto;



mensaje.className =
tipo;



}





// ==========================================
// INICIO
// ==========================================


cargarClientes();
