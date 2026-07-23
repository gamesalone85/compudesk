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
// Detectar rutas
// ==========================================

const rutaActual =
window.location.pathname;

// ¿Estamos dentro de un módulo?
// Ejemplo:
// /admin/dashboard.html        -> false
// /admin/clientes/index.html   -> true
// /admin/usuarios/index.html   -> true
// /admin/tickets/index.html    -> true
// /admin/configuracion/index.html -> true

const esSubModulo =
rutaActual.includes("/clientes/") ||
rutaActual.includes("/usuarios/") ||
rutaActual.includes("/tickets/") ||
rutaActual.includes("/configuracion/");

const rutaComponentes =
esSubModulo
? "../components/"
: "components/";


// ==========================================
// Cargar componentes
// ==========================================

async function cargarComponente(id, archivo){

    try{

        const respuesta =
        await fetch(archivo);

        if(!respuesta.ok){

            throw new Error(
                `No se encontró ${archivo}`
            );

        }

        const html =
        await respuesta.text();

        const elemento =
        document.getElementById(id);

        if(elemento){

            elemento.innerHTML =
            html;

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
// Cargar Sidebar y Header
// ==========================================

await cargarComponente(
    "sidebar",
    rutaComponentes + "sidebar.html"
);

await cargarComponente(
    "header",
    rutaComponentes + "header.html"
);



// ==========================================
// Marcar menú activo automáticamente
// ==========================================

const enlaces =
document.querySelectorAll(
".sidebar-menu a"
);

enlaces.forEach((link)=>{

    link.classList.remove("active");

    const href =
    link.getAttribute("href");

    if(!href)
    return;

    if(
        rutaActual.endsWith(href)
    ){

        link.classList.add("active");

    }

});



// ==========================================
// Información administrador
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
        admin.nombre || "";

    }

    if(rol){

        rol.textContent =
        admin.rol || "";

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
            "/admin/login.html";

        }

        catch(error){

            console.error(
            "Error cerrando sesión:",
            error
            );

        }

    }

});
