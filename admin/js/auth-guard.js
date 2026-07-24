// ==========================================
// COMPU DESK
// AUTH GUARD
// Producción v1.0
// ==========================================

import { auth, db } from "../../assets/firebase/firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    COLLECTIONS,
    ROUTES,
    USER_STATUS
} from "./config.js";

import {
    setAdmin,
    clearAdmin
} from "./session.js";

// ==========================================
// INICIALIZACIÓN
// ==========================================

let initialized = false;

onAuthStateChanged(auth, async (user) => {

    // Evita múltiples ejecuciones
    if (initialized) return;

    initialized = true;

    try {

        // ----------------------------------
        // No existe sesión
        // ----------------------------------

        if (!user) {

            redirectToLogin();

            return;

        }

        // ----------------------------------
        // Buscar administrador
        // ----------------------------------

        const adminRef = doc(
            db,
            COLLECTIONS.ADMINS,
            user.uid
        );

        const adminSnap = await getDoc(adminRef);

        if (!adminSnap.exists()) {

            console.warn("Administrador no registrado.");

            await logout();

            return;

        }

        const admin = adminSnap.data();

        // ----------------------------------
        // Cuenta deshabilitada
        // ----------------------------------

        if (admin.activo !== USER_STATUS.ACTIVE) {

            console.warn("Administrador inactivo.");

            await logout();

            return;

        }

        // ----------------------------------
        // Guardar sesión
        // ----------------------------------

        setAdmin({

            uid: user.uid,

            ...admin

        });

        // ----------------------------------
        // Notificar al resto del sistema
        // ----------------------------------

        document.dispatchEvent(

            new CustomEvent("compudesk-auth-ready")

        );

    }

    catch (error) {

        console.error(

            "Error Auth Guard:",

            error

        );

        await logout();

    }

});

// ==========================================
// CERRAR SESIÓN
// ==========================================

export async function logout() {

    try {

        clearAdmin();

        await signOut(auth);

    }

    finally {

        redirectToLogin();

    }

}

// ==========================================
// REDIRECCIÓN
// ==========================================

function redirectToLogin() {

    if (

        window.location.pathname !==

        "/admin/login.html"

    ) {

        window.location.replace(

            ROUTES.LOGIN

        );

    }

}
