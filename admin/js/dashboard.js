// ==========================================
// COMPU DESK ADMIN
// Dashboard Controller
// Firebase + Firestore
// ==========================================


import { 
    auth,
    db
} from "../../assets/firebase/firebase-config.js";


import {

    signOut

}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {

    collection,
    getDocs

}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





// ==========================================
// Cargar componentes HTML
// ==========================================


async function cargarComponente(id, archivo){


    try{


        const respuesta =
        await fetch(archivo);



        const contenido =
        await respuesta.text();



        const elemento =
        document.getElementById(id);



        if(elemento){

            elemento.innerHTML =
            contenido;

        }



    }catch(error){


        console.error(
            "Error cargando componente:",
            archivo,
            error
        );


    }


}






// ==========================================
// Cargar Sidebar y Header
// ==========================================


await cargarComponente(
    "sidebar",
    "components/sidebar.html"
);



await cargarComponente(
    "header",
    "components/header.html"
);






// ==========================================
// Datos del administrador
// ==========================================


const admin = JSON.parse(

    localStorage.getItem(
        "compudeskAdmin"
    )

);





if(admin){


    const nombre =
    document.getElementById(
        "adminName"
    );



    const rol =
    document.getElementById(
        "adminRole"
    );




    if(nombre){

        nombre.textContent =
        admin.nombre;

    }




    if(rol){

        rol.textContent =
        admin.rol;

    }


}








// ==========================================
// Logout
// ==========================================


const logoutButton =
document.getElementById(
    "logout"
);





if(logoutButton){



    logoutButton.addEventListener(
        "click",
        async()=>{


            try{


                await signOut(auth);



                localStorage.removeItem(
                    "compudeskAdmin"
                );



                window.location.href =
                "login.html";



            }
            catch(error){


                console.error(
                    "Error cerrando sesión",
                    error
                );


            }


        }

    );


}









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



        const totalClientes =
        clientesSnapshot.size;



        const clientesElemento =
        document.getElementById(
            "totalClientesDashboard"
        );



        if(clientesElemento){


            clientesElemento.textContent =
            totalClientes;


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
// Iniciar Dashboard
// ==========================================


cargarKPIs();
