// ==========================================
// COMPU DESK ADMIN
// Admin Layout Controller
// Sidebar + Header + Session
// ==========================================


import { auth } from "../../assets/firebase/firebase-config.js";


import {
    signOut
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";




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


    }
    catch(error){


        console.error(
            "Error cargando componente:",
            archivo,
            error
        );


    }


}






// ==========================================
// Detectar ubicación actual
// ==========================================


const ruta =
window.location.pathname;




let rutaComponentes = "";



if(
    ruta.includes("/clientes/")
){


    rutaComponentes =
    "../";


}
else{


    rutaComponentes =
    "";

}







// ==========================================
// Cargar Sidebar y Header
// ==========================================


await cargarComponente(

    "sidebar",

    rutaComponentes + "components/sidebar.html"

);



await cargarComponente(

    "header",

    rutaComponentes + "components/header.html"

);









// ==========================================
// Datos administrador
// ==========================================


const admin =
JSON.parse(

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


document.addEventListener(
"click",
async(e)=>{


    if(
        e.target.closest("#logout")
    ){


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


});
