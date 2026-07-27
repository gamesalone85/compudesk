// ==========================================
// COMPU DESK
// NUEVO TICKET CLIENTE
// Versión 3.1
// Firebase Auth + Firestore
// ==========================================


import {
    auth,
    db
} from "../../assets/firebase/firebase-config.js";


import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    serverTimestamp,
    writeBatch
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



// ==========================================
// ELEMENTOS
// ==========================================

const form = document.getElementById("ticketForm");
const mensaje = document.getElementById("mensaje");



// ==========================================
// MENSAJES
// ==========================================

function mostrarMensaje(texto, tipo = "success") {

    if (!mensaje) return;

    mensaje.textContent = texto;
    mensaje.className = `login-alert ${tipo}`;

}



// ==========================================
// VALIDAR FORMULARIO
// ==========================================

function validarFormulario(){


    const categoria =
        document.getElementById("categoria")
        .value
        .trim();


    const prioridad =
        document.getElementById("prioridad")
        .value
        .trim();


    const titulo =
        document.getElementById("titulo")
        .value
        .trim();


    const descripcion =
        document.getElementById("descripcion")
        .value
        .trim();



    if(
        !categoria ||
        !prioridad ||
        !titulo ||
        !descripcion
    ){

        throw new Error(
            "Completa todos los campos."
        );

    }


    return {
        categoria,
        prioridad,
        titulo,
        descripcion
    };

}




// ==========================================
// OBTENER USUARIO
// ==========================================

async function obtenerUsuario(uid){


    const usuarioQuery = query(
        collection(db,"usuarios"),
        where(
            "uid",
            "==",
            uid
        )
    );


    const usuarioSnap =
        await getDocs(usuarioQuery);



    if(usuarioSnap.empty){

        throw new Error(
            "No existe perfil de usuario."
        );

    }



    return {

        id:
        usuarioSnap.docs[0].id,

        ...usuarioSnap.docs[0].data()

    };


}




// ==========================================
// OBTENER CLIENTE
// ==========================================

async function obtenerCliente(clienteId){


    const clienteRef =
        doc(
            db,
            "clientes",
            clienteId
        );



    const clienteSnap =
        await getDoc(clienteRef);



    if(!clienteSnap.exists()){

        throw new Error(
            "No existe empresa registrada."
        );

    }



    return clienteSnap.data();


}





// ==========================================
// GENERAR FOLIO
// ==========================================

function generarFolio(){


    const fecha =
        new Date();



    const anio =
        fecha.getFullYear();



    const numero =
        Math.floor(
            Math.random()*999999
        )
        .toString()
        .padStart(
            6,
            "0"
        );



    return `CD-TK-${anio}-${numero}`;


}





// ==========================================
// CONSTRUIR TICKET
// ==========================================

function construirTicket(
    folio,
    usuario,
    cliente,
    datos
){


    return {


        folio,


        clienteId:
            usuario.clienteId,


        empresa:
            cliente.empresa || "",



        usuarioId:
            usuario.uid,



        nombreUsuario:
            usuario.nombre || "",



        correoUsuario:
            usuario.correo || "",



        categoria:
            datos.categoria,


        prioridad:
            datos.prioridad,


        titulo:
            datos.titulo,


        descripcion:
            datos.descripcion,



        estado:
            "abierto",



        tecnicoId:
            "",



        tecnicoNombre:
            "Sin asignar",



        totalComentarios:
            0,


        totalAdjuntos:
            0,



        ultimaRespuesta:
            "cliente",



        ultimaActividad:
            serverTimestamp(),



        fechaCreacion:
            serverTimestamp(),



        fechaActualizacion:
            serverTimestamp(),



        fechaAsignacion:
            null,


        fechaResolucion:
            null,


        fechaCierre:
            null


    };


}





// ==========================================
// GUARDAR TICKET COMPLETO
// ==========================================

async function guardarTicketCompleto(ticket){


    const batch =
        writeBatch(db);




    const ticketRef =
        doc(
            db,
            "tickets",
            ticket.folio
        );



    batch.set(
        ticketRef,
        ticket
    );





    // MENSAJE INICIAL

    const mensajeRef =
        doc(
            collection(
                ticketRef,
                "mensajes"
            )
        );



    batch.set(
        mensajeRef,
        {

            autor:
                "cliente",


            uid:
                ticket.usuarioId,


            nombre:
                ticket.nombreUsuario,


            mensaje:
                ticket.descripcion,


            tipo:
                "texto",


            fecha:
                serverTimestamp()

        }
    );






    // HISTORIAL

    const historialRef =
        doc(
            collection(
                ticketRef,
                "historial"
            )
        );



    batch.set(
        historialRef,
        {

            accion:
                "Ticket creado",


            descripcion:
                "El cliente creó el ticket.",


            usuario:
                ticket.nombreUsuario,


            fecha:
                serverTimestamp()

        }
    );






    // ACTIVIDAD

    const actividadRef =
        doc(
            collection(
                ticketRef,
                "actividades"
            )
        );



    batch.set(
        actividadRef,
        {

            icono:
                "ticket",


            titulo:
                "Nuevo ticket",


            detalle:
                ticket.folio,


            fecha:
                serverTimestamp()

        }
    );






    try{


        await batch.commit();



    }
    catch(error){


        console.error(
            "ERROR GUARDANDO TICKET:",
            error
        );


        console.log(
            "TICKET ENVIADO:",
            ticket
        );


        throw error;


    }


}





// ==========================================
// CREAR TICKET
// ==========================================

async function crearTicket(){



    const user =
        auth.currentUser;



    if(!user){

        window.location.href =
            "../login.html";

        return;

    }




    const datos =
        validarFormulario();





    const usuario =
        await obtenerUsuario(
            user.uid
        );





    if(!usuario.clienteId){


        throw new Error(
            "El usuario no tiene empresa asociada."
        );

    }





    const cliente =
        await obtenerCliente(
            usuario.clienteId
        );





    const folio =
        generarFolio();





    const ticket =
        construirTicket(
            folio,
            usuario,
            cliente,
            datos
        );





    await guardarTicketCompleto(ticket);





    return folio;



}







// ==========================================
// EVENTO FORMULARIO
// ==========================================

form?.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();



    const boton =
        form.querySelector(
            "button[type='submit']"
        );



    try{


        boton.disabled=true;



        boton.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i>
        Creando ticket...`;




        const folio =
            await crearTicket();




        mostrarMensaje(
            `Ticket ${folio} creado correctamente.`,
            "success"
        );



        form.reset();



        setTimeout(()=>{


            window.location.href =
                "index.html";


        },1800);



    }
    catch(error){


        console.error(error);



        mostrarMensaje(
            error.message ||
            "No fue posible crear el ticket.",
            "error"
        );


    }
    finally{


        boton.disabled=false;


        boton.innerHTML =
        `<i class="fa-solid fa-paper-plane"></i>
        Enviar solicitud`;


    }


});






// ==========================================
// INICIO
// ==========================================

document.addEventListener(
"DOMContentLoaded",
()=>{


console.log(
"%cCOMPU DESK",
"color:#0057ff;font-size:18px;font-weight:bold;"
);



console.log(
"Nuevo Ticket v3.1 cargado correctamente."
);



});
