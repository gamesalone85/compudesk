// ==========================================
// COMPU DESK ADMIN
// Dashboard Controller
// ==========================================


import { auth } from "../../assets/firebase/firebase-config.js";


import {
    signOut
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";




// Cargar componentes HTML

async function cargarComponente(id, archivo){


    try{


        const respuesta = await fetch(archivo);


        const contenido = await respuesta.text();


        document.getElementById(id).innerHTML = contenido;



    }catch(error){


        console.error(
            "Error cargando componente:",
            archivo,
            error
        );


    }


}




// Cargar sidebar y header

await cargarComponente(
    "sidebar",
    "components/sidebar.html"
);


await cargarComponente(
    "header",
    "components/header.html"
);





// Obtener datos del administrador

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






// Logout

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



            }catch(error){


                console.error(
                    "Error cerrando sesión",
                    error
                );


            }



        }
    );


}
