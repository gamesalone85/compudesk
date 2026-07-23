// ==========================================
// COMPU DESK ADMIN
// Nuevo Usuario
// Firebase Firestore
// ==========================================


import { db } from "../../assets/firebase/firebase-config.js";


import {

    collection,
    addDoc,
    serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




// ==========================================
// ELEMENTOS
// ==========================================


const formulario =
document.getElementById(
    "usuarioForm"
);


const mensaje =
document.getElementById(
    "mensaje"
);




// ==========================================
// ADMIN ACTUAL
// ==========================================


const admin =
JSON.parse(
    localStorage.getItem(
        "compudeskAdmin"
    )
);





// ==========================================
// GUARDAR USUARIO
// ==========================================


formulario.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();



    try{


        mensaje.textContent =
        "Guardando usuario...";



        const usuario = {


            nombre:
            document
            .getElementById("nombre")
            .value
            .trim(),



            correo:
            document
            .getElementById("correo")
            .value
            .trim(),



            telefono:
            document
            .getElementById("telefono")
            .value
            .trim(),



            empresa:
            document
            .getElementById("empresa")
            .value
            .trim(),



            rol:
            document
            .getElementById("rol")
            .value,



            estado:
            document
            .getElementById("estado")
            .value,



            fechaAlta:
            serverTimestamp(),



            creadoPor:

            admin
            ?
            admin.nombre
            :
            "Administrador"


        };





        await addDoc(

            collection(
                db,
                "usuarios"
            ),

            usuario

        );





        mensaje.textContent =
        "Usuario registrado correctamente.";


        mensaje.style.color =
        "green";





        formulario.reset();





        setTimeout(()=>{


            window.location.href =
            "index.html";


        },1500);





    }
    catch(error){


        console.error(
            "Error guardando usuario:",
            error
        );



        mensaje.textContent =
        "Error al guardar usuario.";



        mensaje.style.color =
        "red";


    }



});
