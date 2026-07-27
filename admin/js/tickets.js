// ==========================================
// COMPU DESK
// ADMIN TICKETS
// Producción v2.0
// ==========================================


import {

    db

}

from "../../assets/firebase/firebase-config.js";



import {

    collection,
    getDocs,
    query,
    orderBy

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





// ==========================================
// ELEMENTOS
// ==========================================


const tabla = document.getElementById(
    "tablaTickets"
);



const abiertos = document.getElementById(
    "ticketsAbiertos"
);


const proceso = document.getElementById(
    "ticketsProceso"
);


const pendientes = document.getElementById(
    "ticketsPendientes"
);


const cerrados = document.getElementById(
    "ticketsCerrados"
);





// ==========================================
// CARGAR TICKETS
// ==========================================


async function cargarTickets(){


    try{


        const consulta = query(

            collection(
                db,
                "tickets"
            ),

            orderBy(
                "fechaCreacion",
                "desc"
            )

        );




        const snapshot = await getDocs(
            consulta
        );





        let contador = {


            abierto:0,

            en_proceso:0,

            pendiente_cliente:0,

            cerrado:0


        };






        if(snapshot.empty){


            tabla.innerHTML = `


                <div class="empty-state">


                    <i class="fa-solid fa-ticket"></i>


                    <p>
                    No existen tickets registrados.
                    </p>


                </div>


            `;


            actualizarKPIs(contador);


            return;


        }









        let html = `



        <table class="tickets-table">



            <thead>


                <tr>


                    <th>
                    Ticket
                    </th>


                    <th>
                    Empresa
                    </th>


                    <th>
                    Usuario
                    </th>


                    <th>
                    Prioridad
                    </th>


                    <th>
                    Estado
                    </th>


                    <th>
                    Fecha
                    </th>


                    <th>
                    Acción
                    </th>


                </tr>



            </thead>



            <tbody>



        `;







        snapshot.forEach(ticketDoc=>{


            const ticket = ticketDoc.data();





            const estado =

            ticket.estado || "abierto";




            if(
                contador[estado] !== undefined
            ){

                contador[estado]++;

            }







            html += `


            <tr>



                <td>


                    <div class="ticket-title">


                        <strong>
                        ${ticket.titulo || "Sin título"}
                        </strong>


                        <small>
                        ID:
                        ${ticketDoc.id.substring(0,8)}
                        </small>


                    </div>



                </td>





                <td>

                ${ticket.empresa || "--"}

                </td>





                <td>

                ${ticket.nombreUsuario || "--"}

                </td>






                <td>

                    ${crearPrioridad(
                        ticket.prioridad
                    )}

                </td>






                <td>


                    ${crearEstado(
                        estado
                    )}


                </td>







                <td>


                    ${formatearFecha(
                        ticket.fechaCreacion
                    )}



                </td>







                <td>



                    <a

                    href="editar.html?id=${ticketDoc.id}"

                    class="btn-action"

                    title="Ver ticket"


                    >


                        <i class="fa-solid fa-eye"></i>


                    </a>




                </td>







            </tr>



            `;




        });








        html += `


            </tbody>


        </table>


        `;







        tabla.innerHTML = html;



        actualizarKPIs(
            contador
        );





    }

    catch(error){



        console.error(

            "Error tickets:",

            error

        );




        tabla.innerHTML = `


        <div class="empty-state">


            <i class="fa-solid fa-triangle-exclamation"></i>


            <p>
            Error cargando tickets.
            </p>


        </div>


        `;



    }



}








// ==========================================
// ESTADOS
// ==========================================


function crearEstado(
    estado
){


    const estados = {


        abierto:{

            texto:"Abierto",

            clase:"estado-abierto",

            icon:"fa-envelope-open"

        },


        en_proceso:{


            texto:"En proceso",

            clase:"estado-proceso",

            icon:"fa-spinner"


        },


        pendiente_cliente:{


            texto:"Pendiente",

            clase:"estado-pendiente",

            icon:"fa-clock"


        },


        cerrado:{


            texto:"Cerrado",

            clase:"estado-cerrado",

            icon:"fa-circle-check"


        }



    };




    const item =

    estados[estado] || estados.abierto;





    return `


    <span class="ticket-status ${item.clase}">


        <i class="fa-solid ${item.icon}"></i>


        ${item.texto}


    </span>



    `;



}









// ==========================================
// PRIORIDAD
// ==========================================


function crearPrioridad(
    prioridad
){


    const valor =

    (prioridad || "media")
    .toLowerCase();




    return `


    <span class="priority ${valor}">


        ${prioridad || "Media"}


    </span>


    `;



}









// ==========================================
// FECHAS
// ==========================================


function formatearFecha(
    fecha
){


    if(!fecha)

        return "--";




    try{


        return fecha
        .toDate()
        .toLocaleDateString(
            "es-MX"
        );

    }

    catch{


        return "--";

    }



}









// ==========================================
// KPIs
// ==========================================


function actualizarKPIs(
    contador
){



    if(abiertos)

        abiertos.textContent =
        contador.abierto;



    if(proceso)

        proceso.textContent =
        contador.en_proceso;



    if(pendientes)

        pendientes.textContent =
        contador.pendiente_cliente;



    if(cerrados)

        cerrados.textContent =
        contador.cerrado;



}









// ==========================================
// INICIO
// ==========================================


cargarTickets();
