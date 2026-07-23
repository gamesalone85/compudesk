// ==========================================
// COMPU DESK ADMIN
// Dashboard Controller
// ==========================================

import "./admin-layout.js";

import {
    db
}
from "../../assets/firebase/firebase-config.js";

import {

    collection,
    getDocs

}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



// ==========================================
// Cargar KPIs
// ==========================================
import {
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


onAuthStateChanged(auth,(usuario)=>{

console.log(
"AUTH ACTUAL DASHBOARD:",
usuario
);


});



async function cargarKPIs(){


async function cargarKPIs(){

    try{

        // ==========================
        // CLIENTES
        // ==========================

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


        // ==========================
        // KPIs pendientes
        // ==========================

        const usuarios =
        document.getElementById(
            "totalUsuariosDashboard"
        );

        if(usuarios){

            usuarios.textContent = "-";

        }



        const tickets =
        document.getElementById(
            "totalTicketsDashboard"
        );

        if(tickets){

            tickets.textContent = "-";

        }



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
// Inicio
// ==========================================

cargarKPIs();
