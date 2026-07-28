// ==========================================
// COMPU DESK
// ADMIN EDITAR TICKET
// Producción v3.0
// Firebase Auth + Firestore
// ==========================================


import {

    auth,
    db

}

from "../../assets/firebase/firebase-config.js";



import {

    onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";



import {

    doc,
    getDoc,
    updateDoc,
    collection,
    query,
    orderBy,
    getDocs,
    addDoc,
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

parametros.get("id");




if(!ticketId){


    console.error(
        "No existe ID de ticket"
    );


}







// ==========================================
// ELEMENTOS HTML
// ==========================================


const ticketTitulo =
document.getElementById(
    "ticketTitulo"
);



const ticketFolio =
document.getElementById(
    "ticketFolio"
);



const ticketEmpresa =
document.getElementById(
    "ticketEmpresa"
);



const ticketUsuario =
document.getElementById(
    "ticketUsuario"
);



const ticketCategoria =
document.getElementById(
    "ticketCategoria"
);



const ticketPrioridad =
document.getElementById(
    "ticketPrioridad"
);



const ticketEstado =
document.getElementById(
    "ticketEstado"
);



const ticketTecnico =
document.getElementById(
    "ticketTecnico"
);



const ticketFecha =
document.getElementById(
    "ticketFecha"
);



const ticketUltimaActividad =
document.getElementById(
    "ticketUltimaActividad"
);



const ticketDescripcion =
document.getElementById(
    "ticketDescripcion"
);



const ticketEstadoBadge =
document.getElementById(
    "ticketEstadoBadge"
);



const ticketPrioridadBadge =
document.getElementById(
    "ticketPrioridadBadge"
);



const conversacion =
document.getElementById(
    "conversacion"
);



const respuestaForm =
document.getElementById(
    "respuestaForm"
);



const respuesta =
document.getElementById(
    "respuesta"
);



const nuevoEstado =
document.getElementById(
    "nuevoEstado"
);



const btnGuardarEstado =
document.getElementById(
    "btnGuardarEstado"
);



const mensajeTicket =
document.getElementById(
    "mensajeTicket"
);







// ==========================================
// FORMATO FECHA
// ==========================================


function formatoFecha(valor){


    if(!valor)

        return "--";



    if(
        typeof valor.toDate === "function"
    ){

        valor =
        valor.toDate();

    }



    return valor.toLocaleString(
        "es-MX"
    );


}







// ==========================================
// MENSAJE SISTEMA
// ==========================================


function mostrarMensaje(
texto,
tipo="success"
){


    if(!mensajeTicket)

        return;



    mensajeTicket.innerHTML =


    `

    <div class="alert ${tipo}">

        ${texto}

    </div>

    `;



    setTimeout(()=>{

        mensajeTicket.innerHTML="";

    },4000);


}







// ==========================================
// CARGAR TICKET
// ==========================================


async function cargarTicket(){



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





    const ticket = snapshot.data();







    ticketTitulo.textContent =

        ticket.titulo || "Sin título";





    ticketFolio.textContent =

        ticket.folio || ticketId;





    ticketEmpresa.textContent =

        ticket.empresa || "--";





    ticketUsuario.textContent =

        ticket.nombreUsuario || "--";





    ticketCategoria.textContent =

        ticket.categoria || "--";





    ticketPrioridad.textContent =

        ticket.prioridad || "--";





    ticketEstado.textContent =

        ticket.estado || "--";





    ticketDescripcion.textContent =

        ticket.descripcion || "--";





    ticketFecha.textContent =

        formatoFecha(
            ticket.fechaCreacion
        );





    ticketUltimaActividad.textContent =

        formatoFecha(
            ticket.ultimaActividad
        );





    ticketTecnico.textContent =

        ticket.tecnicoNombre ||

        "Sin asignar";







    if(nuevoEstado){


        nuevoEstado.value =

        ticket.estado ||

        "abierto";


    }






    actualizarBadge(
        ticket
    );





    await cargarMensajes();




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
// BADGES
// ==========================================


function actualizarBadge(ticket){



if(ticketEstadoBadge){


ticketEstadoBadge.className =

"badge-ticket " +

(ticket.estado || "abierto");



ticketEstadoBadge.textContent =

ticket.estado || "abierto";


}





if(ticketPrioridadBadge){


ticketPrioridadBadge.className =

"prioridad " +

(ticket.prioridad || "media");



ticketPrioridadBadge.textContent =

ticket.prioridad || "media";


}



}
// ==========================================
// CARGAR CONVERSACIÓN
// ==========================================


async function cargarMensajes(){


try{


    if(!conversacion)

        return;



    const mensajesRef =

    collection(

        db,

        "tickets",

        ticketId,

        "mensajes"

    );




    const consulta =

    query(

        mensajesRef,

        orderBy(

            "fecha",

            "asc"

        )

    );





    const snapshot =

    await getDocs(

        consulta

    );





    conversacion.innerHTML = "";






    if(snapshot.empty){


        conversacion.innerHTML =


        `

        <div class="conversation-empty">

            <i class="fa-solid fa-comments"></i>

            <p>

            No hay mensajes todavía.

            </p>

        </div>

        `;


        return;


    }







    snapshot.forEach((doc)=>{



        const mensaje =

        doc.data();





        const fechaMensaje =

        formatoFecha(

            mensaje.fecha

        );






        conversacion.innerHTML +=



        `

        <div class="mensaje">


            <div class="mensaje-header">


                <strong>

                ${mensaje.nombre || mensaje.autor || "Usuario"}

                </strong>



                <small>

                ${fechaMensaje}

                </small>


            </div>




            <p>

            ${mensaje.mensaje || ""}

            </p>



        </div>


        `;



    });





}

catch(error){



console.error(

"Error cargando mensajes:",

error

);



conversacion.innerHTML =


`

<div class="conversation-empty">

Error cargando conversación.

</div>

`;



}



}

// ==========================================
// REGISTRAR HISTORIAL DEL TICKET
// ==========================================


async function registrarHistorial(
titulo,
descripcion,
tipo="actividad"
){


try{


await addDoc(

collection(

db,

"tickets",

ticketId,

"historial"

),

{


titulo,

descripcion,


tipo,


usuario:

auth.currentUser?.email || "Administrador",


fecha:

serverTimestamp()


}


);



}

catch(error){


console.error(

"Error registrando historial:",

error

);


}



}








// ==========================================
// RESPONDER CLIENTE
// ==========================================


respuestaForm?.addEventListener(

"submit",

async(e)=>{


e.preventDefault();





const texto =

respuesta.value.trim();





if(!texto)

    return;






try{



const usuarioActual =

auth.currentUser;





if(!usuarioActual){


    mostrarMensaje(

        "Sesión administrativa inválida",

        "error"

    );


    return;


}








await addDoc(


collection(

    db,

    "tickets",

    ticketId,

    "mensajes"

),


{


    autor:"admin",


    nombre:"Administrador",


    uid:

    usuarioActual.uid,


    mensaje:texto,


    tipo:"respuesta",


    fecha:

    serverTimestamp()



}


);







await updateDoc(


doc(

    db,

    "tickets",

    ticketId

),


{


    ultimaRespuesta:"admin",


    ultimaActividad:

    serverTimestamp(),


    ultimaActualizacion:

    serverTimestamp()


}



);

    
await registrarHistorial(

"Respuesta enviada",

"El administrador respondió al cliente",

"mensaje"

);






respuesta.value="";





mostrarMensaje(

"Respuesta enviada correctamente",

"success"

);






await cargarMensajes();



}

catch(error){



console.error(

"Error enviando respuesta:",

error

);



mostrarMensaje(

"No se pudo enviar la respuesta",

"error"

);



}



}

);










// ==========================================
// CAMBIO DE ESTADO
// ==========================================


btnGuardarEstado?.addEventListener(

"click",

async()=>{



try{



const nuevo =

nuevoEstado.value;


const estadoAnterior = estado.textContent;


await updateDoc(


doc(

db,

"tickets",

ticketId

),


{


estado:nuevo,


ultimaActividad:

serverTimestamp(),


ultimaActualizacion:

serverTimestamp()


}



);


await registrarHistorial(

"Cambio de estado",

`
El estado cambió de ${estadoAnterior}
a ${nuevoEstado.value}
`,

"estado"

);




ticketEstado.textContent =

nuevo;





if(ticketEstadoBadge){


ticketEstadoBadge.className =

"badge-ticket " + nuevo;


ticketEstadoBadge.textContent =

nuevo;


}






mostrarMensaje(

"Estado actualizado correctamente",

"success"

);





}

catch(error){



console.error(

"Error actualizando estado:",

error

);



mostrarMensaje(

"No se pudo actualizar el estado",

"error"

);



}



}

);
// ==========================================
// CARGAR TIMELINE DEL TICKET
// ==========================================


async function cargarTimeline(){


const timeline =

document.getElementById(
    "ticketTimeline"
);



if(!timeline)

return;



try{


const historialRef =

collection(

db,

"tickets",

ticketId,

"historial"

);





const consulta =

query(

historialRef,

orderBy(

"fecha",

"asc"

)

);





const snapshot =

await getDocs(

consulta

);





timeline.innerHTML = "";






if(snapshot.empty){


timeline.innerHTML =


`

<div class="timeline-empty">

<i class="fa-solid fa-clock"></i>

<p>

Sin movimientos registrados.

</p>

</div>

`;

return;


}






snapshot.forEach((doc)=>{


const evento = doc.data();





timeline.innerHTML +=


`

<div class="timeline-item">


<div class="timeline-icon ${iconoTimeline(evento.tipo).clase}">


${iconoTimeline(evento.tipo).icon}


</div>



<div class="timeline-content">


<strong>

${evento.titulo || "Actividad"}

</strong>



<p>

${evento.descripcion || ""}

</p>



<small>

${formatoFecha(evento.fecha)}

</small>


</div>


</div>


`;



});





}

catch(error){


console.error(

"Error cargando timeline:",

error

);



timeline.innerHTML =


`

<p>

Error cargando historial.

</p>

`;



}


}

// ==========================================
// ICONOS Y CLASES TIMELINE
// ==========================================


function iconoTimeline(tipo){


switch(tipo){


case "mensaje":

return {

icon:
'<i class="fa-solid fa-comment"></i>',

clase:
"timeline-mensaje"

};



case "estado":

return {

icon:
'<i class="fa-solid fa-arrows-rotate"></i>',

clase:
"timeline-estado"

};



case "prioridad":

return {

icon:
'<i class="fa-solid fa-flag"></i>',

clase:
"timeline-prioridad"

};



case "tecnico":

return {

icon:
'<i class="fa-solid fa-user-gear"></i>',

clase:
"timeline-tecnico"

};



default:

return {

icon:
'<i class="fa-solid fa-clock"></i>',

clase:
"timeline-default"

};



}


}

// ==========================================
// CARGAR ADJUNTOS
// ==========================================


async function cargarAdjuntos(){



const contenedor =

document.getElementById(

    "ticketAdjuntos"

);



if(!contenedor)

    return;





try{



const ticketRef =

doc(

db,

"tickets",

ticketId

);



const snap =

await getDoc(

ticketRef

);





const ticket =

snap.data();





const archivos =

ticket.adjuntos || [];





if(!archivos.length){


return;


}





contenedor.innerHTML="";





archivos.forEach(archivo=>{


contenedor.innerHTML +=


`

<div class="attachment-item">


<i class="fa-solid fa-file"></i>


<a

href="${archivo.url}"

target="_blank">

${archivo.nombre}

</a>


</div>


`;



});





}

catch(error){


console.error(

"Error adjuntos:",

error

);


}



}









// ==========================================
// CAMBIAR PRIORIDAD
// ==========================================


const btnCambiarPrioridad =

document.getElementById(

    "btnCambiarPrioridad"

);





btnCambiarPrioridad?.addEventListener(

"click",

async()=>{



const nuevaPrioridad =

prompt(

"Escribe prioridad: alta, media o baja"

);





if(

!nuevaPrioridad ||

![

"alta",

"media",

"baja"

].includes(

nuevaPrioridad

)

)

return;






try{



await updateDoc(


doc(

db,

"tickets",

ticketId

),


{


prioridad:nuevaPrioridad,


ultimaActividad:

serverTimestamp()


}



);


await registrarHistorial(

"Cambio de prioridad",

`
La prioridad fue cambiada a ${nuevaPrioridad}
`,

"prioridad"

);




ticketPrioridad.textContent =

nuevaPrioridad;





if(ticketPrioridadBadge){


ticketPrioridadBadge.className =

"prioridad " + nuevaPrioridad;


ticketPrioridadBadge.textContent =

nuevaPrioridad;


}





mostrarMensaje(

"Prioridad actualizada",

"success"

);




}

catch(error){



console.error(

"Error prioridad:",

error

);


}



}

);









// ==========================================
// ASIGNAR TECNICO
// ==========================================


const btnAsignarTecnico =

document.getElementById(

"btnAsignarTecnico"

);





btnAsignarTecnico?.addEventListener(

"click",

async()=>{



const tecnico =

prompt(

"Nombre del técnico asignado"

);





if(!tecnico)

return;





try{


await updateDoc(


doc(

db,

"tickets",

ticketId

),


{


tecnicoNombre:tecnico,


ultimaActividad:

serverTimestamp()


}


);


await registrarHistorial(

"Técnico asignado",

`
El ticket fue asignado a ${tecnico}
`,

"tecnico"

);


ticketTecnico.textContent =

tecnico;





mostrarMensaje(

"Técnico asignado correctamente",

"success"

);



}

catch(error){


console.error(

"Error técnico:",

error

);



}



}

);










// ==========================================
// SLA
// ==========================================


function calcularSLA(){



const estadoSLA =

document.getElementById(

"slaEstado"

);



if(!estadoSLA)

return;




estadoSLA.textContent =

"En tiempo";



}









// ==========================================
// INICIALIZACIÓN
// ==========================================


onAuthStateChanged(

auth,

(user)=>{



if(user){



    if(ticketId){


    cargarTicket();


    cargarTimeline();


    cargarAdjuntos();


    calcularSLA();


}



}

else{


window.location.href =

"../login.html";


}



}

);
