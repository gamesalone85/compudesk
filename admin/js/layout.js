// ==========================================
// COMPU DESK ADMIN
// Cargador de Layout
// Sidebar + Header
// ==========================================



async function cargarComponente(
    id,
    archivo
){



    const elemento =
    document.getElementById(id);



    if(!elemento){

        return;

    }



    try{


        const respuesta =
        await fetch(
            "../components/" + archivo
        );



        if(!respuesta.ok){

            throw new Error(
                "No existe: " + archivo
            );

        }



        const contenido =
        await respuesta.text();



        elemento.innerHTML =
        contenido;



    }
    catch(error){


        console.error(
            "Error cargando componente:",
            error
        );


    }



}






// Iniciar componentes


cargarComponente(
    "sidebar",
    "sidebar.html"
);



cargarComponente(
    "header",
    "header.html"
);
