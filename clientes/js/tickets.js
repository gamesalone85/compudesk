// ==========================================
// COMPU DESK
// PORTAL CLIENTE
// TICKETS v2.0
// ==========================================

import { db, auth } from "../../assets/firebase/firebase-config.js";

import {
    collection,
    query,
    where,
    getDocs,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const lista = document.getElementById("ticketsLista");

const kpiTotal = document.getElementById("kpiTotal");
const kpiAbiertos = document.getElementById("kpiAbiertos");
const kpiProceso = document.getElementById("kpiProceso");
const kpiCerrados = document.getElementById("kpiCerrados");

const buscador = document.getElementById("buscarTicket");
const filtroEstado = document.getElementById("filtroEstado");

let tickets = [];


//========================================
// BADGES
//========================================

function badgeEstado(estado){

    switch((estado || "").toLowerCase()){

        case "abierto":

            return `<span class="ticket-status abierto">
                <i class="fa-solid fa-folder-open"></i>
                Abierto
            </span>`;

        case "proceso":
        case "en proceso":

            return `<span class="ticket-status proceso">
                <i class="fa-solid fa-spinner"></i>
                En proceso
            </span>`;

        case "cerrado":

            return `<span class="ticket-status cerrado">
                <i class="fa-solid fa-circle-check"></i>
                Cerrado
            </span>`;

        default:

            return `<span class="ticket-status">${estado}</span>`;
    }

}

function badgePrioridad(prioridad){

    const p=(prioridad||"").toLowerCase();

    return `
        <span class="ticket-priority ${p}">
            ${prioridad || "-"}
        </span>
    `;

}


//========================================
// RENDER
//========================================

function render(listaTickets){

    kpiTotal.textContent=listaTickets.length;

    kpiAbiertos.textContent=
        listaTickets.filter(t=>
            (t.estado||"").toLowerCase()=="abierto").length;

    kpiProceso.textContent=
        listaTickets.filter(t=>
            (t.estado||"").toLowerCase().includes("proceso")).length;

    kpiCerrados.textContent=
        listaTickets.filter(t=>
            (t.estado||"").toLowerCase()=="cerrado").length;



    if(listaTickets.length===0){

        lista.innerHTML=`

            <div class="ticket-loading">

                <i class="fa-solid fa-inbox"></i>

                <h3>No hay tickets para mostrar.</h3>

            </div>

        `;

        return;

    }



    lista.innerHTML="";



    listaTickets.forEach(ticket=>{

        lista.innerHTML+=`

        <article class="ticket-card">

            <div class="ticket-top">

                <div>

                    <div class="ticket-folio">

                        ${ticket.folio || "Sin folio"}

                    </div>

                    <div class="ticket-title">

                        ${ticket.titulo}

                    </div>

                </div>

                ${badgeEstado(ticket.estado)}

            </div>

            <div class="ticket-info">

                <div>

                    <label>Categoría</label>

                    <strong>${ticket.categoria}</strong>

                </div>

                <div>

                    <label>Prioridad</label>

                    ${badgePrioridad(ticket.prioridad)}

                </div>

                <div>

                    <label>Fecha</label>

                    <strong>${formatearFecha(ticket.fechaCreacion)}</strong>
                    
                </div>

            </div>

            <div class="ticket-footer">

                <a
                    class="ticket-open"
                    href="detalle.html?id=${ticket.id}">

                    Ver detalle

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </div>

        </article>

        `;

    });

}



//========================================
// FILTROS
//========================================

function aplicarFiltros(){

    const texto=buscador.value.toLowerCase();

    const estado=filtroEstado.value.toLowerCase();

    const resultado=tickets.filter(ticket=>{

        const coincideTexto=

            (ticket.titulo||"").toLowerCase().includes(texto)

            ||

            (ticket.folio||"").toLowerCase().includes(texto);



        const coincideEstado=

            estado=="" ||

            (ticket.estado||"").toLowerCase()==estado;



        return coincideTexto && coincideEstado;

    });

    render(resultado);

}



buscador.addEventListener("input",aplicarFiltros);

filtroEstado.addEventListener("change",aplicarFiltros);


//========================================
// CARGAR
//========================================

async function cargarTickets(){

    const usuario=JSON.parse(

        localStorage.getItem("clienteCompudesk")

    );

    const q=query(

        collection(db,"tickets"),

        where("usuarioId","==",usuario.uid),

        orderBy("fechaCreacion","desc")

    );

    const snapshot=await getDocs(q);

    tickets=[];

    snapshot.forEach(doc=>{

        tickets.push({

            id:doc.id,

            ...doc.data()

        });

    });

    render(tickets);

}

cargarTickets();


//========================================
//FECHA
//========================================
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
