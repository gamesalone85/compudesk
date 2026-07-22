// ==========================================
// COMPU DESK ADMIN
// Perfil Cliente
// ==========================================


import { db } from "../../assets/firebase/firebase-config.js";


import {

doc,
getDoc

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



import { generarPDF }

from "./generar-pdf-cliente.js";




// ==========================================
// VARIABLES
// ==========================================


const parametros =
new URLSearchParams(
window.location.search
);



const clienteID =
parametros.get("id");



let clienteActual = null;





if(!clienteID){


    window.location.href =
    "index.html";


}







const clienteRef =
doc(
db,
"clientes",
clienteID
);







// ==========================================
// CARGAR CLIENTE
// ==========================================


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



    // Guardamos cliente global

    clienteActual = cliente;






    // ==============================
    // MOSTRAR INFORMACIÓN
    // ==============================



    document
    .getElementById("empresa")
    .textContent =
    cliente.empresa || "-";




    document
    .getElementById("contacto")
    .textContent =
    cliente.contacto || "-";




    document
    .getElementById("correo")
    .textContent =
    cliente.correo || "-";




    document
    .getElementById("telefono")
    .textContent =
    cliente.telefono || "-";




    document
    .getElementById("plan")
    .textContent =
    cliente.plan || "-";





    const estado =
    document.getElementById("estado");



    estado.textContent =
    (cliente.estado || "pendiente")
    .toUpperCase();




    estado.className =
    "estado " + cliente.estado;





}
catch(error){


    console.error(
        "Error cargando cliente:",
        error
    );


}



}









// ==========================================
// BOTÓN GENERAR PDF
// ==========================================


document
.getElementById("btnPDF")
.addEventListener(
"click",
()=>{


    if(!clienteActual){


        alert(
            "No hay información del cliente disponible."
        );


        return;


    }



    generarPDF(
        clienteActual
    );



});







// ==========================================
// INICIO
// ==========================================


cargarCliente();
