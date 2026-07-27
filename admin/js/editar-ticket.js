// ==========================================
// COMPU DESK
// ADMIN EDITAR TICKET
// Producción v1.0
// ==========================================


import {

    db

}

from "../../assets/firebase/firebase-config.js";



import {

    doc,
    getDoc,
    updateDoc,
    serverTimestamp

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





// ==========================================
// OBTENER ID TICKET
// ==========================================


const parametros =

new URLSearchParams(
    window.location.search
);



const ticketId =

parametros.get(
    "id"
);






// ==========================================
// ELEMENTOS
// ==========================================


const titulo =
document.getElementById(
    "ticketTitulo"
);



const empresa =
document.getElementById(
    "ticketEmpresa"
);



const usuario =
document.getElementById(
    "ticketUsuario"
);



const prioridad =
document.getElementById(
    "ticketPrioridad"
);



const estado =
document.getElementById(
    "ticketEstado"
);



const descripcion =
document.getElementById(
    "ticketDescripcion"
);



const nuevoEstado =
document.getElementById(
    "nuevoEstado"
);



const btnGuardar =
document.getElementById(
    "btnGuardarEstado"
);



const mensaje =
document.getElementById(
    "mensajeTicket"
);







// ==========================================
// CARGAR TICKET
// ==========================================


async function cargarTicket(){


    if(!ticketId){


        mostrarMensaje(
            "Ticket no encontrado",
            "error"
        );


        return;

    }




    try{


        const referencia =

        doc(
            db,
            "tickets",
            ticketId
        );



        const snapshot =

        await getDoc(
            referencia
        );





        if(!snapshot.exists()){


            mostrarMensaje(
                "El ticket no existe",
                "error"
            );


            return;

        }





        const ticket =

        snapshot.data();






        titulo.textContent =

        ticket.titulo ||
        "Ticket sin título";





        empresa.textContent =

        ticket.empresa ||
        "--";





        usuario.textContent =

        ticket.nombreUsuario ||
        "--";





        prioridad.textContent =

        ticket.prioridad ||
        "Media";





        estado.textContent =

        ticket.estado ||
        "abierto";





        descripcion.textContent =

        ticket.descripcion ||
        "Sin descripción";







        if(nuevoEstado){


            nuevoEstado.value =

            ticket.estado ||
            "abierto";


        }






    }


    catch(error){


        console.error(
            "Error cargando ticket:",
            error
        );



        mostrarMensaje(
            "Error cargando ticket",
            "error"
        );


    }



}








// ==========================================
// ACTUALIZAR ESTADO
// ==========================================


async function actualizarEstado(){



    const estadoNuevo =

    nuevoEstado.value;





    try{


        const referencia =

        doc(
            db,
            "tickets",
            ticketId
        );





        await updateDoc(

            referencia,

            {

                estado:
                estadoNuevo,


                ultimaActualizacion:
                serverTimestamp()


            }

        );






        estado.textContent =

        estadoNuevo;





        mostrarMensaje(
            "Estado actualizado correctamente",
            "success"
        );



    }


    catch(error){


        console.error(
            "Error actualizando:",
            error
        );



        mostrarMensaje(
            "No se pudo actualizar el ticket",
            "error"
        );


    }



}








// ==========================================
// MENSAJES
// ==========================================


function mostrarMensaje(
    texto,
    tipo
){



    if(!mensaje)

        return;




    mensaje.innerHTML =


    `

    <div class="alert ${tipo}">

        ${texto}

    </div>

    `;



}









// ==========================================
// EVENTOS
// ==========================================


if(btnGuardar){


    btnGuardar.addEventListener(

        "click",

        actualizarEstado

    );


}








// ==========================================
// INICIO
// ==========================================


cargarTicket();
