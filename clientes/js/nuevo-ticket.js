// ==========================================
// COMPU DESK
// NUEVO TICKET CLIENTE
// Producción 3.0
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
    addDoc,
    serverTimestamp,
    runTransaction
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ==========================================
// ELEMENTOS
// ==========================================

const form = document.getElementById("ticketForm");
const mensaje = document.getElementById("mensaje");


// ==========================================
// GENERAR FOLIO
// ==========================================

async function generarFolio() {

    const ref = doc(db, "configuracion", "folios");

    return await runTransaction(db, async (transaction) => {

        const snap = await transaction.get(ref);

        let consecutivo = 1;

        if (snap.exists()) {

            consecutivo = (snap.data().ultimoTicket || 0) + 1;

        }

        transaction.set(
            ref,
            {
                ultimoTicket: consecutivo
            },
            { merge: true }
        );

        const anio = new Date().getFullYear();

        return `CD-${anio}-${String(consecutivo).padStart(6, "0")}`;

    });

}


// ==========================================
// CREAR TICKET
// ==========================================

form?.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {

        window.location.href = "../login.html";
        return;

    }

    try {

        // ==========================================
        // BUSCAR USUARIO
        // ==========================================

        const usuarioQuery = query(
            collection(db, "usuarios"),
            where("uid", "==", user.uid)
        );

        const usuarioSnap = await getDocs(usuarioQuery);

        if (usuarioSnap.empty) {

            throw new Error("No existe perfil de usuario.");

        }

        const usuario = usuarioSnap.docs[0].data();

        if (!usuario.clienteId) {

            throw new Error("Usuario sin empresa asociada.");

        }

        // ==========================================
        // BUSCAR EMPRESA
        // ==========================================

        const clienteRef = doc(
            db,
            "clientes",
            usuario.clienteId
        );

        const clienteSnap = await getDoc(clienteRef);

        if (!clienteSnap.exists()) {

            throw new Error("Empresa no encontrada.");

        }

        const cliente = clienteSnap.data();

        // ==========================================
        // CAPTURAR FORMULARIO
        // ==========================================

        const categoria = document
            .getElementById("categoria")
            .value
            .trim();

        const prioridad = document
            .getElementById("prioridad")
            .value
            .trim();

        const titulo = document
            .getElementById("titulo")
            .value
            .trim();

        const descripcion = document
            .getElementById("descripcion")
            .value
            .trim();

        if (
            !categoria ||
            !prioridad ||
            !titulo ||
            !descripcion
        ) {

            mostrar(
                "Completa todos los campos.",
                "error"
            );

            return;

        }

        // ==========================================
        // GENERAR FOLIO
        // ==========================================

        const folio = await generarFolio();

        // ==========================================
        // CREAR TICKET
        // ==========================================

        const ticketRef = await addDoc(
            collection(db, "tickets"),
            {

                // Folio
                folio,

                // Empresa
                clienteId: usuario.clienteId,
                empresa: cliente.empresa || "",

                // Usuario
                usuarioId: user.uid,
                nombreUsuario: usuario.nombre || "",
                correoUsuario: usuario.correo || "",

                // Ticket
                categoria,
                prioridad,
                titulo,
                descripcion,

                // Estado
                estado: "abierto",

                // Fechas
                fechaCreacion: serverTimestamp(),
                fechaActualizacion: serverTimestamp()

            }
        );

        console.log("Ticket creado:", ticketRef.id);

        mostrar(
            `✅ Ticket ${folio} creado correctamente.`,
            "success"
        );

        form.reset();

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1500);

    } catch (error) {

        console.error(error);

        mostrar(
            "No fue posible crear el ticket.",
            "error"
        );

    }

});


// ==========================================
// MENSAJES
// ==========================================

function mostrar(texto, tipo) {

    if (!mensaje) return;

    mensaje.textContent = texto;
    mensaje.className = `login-alert ${tipo}`;

}
