// ==========================================
// COMPU DESK ADMIN
// Dashboard Controller
// Firebase + Firestore
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
// Cargar KPIs desde Firebase
// ==========================================


async function cargarKPIs(){


    try{



        // ============================
        // CLIENTES
        // ============================


        const clientesSnapshot =
        await getDocs(

            collection(
                db,
                "clientes"
            )

        );



        const clientesElemento =
        document.getElementById(
            "totalClientesDashboard"
        );



        if(clientesElemento){


            clientesElemento.textContent =
            clientesSnapshot.size;


        }







        // ============================
        // USUARIOS
        // ============================


        const usuariosElemento =
        document.getElementById(
            "totalUsuariosDashboard"
        );



        if(usuariosElemento){


            try{


                const usuariosSnapshot =
                await getDocs(

                    collection(
                        db,
                        "usuarios"
                    )

                );



                usuariosElemento.textContent =
                usuariosSnapshot.size;


            }
            catch(error){


                console.warn(
                    "Colección usuarios no disponible",
                    error
                );


                usuariosElemento.textContent =
                "0";


            }


        }







        // ============================
        // TICKETS
        // ============================


        const ticketsElemento =
        document.getElementById(
            "totalTicketsDashboard"
        );



        if(ticketsElemento){


            try{


                const ticketsSnapshot =
                await getDocs(

                    collection(
                        db,
                        "tickets"
                    )

                );



                ticketsElemento.textContent =
                ticketsSnapshot.size;


            }
            catch(error){


                console.warn(
                    "Colección tickets no disponible",
                    error
                );


                ticketsElemento.textContent =
                "0";


            }


        }








        // ============================
        // EQUIPOS
        // ============================


        const equiposElemento =
        document.getElementById(
            "totalEquiposDashboard"
        );



        if(equiposElemento){


            try{


                const equiposSnapshot =
                await getDocs(

                    collection(
                        db,
                        "equipos"
                    )

                );



                equiposElemento.textContent =
                equiposSnapshot.size;


            }
            catch(error){


                console.warn(
                    "Colección equipos no disponible",
                    error
                );


                equiposElemento.textContent =
                "0";


            }


        }





    }
    catch(error){


        console.error(
            "Error cargando KPIs:",
            error
        );


    }



}






// ==========================================
// Inicializar Dashboard
// ==========================================


cargarKPIs();
