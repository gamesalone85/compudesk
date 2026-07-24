// ==========================================
// COMPU DESK
// DASHBOARD ADMIN
// Producción v1.0
// ==========================================


import {

    getCollection

} from "../../assets/firebase/services/firestore.service.js";


import {

    COLLECTIONS,
    TICKET_STATUS

} from "./config.js";


// ==========================================
// ESPERAR AUTENTICACIÓN
// ==========================================


document.addEventListener(

    "compudesk-auth-ready",

    async () => {

        await loadDashboard();

    }

);



// ==========================================
// CARGAR DASHBOARD
// ==========================================


async function loadDashboard(){

    try{


        const [

            clientes,

            usuarios,

            tickets

        ] = await Promise.all([


            getCollection(

                COLLECTIONS.CLIENTES

            ),


            getCollection(

                COLLECTIONS.USUARIOS

            ),


            getCollection(

                COLLECTIONS.TICKETS

            )


        ]);



        updateKPIs(

            clientes,

            usuarios,

            tickets

        );



        renderActivity(

            tickets

        );


    }


    catch(error){


        console.error(

            "Error cargando dashboard:",

            error

        );


        showDashboardError();


    }


}





// ==========================================
// ACTUALIZAR KPI
// ==========================================


function updateKPIs(

    clientes,

    usuarios,

    tickets

){


    const totalClientes =

        document.getElementById(
            "totalClientes"
        );



    const totalUsuarios =

        document.getElementById(
            "totalUsuarios"
        );



    const ticketsAbiertos =

        document.getElementById(
            "ticketsAbiertos"
        );



    const ticketsCerrados =

        document.getElementById(
            "ticketsCerrados"
        );




    if(totalClientes){

        totalClientes.textContent =

            clientes.length;

    }




    if(totalUsuarios){

        totalUsuarios.textContent =

            usuarios.length;

    }





    if(ticketsAbiertos){

        ticketsAbiertos.textContent =

            tickets.filter(ticket =>

                ticket.estado !==

                TICKET_STATUS.CERRADO

            ).length;

    }





    if(ticketsCerrados){

        ticketsCerrados.textContent =

            tickets.filter(ticket =>

                ticket.estado ===

                TICKET_STATUS.CERRADO

            ).length;

    }


}




// ==========================================
// ACTIVIDAD RECIENTE
// ==========================================


function renderActivity(tickets){


    const container =

        document.getElementById(

            "actividadReciente"

        );



    if(!container)

        return;




    if(

        tickets.length === 0

    ){


        container.innerHTML = `

            <p>

                No existen tickets registrados.

            </p>

        `;


        return;


    }





    const recientes =

        tickets

        .sort(

            (a,b)=>{


                const fechaA =

                    a.fechaCreacion?.seconds || 0;


                const fechaB =

                    b.fechaCreacion?.seconds || 0;



                return fechaB - fechaA;


            }

        )

        .slice(

            0,

            5

        );





    container.innerHTML =

        recientes.map(ticket => `


            <div class="activity-item">


                <strong>

                    ${ticket.titulo || "Ticket"}

                </strong>


                <span>

                    ${ticket.estado || "Nuevo"}

                </span>


            </div>


        `)

        .join("");



}





// ==========================================
// ERROR
// ==========================================


function showDashboardError(){


    const container =

        document.getElementById(

            "actividadReciente"

        );


    if(container){

        container.innerHTML = `


            <p>

                No fue posible cargar la información.

            </p>


        `;

    }


}
