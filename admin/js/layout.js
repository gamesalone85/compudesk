// ==========================================
// COMPU DESK
// ADMIN LAYOUT MANAGER
// Producción v1.0
// ==========================================


import {
    auth
} from "../../assets/firebase/firebase-config.js";


import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



// ==========================================
// CARGAR COMPONENTES
// ==========================================


async function loadComponent(
    id,
    file
){

    const container =
        document.getElementById(id);


    if(!container){

        console.warn(
            "No existe contenedor:",
            id
        );

        return;

    }


    try{


        const response =
            await fetch(file);


        if(!response.ok){

            throw new Error(
                `Error cargando ${file}`
            );

        }


        container.innerHTML =
            await response.text();


    }
    catch(error){

        console.error(
            error
        );

    }

}





// ==========================================
// INICIALIZAR LAYOUT
// ==========================================


async function initLayout(){


    await loadComponent(

        "header-container",

        "/admin/components/header.html"

    );



    await loadComponent(

        "sidebar-container",

        "/admin/components/sidebar.html"

    );



    loadAdminData();


    activateMenu();


    initLogout();

    initMobileMenu();


}




// ==========================================
// DATOS ADMIN
// ==========================================


function loadAdminData(){


    const adminStorage =

        localStorage.getItem(
            "compudeskAdmin"
        );



    if(!adminStorage)

        return;



    const admin =

        JSON.parse(
            adminStorage
        );



    const nombre =

        document.getElementById(
            "adminNombre"
        );



    const rol =

        document.getElementById(
            "adminRol"
        );



    if(nombre){

        nombre.textContent =

            admin.nombre ||

            admin.correo ||

            "Administrador";

    }



    if(rol){

        rol.textContent =

            admin.rol ||

            "Admin";

    }


}





// ==========================================
// MENU ACTIVO
// ==========================================


function activateMenu(){


    const current =

        window.location.pathname;



    document
    .querySelectorAll(
        ".menu-item"
    )
    .forEach(link=>{


        if(
            current.includes(
                link.getAttribute("href")
            )
        ){

            link.classList.add(
                "active"
            );

        }


    });


}





// ==========================================
// LOGOUT
// ==========================================


function initLogout(){


    const button =

        document.getElementById(
            "btnLogout"
        );



    if(!button)

        return;



    button.addEventListener(

        "click",

        async()=>{


            const confirmar =

                confirm(
                    "¿Cerrar sesión?"
                );



            if(!confirmar)

                return;



            await signOut(auth);



            localStorage.removeItem(
                "compudeskAdmin"
            );



            window.location.href =

                "/admin/login.html";


        }

    );


}




// ==========================================
// EJECUTAR
// ==========================================


document.addEventListener(

    "DOMContentLoaded",

    initLayout

);
// ==========================================
// MENU MOVIL
// ==========================================

function initMobileMenu(){

    const sidebar =
        document.querySelector(".admin-sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    const menu =
        document.getElementById("menuToggle");

    if(menu){

        menu.addEventListener("click",()=>{

            sidebar.classList.toggle("active");

            overlay?.classList.toggle("active");

        });

    }

    overlay?.addEventListener("click",()=>{

        sidebar.classList.remove("active");

        overlay.classList.remove("active");

    });

    document
        .querySelectorAll(".admin-menu-item")
        .forEach(item=>{

            item.addEventListener("click",()=>{

                if(window.innerWidth<=900){

                    sidebar.classList.remove("active");

                    overlay?.classList.remove("active");

                }

            });

        });

}
