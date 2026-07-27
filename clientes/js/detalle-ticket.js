// ==========================================
// COMPU DESK
// DETALLE TICKET CLIENTE
// Versión 1.0
// ==========================================

import { db } from "../../assets/firebase/firebase-config.js";

import {
    doc,
    getDoc,
    collection,
    query,
    orderBy,
    getDocs,
    addDoc,
    updateDoc,
    increment,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ==========================================
// ELEMENTOS
// ==========================================

const ticketInfo =
document.getElementById("ticketInfo");

const conversacion =
document.getElementById("conversacion");

const respuestaForm =
document.getElementById("respuestaForm");

const txtRespuesta =
document.getElementById("respuesta");


// ==========================================
// VARIABLES
// ==========================================

const params =
new URLSearchParams(window.location.search);

const ticketId =
params.get("id");

let ticketActual=null;


// ==========================================
// FECHA
// ==========================================

function formatearFecha(fecha){

    if(!fecha) return "-";

    if(typeof fecha.toDate==="function"){

        fecha=fecha.toDate();

    }

    return fecha.toLocaleString("es-MX",{

        day:"2-digit",
        month:"short",
        year:"numeric",
        hour:"2-digit",
        minute:"2-digit"

    });

}


// ==========================================
// BADGE ESTADO
// ==========================================

function badgeEstado(estado){

    switch((estado||"").toLowerCase()){

        case "abierto":

            return `<span class="ticket-status abierto">
                        Abierto
                    </span>`;

        case "proceso":

            return `<span class="ticket-status proceso">
                        En proceso
                    </span>`;

        case "cerrado":

            return `<span class="ticket-status cerrado">
                        Cerrado
                    </span>`;

        default:

            return `<span class="ticket-status">
                        ${estado}
                    </span>`;

    }

}
// ==========================================
// CARGAR INFORMACIÓN DEL TICKET
// ==========================================

async function cargarTicket(){

    if(!ticketId){

        ticketInfo.innerHTML=`

            <div class="ticket-error">

                <h3>Ticket no válido.</h3>

            </div>

        `;

        return;

    }

    try{

        const ticketRef=doc(

            db,
            "tickets",
            ticketId

        );

        const ticketSnap=await getDoc(ticketRef);

        if(!ticketSnap.exists()){

            ticketInfo.innerHTML=`

                <div class="ticket-error">

                    <h3>El ticket no existe.</h3>

                </div>

            `;

            return;

        }

        ticketActual=ticketSnap.data();

        renderTicket();

        cargarConversacion();

    }

    catch(error){

        console.error(error);

        ticketInfo.innerHTML=`

            <div class="ticket-error">

                <h3>Error cargando ticket.</h3>

            </div>

        `;

    }

}



// ==========================================
// RENDER TICKET
// ==========================================

function renderTicket(){

    ticketInfo.innerHTML=`

<div class="ticket-detail-card">

    <div class="ticket-detail-header">

        <div>

            <div class="ticket-detail-folio">

                ${ticketActual.folio}

            </div>

            <h2>

                ${ticketActual.titulo}

            </h2>

        </div>

        ${badgeEstado(ticketActual.estado)}

    </div>

    <div class="ticket-detail-grid">

        <div>

            <label>Empresa</label>

            <strong>

                ${ticketActual.empresa}

            </strong>

        </div>

        <div>

            <label>Solicitante</label>

            <strong>

                ${ticketActual.nombreUsuario}

            </strong>

        </div>

        <div>

            <label>Categoría</label>

            <strong>

                ${ticketActual.categoria}

            </strong>

        </div>

        <div>

            <label>Prioridad</label>

            <strong>

                ${ticketActual.prioridad}

            </strong>

        </div>

        <div>

            <label>Técnico</label>

            <strong>

                ${ticketActual.tecnicoNombre || "Sin asignar"}

            </strong>

        </div>

        <div>

            <label>Creado</label>

            <strong>

                ${formatearFecha(ticketActual.fechaCreacion)}

            </strong>

        </div>

    </div>

</div>

`;

}
