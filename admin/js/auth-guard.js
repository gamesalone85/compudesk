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

// Evita ejecutar la validación dos veces
let validando = false;

onAuthStateChanged(auth, async (user) => {

    if (validando) return;
    validando = true;

    try {

        // No existe sesión
        if (!user) {
            redirigirLogin();
            return;
        }

        // Buscar administrador
        const adminRef = doc(db, COLLECTIONS.admins, user.uid);
        const adminSnap = await getDoc(adminRef);

        // No existe documento
        if (!adminSnap.exists()) {

            await signOut(auth);

            redirigirLogin();

            return;
        }

        const admin = adminSnap.data();

        // Cuenta deshabilitada
        if (admin.activo !== true) {

            await signOut(auth);

            redirigirLogin();

            return;
        }

        // Guardamos la información del administrador
        // para reutilizarla en dashboard y layout.
        window.compudeskAdmin = {
            uid: user.uid,
            ...admin
        };

        // Avisamos al resto del sistema
        document.dispatchEvent(
            new CustomEvent("compudesk-auth-ready")
        );

    } catch (error) {

        console.error("Auth Guard:", error);

        await signOut(auth);

        redirigirLogin();

    }

});

function redirigirLogin() {

    if (!window.location.pathname.endsWith("/login.html")) {

        redirect(ROUTES.login);

    }

}
