// ==========================================
// COMPU DESK
// LAYOUT MANAGER
// Producción v1.0
// ==========================================

import { COMPONENTS } from "./config.js";

import { getAdmin } from "./session.js";

import {
    logout
} from "../../assets/firebase/services/auth.service.js";


// ==========================================
// ESPERAR AUTENTICACIÓN
// ==========================================

document.addEventListener(
    "compudesk-auth-ready",
    async () => {

        await loadComponents();

        loadAdminData();

        activateMenu();

        configureLogout();

    }
);


// ==========================================
// COMPONENTES
// ==========================================

async function loadComponents(){

    await loadHTML(
        "header-container",
        COMPONENTS.HEADER
    );


    await loadHTML(
        "sidebar-container",
        COMPONENTS.SIDEBAR
    );

}


// ==========================================
// CARGAR HTML
// ==========================================

async function loadHTML(
    elementId,
    url
){

    const container =
        document.getElementById(elementId);


    if(!container)
        return;


    try{

        const response =
            await fetch(url);


        if(!response.ok){

            throw new Error(
                `Error cargando ${url}`
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
// DATOS ADMIN
// ==========================================

function loadAdminData(){

    const admin =
        getAdmin();


    if(!admin)
        return;



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
            admin.nombre || "Administrador";

    }


    if(rol){

        rol.textContent =
            admin.rol || "";

    }


}


// ==========================================
// MENU ACTIVO
// ==========================================

function activateMenu(){

    const path =
        window.location.pathname;


    document
    .querySelectorAll(
        "[data-route]"
    )
    .forEach(item=>{


        if(
            path.includes(
                item.dataset.route
            )
        ){

            item.classList.add(
                "active"
            );

        }


    });

}


// ==========================================
// LOGOUT
// ==========================================

function configureLogout(){

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
                    "¿Deseas cerrar sesión?"
                );


            if(!confirmar)
                return;



            await logout();


        }
    );


}
