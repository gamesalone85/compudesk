// ==========================================
// COMPU DESK
// CLIENTE AUTH GUARD
// Producción v3.0
// ==========================================

import { auth } from "../../assets/firebase/firebase-config.js";

import {

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if (!user) {

        localStorage.removeItem("clienteCompudesk");

        window.location.replace("login.html");

        return;

    }

    const sesion = localStorage.getItem("clienteCompudesk");

    if (!sesion) {

        window.location.replace("login.html");

    }

});
