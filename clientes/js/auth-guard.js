// ==========================================
// COMPU DESK
// CLIENTE AUTH GUARD
// Producción Final
// ==========================================

import { auth } from "../../assets/firebase/firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    obtenerSesion
} from "./session.js";

onAuthStateChanged(auth,(user)=>{

    if(!user){

        location.replace("login.html");

        return;

    }

    const sesion = obtenerSesion();

    if(!sesion){

        location.replace("login.html");

        return;

    }

    console.log("Cliente autenticado");

});
