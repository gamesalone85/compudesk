// ==========================================
// COMPU DESK
// PORTAL CLIENTE
// TICKETS v3.0
// ==========================================

import { db } from "../../assets/firebase/firebase-config.js";

import {
    collection,
    query,
    where,
    getDocs,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ==========================================
// ELEMENTOS
// ==========================================

const lista = document.getElementById("ticketsLista");

const kpiTotal = document.getElementById("kpiTotal");
const kpiAbiertos = document.getElementById("kpiAbiertos");
const kpiProceso = document.getElementById("kpiProceso");
const kpiCerrados = document.getElementById("kpiCerrados");

const buscador = document.getElementById("buscarTicket");
const filtroEstado = document.getElementById("filtroEstado");
const filtroPrioridad = document.getElementById("filtroPrioridad");


// ==========================================
// VARIABLES
// ==========================================

let tickets = [];
let ticketsFiltrados = [];


// ==========================================
// BADGES ESTADO
// ==========================================

function badgeEstado(estado){

    switch((estado || "").toLowerCase()){

        case "abierto":

            return `
                <span class="badge status-abierto">
                    <i class="fa-solid fa-folder-open"></i>
                    Abierto
                </span>
            `;

        case "asignado":

            return `
                <span class="badge status-proceso">
                    <i class="fa-solid fa-user-check"></i>
                    Asignado
                </span>
            `;

        case "en proceso":
        case "proceso":

            return `
                <span class="badge status-proceso">
                    <i class="fa-solid fa-gears"></i>
                    En proceso
                </span>
            `;

        case "resuelto":

            return `
                <span class="badge status-cerrado">
                    <i class="fa-solid fa-circle-check"></i>
                    Resuelto
                </span>
            `;

        case "cerrado":

            return `
                <span class="badge status-cerrado">
                    <i class="fa-solid fa-lock"></i>
                    Cerrado
                </span>
            `;

        default:

            return `
                <span class="badge">
                    ${estado || "-"}
                </span>
            `;

    }

}


// ==========================================
// BADGES PRIORIDAD
// ==========================================

function badgePrioridad(prioridad){

    const p = (prioridad || "").toLowerCase();

    return `
        <span class="badge priority-${p}">
            ${prioridad || "-"}
        </span>
    `;

}


// ==========================================
// FECHA
// ==========================================

function formatearFecha(fecha){

    if(!fecha) return "-";

    if(typeof fecha.toDate === "function"){

        fecha = fecha.toDate();

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
// KPIs
// ==========================================

function actualizarKPIs(listaTickets){

    kpiTotal.textContent = listaTickets.length;

    kpiAbiertos.textContent =
        listaTickets.filter(t =>
            (t.estado || "").toLowerCase() === "abierto"
        ).length;

    kpiProceso.textContent =
        listaTickets.filter(t => {

            const e = (t.estado || "").toLowerCase();

            return e === "proceso" ||
                   e === "en proceso" ||
                   e === "asignado";

        }).length;

    kpiCerrados.textContent =
        listaTickets.filter(t => {

            const e = (t.estado || "").toLowerCase();

            return e === "cerrado" ||
                   e === "resuelto";

        }).length;

}


// ==========================================
// LOADING
// ==========================================

function mostrarCarga(){

    lista.innerHTML = `

        <div class="ticket-card">

            <div style="text-align:center;padding:50px;">

                <i class="fa-solid fa-spinner fa-spin fa-2x"></i>

                <p style="margin-top:20px;">

                    Cargando tickets...

                </p>

            </div>

        </div>

    `;

}


// ==========================================
// SIN TICKETS
// ==========================================

function mostrarVacio(){

    lista.innerHTML = `

        <div class="ticket-card">

            <div style="text-align:center;padding:50px;">

                <i class="fa-solid fa-inbox fa-3x"></i>

                <h3 style="margin-top:20px;">

                    No existen tickets

                </h3>

                <p>

                    Cuando generes uno aparecerá aquí.

                </p>

            </div>

        </div>

    `;

}
// ==========================================
// RENDER TICKETS
// ==========================================

function renderTickets(listaTickets){

    actualizarKPIs(listaTickets);

    if(listaTickets.length === 0){

        mostrarVacio();
        return;

    }

    let html = "";

    listaTickets.forEach(ticket => {

        html += `

        <article class="ticket-card">

            <div class="ticket-top">

                <div>

                    <div class="ticket-folio">

                        ${ticket.folio || ticket.id}

                    </div>

                    <h3 class="ticket-title">

                        ${ticket.titulo || "-"}

                    </h3>

                </div>

                ${badgeEstado(ticket.estado)}

            </div>

            <div class="ticket-info">

                <div>

                    <label>Categoría</label>

                    <strong>

                        ${ticket.categoria || "-"}

                    </strong>

                </div>

                <div>

                    <label>Prioridad</label>

                    ${badgePrioridad(ticket.prioridad)}

                </div>

                <div>

                    <label>Fecha</label>

                    <strong>

                        ${formatearFecha(ticket.fechaCreacion)}

                    </strong>

                </div>

            </div>

            <div class="ticket-footer">

                <a
                    class="ticket-link"
                    href="detalle.html?id=${encodeURIComponent(ticket.folio || ticket.id)}">

                    Ver detalle

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </div>

        </article>

        `;

    });

    lista.innerHTML = html;

}


// ==========================================
// FILTROS
// ==========================================

function aplicarFiltros(){

    const texto =
        buscador.value
        .trim()
        .toLowerCase();

    const estado =
        filtroEstado.value
        .toLowerCase();

    const prioridad =
        filtroPrioridad.value
        .toLowerCase();

    ticketsFiltrados = tickets.filter(ticket => {

        const coincideTexto =

            (ticket.titulo || "")
            .toLowerCase()
            .includes(texto)

            ||

            (ticket.folio || ticket.id || "")
            .toLowerCase()
            .includes(texto);

        const coincideEstado =

            estado === ""

            ||

            (ticket.estado || "")
            .toLowerCase() === estado;

        const coincidePrioridad =

            prioridad === ""

            ||

            (ticket.prioridad || "")
            .toLowerCase() === prioridad;

        return (
            coincideTexto &&
            coincideEstado &&
            coincidePrioridad
        );

    });

    renderTickets(ticketsFiltrados);

}


// ==========================================
// CARGAR TICKETS
// ==========================================

async function cargarTickets(){

    mostrarCarga();

    try{

        const usuario = JSON.parse(

            localStorage.getItem(
                "clienteCompudesk"
            )

        );

        if(!usuario){

            throw new Error(
                "Sesión inválida."
            );

        }

        const q = query(

            collection(db,"tickets"),

            where(
                "usuarioId",
                "==",
                usuario.uid
            ),

            orderBy(
                "fechaCreacion",
                "desc"
            )

        );

        const snapshot =
            await getDocs(q);

        tickets = [];

        snapshot.forEach(doc => {

            tickets.push({

                id: doc.id,

                ...doc.data()

            });

        });

        ticketsFiltrados = [...tickets];

        renderTickets(ticketsFiltrados);

    }

    catch(error){

        console.error(
            "Error cargando tickets:",
            error
        );

        lista.innerHTML = `

            <div class="ticket-card">

                <div
                    style="
                        text-align:center;
                        padding:50px;
                    ">

                    <i
                        class="
                        fa-solid
                        fa-circle-exclamation
                        fa-3x
                        ">

                    </i>

                    <h3
                        style="
                        margin-top:20px;
                        ">

                        Error al cargar los tickets

                    </h3>

                    <p>

                        ${error.message}

                    </p>

                </div>

            </div>

        `;

    }

}


// ==========================================
// EVENTOS
// ==========================================

buscador.addEventListener(

    "input",

    aplicarFiltros

);

filtroEstado.addEventListener(

    "change",

    aplicarFiltros

);

filtroPrioridad.addEventListener(

    "change",

    aplicarFiltros

);


// ==========================================
// INIT
// ==========================================

async function init(){

    await cargarTickets();

}

document.addEventListener(

    "DOMContentLoaded",

    init

);
