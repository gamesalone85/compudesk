// ==========================================
// COMPU DESK ADMIN
// Editar Cliente
// ==========================================


import { db } from "../../assets/firebase/firebase-config.js";


import {

doc,
getDoc,
updateDoc

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const formulario =
document.getElementById(
"editarClienteForm"
);



const mensaje =
document.getElementById(
"mensaje"
);




// Obtener ID desde URL

const parametros =
new URLSearchParams(
window.location.search
);



const clienteID =
parametros.get("id");





if(!clienteID){


    alert(
        "Cliente no válido"
    );


    window.location.href =
    "index.html";


}







const clienteRef =
doc(
db,
"clientes",
clienteID
);







// Cargar datos

async function cargarCliente(){


    try{


        const resultado =
        await getDoc(clienteRef);



        if(!resultado.exists()){


            alert(
                "Cliente no encontrado"
            );


            window.location.href =
            "index.html";


            return;

        }




        const cliente =
        resultado.data();



        document.getElementById("empresa").value =
        cliente.empresa || "";



        document.getElementById("contacto").value =
        cliente.contacto || "";



        document.getElementById("correo").value =
        cliente.correo || "";



        document.getElementById("telefono").value =
        cliente.telefono || "";



        document.getElementById("tipo").value =
        cliente.tipo || "empresa";



        document.getElementById("plan").value =
        cliente.plan || "basico";



        document.getElementById("estado").value =
        cliente.estado || "activo";



    }
    catch(error){


        console.error(error);


    }


}







// Guardar cambios

formulario.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



try{


mensaje.textContent =
"Guardando cambios...";




await updateDoc(

clienteRef,

{


empresa:
document.getElementById("empresa").value.trim(),


contacto:
document.getElementById("contacto").value.trim(),


correo:
document.getElementById("correo").value.trim(),


telefono:
document.getElementById("telefono").value.trim(),


tipo:
document.getElementById("tipo").value,


plan:
document.getElementById("plan").value,


estado:
document.getElementById("estado").value


}

);




mensaje.textContent =
"Cliente actualizado correctamente.";

mensaje.style.color =
"green";




setTimeout(()=>{


window.location.href =
"index.html";


},1200);



}
catch(error){


console.error(error);


mensaje.textContent =
"Error actualizando cliente.";

mensaje.style.color =
"red";


}



});






cargarCliente();
