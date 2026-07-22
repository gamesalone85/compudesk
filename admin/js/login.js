// =========================================
// COMPU DESK ADMIN
// Login Administrador
// Firebase Authentication + Firestore
// =========================================


import { auth, db } from "../../assets/firebase/firebase-config.js";


import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



// Elementos HTML

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const rememberSession = document.getElementById("rememberSession");

const togglePassword = document.getElementById("togglePassword");

const passwordIcon = togglePassword.querySelector("i");

const btnLogin = document.getElementById("btnLogin");

const btnText = document.getElementById("btnText");

const loadingSpinner = document.getElementById("loadingSpinner");

const loginMessage = document.getElementById("loginMessage");




// Mostrar / ocultar contraseña

togglePassword.addEventListener("click",()=>{


    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        passwordIcon.classList.remove("fa-eye");

        passwordIcon.classList.add("fa-eye-slash");


    }else{


        passwordInput.type = "password";

        passwordIcon.classList.remove("fa-eye-slash");

        passwordIcon.classList.add("fa-eye");

    }


});




// Mensajes

function mostrarMensaje(texto,tipo="error"){


    loginMessage.textContent = texto;

    loginMessage.className = `login-message ${tipo}`;


}



// Estado carga

function loading(estado){


    if(estado){


        btnLogin.disabled = true;

        btnText.textContent = "Validando...";

        loadingSpinner.classList.remove("hidden");


    }else{


        btnLogin.disabled = false;

        btnText.textContent = "Iniciar sesión";

        loadingSpinner.classList.add("hidden");


    }


}




// Login

loginForm.addEventListener("submit", async(e)=>{


    e.preventDefault();



    const email = emailInput.value.trim();

    const password = passwordInput.value;



    if(!email || !password){


        mostrarMensaje(
            "Completa todos los campos."
        );

        return;

    }



    try{


        loading(true);

        mostrarMensaje("");



        // Mantener sesión

        await setPersistence(

            auth,

            rememberSession.checked

            ? browserLocalPersistence

            : browserSessionPersistence

        );



        // Autenticación Firebase

        const credencial = await signInWithEmailAndPassword(

            auth,

            email,

            password

        );



        const uid = credencial.user.uid;



        // Buscar administrador en Firestore

        const adminRef = doc(

            db,

            "admins",

            uid

        );


        const adminSnap = await getDoc(adminRef);



        if(!adminSnap.exists()){


            await auth.signOut();


            throw new Error(
                "No tienes permisos de administrador."
            );


        }



        const adminData = adminSnap.data();



        if(adminData.activo !== true){


            await auth.signOut();


            throw new Error(
                "Esta cuenta está deshabilitada."
            );


        }



        if(adminData.rol !== "superadmin"
            && adminData.rol !== "administrador"){


            await auth.signOut();


            throw new Error(
                "Rol sin permisos administrativos."
            );


        }



        // Guardar datos básicos

        localStorage.setItem(

            "compudeskAdmin",

            JSON.stringify({

                uid: uid,

                nombre: adminData.nombre,

                correo: adminData.correo,

                rol: adminData.rol

            })

        );



        mostrarMensaje(

            "Acceso correcto. Entrando...",

            "success"

        );



        setTimeout(()=>{


            window.location.href = "dashboard.html";


        },1000);



    }catch(error){



        console.error(error);



        mostrarMensaje(

            error.message ||
            "Error al iniciar sesión."

        );



    }finally{


        loading(false);


    }



});
