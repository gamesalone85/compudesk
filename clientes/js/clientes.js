/*
========================================
COMPU DESK
Portal Clientes JavaScript
========================================
*/


document.addEventListener("DOMContentLoaded", function(){


    console.log(
        "Portal Clientes Compudesk cargado correctamente"
    );



    /*
    ========================================
    CONFIGURACIÓN CLIENTE
    ========================================
    */


    const cliente = {

        id: null,

        empresa: null,

        usuario: null,

        autenticado: false

    };



    /*
    ========================================
    VALIDACIÓN DE SESIÓN
    ========================================
    */


    function validarSesion(){


        const sesion =
        localStorage.getItem("clienteCompudesk");



        if(sesion){


            const datos =
            JSON.parse(sesion);



            cliente.id =
            datos.id;



            cliente.empresa =
            datos.empresa;



            cliente.usuario =
            datos.usuario;



            cliente.autenticado = true;



            console.log(
                "Cliente activo:",
                cliente
            );


        }else{


            console.log(
                "No existe sesión de cliente"
            );


        }


    }





    /*
    ========================================
    BOTÓN INGRESAR PORTAL
    ========================================
    */


    const botonLogin =
    document.querySelector(
        'a[href="login.html"]'
    );



    if(botonLogin){


        botonLogin.addEventListener(
            "click",
            function(){


                console.log(
                    "Accediendo al login de clientes"
                );


            }
        );


    }





    /*
    ========================================
    FUNCIÓN FUTURA:
    CREAR TICKET
    ========================================
    */


    function crearTicket(ticket){


        console.log(
            "Nuevo ticket:",
            ticket
        );


        /*
        Aquí después conectaremos
        Google Sheets API
        */


    }





    /*
    ========================================
    FUNCIÓN FUTURA:
    CONSULTAR TICKETS
    ========================================
    */


    function consultarTickets(){


        console.log(
            "Consultando tickets del cliente"
        );


        /*
        Aquí traeremos información
        desde Google Sheets
        */


    }





    /*
    ========================================
    INICIALIZACIÓN
    ========================================
    */


    validarSesion();



});
