// ==========================================
// COMPU DESK ADMIN
// Nuevo Cliente
// Firestore
// ==========================================


import { db } from "../../assets/firebase/firebase-config.js";


import {

    collection,
    addDoc,
    serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const formulario =
document.getElementById("clienteForm");


const mensaje =
document.getElementById("mensaje");





// Datos administrador actual

const admin =
JSON.parse(
localStorage.getItem("compudeskAdmin")
);







formulario.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();




    try{



        mensaje.textContent =
        "Guardando cliente...";




        const cliente = {


            empresa:
            document
            .getElementById("empresa")
            .value
            .trim(),



            contacto:
            document
            .getElementById("contacto")
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




            tipo:
            document
            .getElementById("tipo")
            .value,



            plan:
            document
            .getElementById("plan")
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
                "clientes"
            ),

            cliente

        );






        mensaje.textContent =
        "Cliente registrado correctamente.";

        mensaje.style.color =
        "green";






        setTimeout(()=>{


            window.location.href =
            "index.html";


        },1500);






    }catch(error){



        console.error(
            "Error guardando cliente:",
            error
        );



        mensaje.textContent =
        "Error al guardar cliente.";

        mensaje.style.color =
        "red";



    }



});
