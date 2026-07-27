// ==========================================
// COMPU DESK
// NUEVO TICKET CLIENTE
// Versión 3.0
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
    setDoc,
    writeBatch,
    runTransaction,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


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
// VALIDACIONES
// ==========================================

function validarFormulario() {

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

    if (
        !categoria ||
        !prioridad ||
        !titulo ||
        !descripcion
    ) {

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

async function obtenerUsuario(uid) {

    const usuarioQuery = query(
        collection(db, "usuarios"),
        where("uid", "==", uid)
    );

    const usuarioSnap =
        await getDocs(usuarioQuery);

    if (usuarioSnap.empty) {

        throw new Error(
            "No existe perfil de usuario."
        );

    }

    return {
        id: usuarioSnap.docs[0].id,
        ...usuarioSnap.docs[0].data()
    };

}


// ==========================================
// OBTENER EMPRESA
// ==========================================

async function obtenerCliente(clienteId) {

    const clienteRef =
        doc(
            db,
            "clientes",
            clienteId
        );

    const clienteSnap =
        await getDoc(clienteRef);

    if (!clienteSnap.exists()) {

        throw new Error(
            "No existe empresa registrada."
        );

    }

    return clienteSnap.data();

}


// ==========================================
// GENERAR FOLIO
// ==========================================

async function generarFolio() {

    const configRef =
        doc(
            db,
            "configuracion",
            "tickets"
        );

    return await runTransaction(
        db,
        async (transaction) => {

            const configSnap =
                await transaction.get(
                    configRef
                );

            let consecutivo = 1;

            if (configSnap.exists()) {

                consecutivo =
                    (
                        configSnap.data()
                        .ultimoConsecutivo || 0
                    ) + 1;

            }

            transaction.set(
                configRef,
                {
                    ultimoConsecutivo:
                        consecutivo
                },
                {
                    merge: true
                }
            );

            const anio =
                new Date()
                .getFullYear();

            const folio =
                `CD-TK-${anio}-${String(consecutivo).padStart(6, "0")}`;

            return folio;

        }
    );

}


// ==========================================
// CREAR ESTRUCTURA TICKET
// ==========================================

function construirTicket(
    folio,
    usuario,
    cliente,
    datos
) {

    return {

        // Identificación

        folio,

        // Cliente

        clienteId:
            usuario.clienteId,

        empresa:
            cliente.empresa || "",

        // Usuario

        usuarioId:
            usuario.uid || "",

        nombreUsuario:
            usuario.nombre || "",

        correoUsuario:
            usuario.correo || "",

        // Ticket

        categoria:
            datos.categoria,

        prioridad:
            datos.prioridad,

        titulo:
            datos.titulo,

        descripcion:
            datos.descripcion,

        // Estado

        estado:
            "abierto",

        // Técnico

        tecnicoId:
            "",

       tecnicoNombre: "Sin asignar",

                // Estadísticas

        totalComentarios: 0,

        totalAdjuntos: 0,

        // Auditoría

        ultimaRespuesta: "cliente",

        ultimaActividad: serverTimestamp(),

        // Fechas

        fechaCreacion: serverTimestamp(),

        fechaActualizacion: serverTimestamp(),

        fechaAsignacion: null,

        fechaResolucion: null,

        fechaCierre: null

    };

}


// ==========================================
// GUARDAR TICKET + PRIMER MENSAJE
// ==========================================

async function guardarTicket(ticket){

    const batch = writeBatch(db);

    // Documento principal del ticket

    const ticketRef = doc(

        db,
        "tickets",
        ticket.folio

    );

    batch.set(

        ticketRef,

        ticket

    );

    // Primer mensaje del historial

    const mensajeRef = doc(

        collection(
            ticketRef,
            "mensajes"
        )

    );

    batch.set(

        mensajeRef,

        {

            autor: "cliente",

            usuarioId: ticket.usuarioId,

            nombre: ticket.nombreUsuario,

            mensaje: ticket.descripcion,

            fecha: serverTimestamp(),

            tipo: "mensaje"

        }

    );

    await batch.commit();

}

// ==========================================
// CREAR TICKET
// ==========================================

async function crearTicket() {

    const user = auth.currentUser;

    if (!user) {

        window.location.href = "../login.html";
        return;

    }

    // Validar formulario

    const datos =
        validarFormulario();

    // Obtener usuario

    const usuario =
        await obtenerUsuario(user.uid);

    if (!usuario.clienteId) {

        throw new Error(
            "El usuario no tiene una empresa asociada."
        );

    }

    // Obtener empresa

    const cliente =
        await obtenerCliente(
            usuario.clienteId
        );

    // Generar folio

    const folio =
        await generarFolio();

    // Construir objeto

    const ticket =
        construirTicket(
            folio,
            usuario,
            cliente,
            datos
        );

    // Guardar

    await guardarTicket(ticket);

    return folio;

}


// ==========================================
// EVENTO FORMULARIO
// ==========================================

form?.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        try {

            const boton =
                form.querySelector(
                    "button[type='submit']"
                );

            boton.disabled = true;

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

            setTimeout(() => {

                window.location.href =
                    "index.html";

            }, 1800);

        }

        catch (error) {

            console.error(error);

            mostrarMensaje(
                error.message ||
                "No fue posible crear el ticket.",
                "error"
            );

        }

        finally {

            const boton =
                form.querySelector(
                    "button[type='submit']"
                );

            boton.disabled = false;

            boton.innerHTML =
                `<i class="fa-solid fa-paper-plane"></i>
                 Enviar solicitud`;

        }

    }

);


// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "%cCOMPU DESK",
            "color:#0057ff;font-size:18px;font-weight:bold;"
        );

        console.log(
            "Nuevo Ticket v3.0 cargado."
        );

    }

);
