// ==========================================
// COMPU DESK ADMIN
// Dashboard Controller
// ==========================================

import "./admin-layout.js";

import {
    auth,
    db
}
from "../../assets/firebase/firebase-config.js";


import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


import {
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";




// ==========================================
// VALIDAR SESION FIREBASE
// ==========================================

onAuthStateChanged(auth,(usuario)=>{


    console.log(
        "Usuario Firebase Dashboard:",
        usuario
    );


});




// ==========================================
// Cargar KPIs
// ==========================================

async function cargarKPIs(){


    try{


        // CLIENTES

        const clientesSnapshot =
        await getDocs(

            collection(
                db,
                "clientes"
            )

        );



        const totalClientes =
        document.getElementById(
            "totalClientesDashboard"
        );



        if(totalClientes){

            totalClientes.textContent =
            clientesSnapshot.size;

        }





        // USUARIOS

        const usuarios =
        document.getElementById(
            "totalUsuariosDashboard"
        );


        if(usuarios){

            usuarios.textContent = "-";

        }





        // TICKETS

        const tickets =
        document.getElementById(
            "totalTicketsDashboard"
        );


        if(tickets){

            tickets.textContent = "-";

        }





        // EQUIPOS

        const equipos =
        document.getElementById(
            "totalEquiposDashboard"
        );


        if(equipos){

            equipos.textContent = "-";

        }



    }
    catch(error){


        console.error(
            "Error cargando dashboard:",
            error
        );


    }



}




// ==========================================
// INICIO
// ==========================================


cargarKPIs();
