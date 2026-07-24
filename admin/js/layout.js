// ==========================================
// COMPU DESK
// LAYOUT
// Producción v1.0
// ==========================================

import { auth } from "../../assets/firebase/firebase-config.js";

import { signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { ROUTES } from "./config.js";

// ==========================================
// INICIO
// ==========================================

document.addEventListener(

    "compudesk-auth-ready",

    async () => {

        await cargarSidebar();

        await cargarHeader();

        activarMenu();

        configurarLogout();

        cargarDatosAdministrador();

    }

);

// ==========================================
// CARGAR HEADER
// ==========================================

async function cargarHeader() {

    const contenedor = document.getElementById("header-container");

    if (!contenedor) return;

    const respuesta = await fetch("components/header.html");

    contenedor.innerHTML = await respuesta.text();

}

// ==========================================
// CARGAR SIDEBAR
// ==========================================

async function cargarSidebar() {

    const contenedor = document.getElementById("sidebar-container");

    if (!contenedor) return;

    const respuesta = await fetch("components/sidebar.html");

    contenedor.innerHTML = await respuesta.text();

}

// ==========================================
// DATOS DEL ADMIN
// ==========================================

function cargarDatosAdministrador() {

    if (!window.compudeskAdmin) return;

    const nombre = document.getElementById("adminNombre");

    const correo = document.getElementById("adminCorreo");

    const rol = document.getElementById("adminRol");

    if (nombre)
        nombre.textContent = window.compudeskAdmin.nombre;

    if (correo)
        correo.textContent = window.compudeskAdmin.correo;

    if (rol)
        rol.textContent = window.compudeskAdmin.rol;

}

// ==========================================
// MENU ACTIVO
// ==========================================

function activarMenu() {

    const pagina = window.location.pathname;

    document
        .querySelectorAll("[data-route]")
        .forEach(item => {

            if (pagina.endsWith(item.dataset.route)) {

                item.classList.add("active");

            }

        });

}

// ==========================================
// LOGOUT
// ==========================================

function configurarLogout() {

    const boton = document.getElementById("btnLogout");

    if (!boton) return;

    boton.addEventListener("click", async () => {

        if (!confirm("¿Deseas cerrar sesión?"))
            return;

        await signOut(auth);

        window.location.replace(ROUTES.login);

    });

}
