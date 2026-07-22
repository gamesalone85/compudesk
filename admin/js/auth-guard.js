// =========================================
// COMPU DESK ADMIN
// Protección de páginas
// =========================================


import { auth } from "../../assets/firebase/firebase-config.js";


import {
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



const adminData =
localStorage.getItem("compudeskAdmin");



onAuthStateChanged(auth,(user)=>{


    if(!user || !adminData){


        window.location.href="login.html";


        return;


    }



});
