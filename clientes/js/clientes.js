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

// ==========================================
// Sistema de Cookies CompuDesk
// Consentimiento y Google Analytics
// ==========================================


document.addEventListener("DOMContentLoaded", function(){


    const cookieBanner = document.getElementById("cookieBanner");

    const acceptCookies = document.getElementById("acceptCookies");

    const rejectCookies = document.getElementById("rejectCookies");



    // Si no existe el banner no ejecuta nada

    if(!cookieBanner){

        return;

    }



    // Revisar si el usuario ya tomó una decisión

    const consent = localStorage.getItem(
        "compudeskCookieConsent"
    );



    if(consent === null){


        // Primera visita

        cookieBanner.style.display = "block";


    }else{


        // Ya decidió anteriormente

        cookieBanner.style.display = "none";


        // Si aceptó cargar Analytics

        if(consent === "accepted"){

            loadAnalytics();

        }


    }





    // ======================================
    // Usuario acepta cookies
    // ======================================


    if(acceptCookies){


        acceptCookies.addEventListener(
            "click",
            function(){


                localStorage.setItem(
                    "compudeskCookieConsent",
                    "accepted"
                );


                cookieBanner.style.display = "none";



                console.log(
                    "Cookies aceptadas"
                );



                // Cargar herramientas autorizadas

                loadAnalytics();



            }

        );


    }





    // ======================================
    // Usuario rechaza cookies
    // ======================================


    if(rejectCookies){


        rejectCookies.addEventListener(
            "click",
            function(){


                localStorage.setItem(
                    "compudeskCookieConsent",
                    "rejected"
                );


                cookieBanner.style.display = "none";



                console.log(
                    "Cookies rechazadas"
                );



            }

        );


    }




});






// ==========================================
// Google Analytics preparado
// ==========================================


function loadAnalytics(){



    const analyticsLoaded =
    document.getElementById(
        "googleAnalytics"
    );



    // Evitar cargar dos veces

    if(analyticsLoaded){

        return;

    }



    console.log(
        "Google Analytics autorizado"
    );



    /*
    
    AQUÍ SE CARGARÁ GOOGLE ANALYTICS

    Ejemplo futuro:

    const script=document.createElement("script");

    script.src=
    "https://www.googletagmanager.com/gtag/js?id=TU_ID";

    script.async=true;

    script.id="googleAnalytics";

    document.head.appendChild(script);


    */



}
