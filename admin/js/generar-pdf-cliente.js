// ==========================================
// COMPU DESK ADMIN
// Generador Comprobante Servicio PDF
// ==========================================



export function generarPDF(cliente){



    const { jsPDF } =
    window.jspdf;



    const pdf =
    new jsPDF();



    const ancho =
    pdf.internal.pageSize.width;



    let y = 20;



    // ==============================
    // ENCABEZADO
    // ==============================


    pdf.setFillColor(
        200,
        16,
        46
    );


    pdf.rect(
        0,
        0,
        ancho,
        35,
        "F"
    );



    pdf.setTextColor(
        255,
        255,
        255
    );


    pdf.setFontSize(22);


    pdf.text(
        "COMPU DESK",
        20,
        18
    );


    pdf.setFontSize(11);


    pdf.text(
        "Soporte Técnico Profesional",
        20,
        27
    );





    y = 55;



    pdf.setTextColor(
        40,
        40,
        40
    );



    pdf.setFontSize(16);


    pdf.text(
        "Comprobante de Servicio",
        20,
        y
    );



    y += 15;



    pdf.setFontSize(11);



    pdf.text(
        "Documento de registro de cliente",
        20,
        y
    );



    y += 20;




    // ==============================
    // DATOS CLIENTE
    // ==============================



    pdf.setFontSize(14);


    pdf.text(
        "Datos del Cliente",
        20,
        y
    );


    y += 10;



    pdf.setFontSize(11);



    const datos = [

        [
        "Empresa:",
        cliente.empresa
        ],

        [
        "Contacto:",
        cliente.contacto
        ],

        [
        "Correo:",
        cliente.correo
        ],

        [
        "Telefono:",
        cliente.telefono
        ],

        [
        "Tipo:",
        cliente.tipo
        ]

    ];





    datos.forEach(d=>{


        pdf.text(
            `${d[0]} ${d[1] || "-"}`,
            25,
            y
        );


        y += 8;


    });






    y += 10;




    // ==============================
    // SERVICIO
    // ==============================


    pdf.setFontSize(14);


    pdf.text(
        "Servicio Contratado",
        20,
        y
    );


    y += 10;



    pdf.setFontSize(11);


    pdf.text(
        `Plan: ${cliente.plan || "-"}`,
        25,
        y
    );


    y += 8;


    pdf.text(
        `Estado: ${cliente.estado || "-"}`,
        25,
        y
    );



    y += 8;



    let fecha =
    new Date()
    .toLocaleDateString(
        "es-MX"
    );



    pdf.text(
        `Fecha de emisión: ${fecha}`,
        25,
        y
    );




    y += 25;




    // ==============================
    // TEXTO LEGAL
    // ==============================


    pdf.setFontSize(10);


    const texto =

    "Compu Desk confirma mediante este documento "
    +
    "la activación del servicio contratado. "
    +
    "Este comprobante representa el registro "
    +
    "administrativo del cliente dentro de nuestra plataforma.";



    pdf.text(
        texto,
        20,
        y,
        {
            maxWidth:170
        }
    );





    // ==============================
    // PIE
    // ==============================



    pdf.setFontSize(10);


    pdf.text(
        "www.compudesk.org",
        20,
        270
    );


    pdf.text(
        "Gracias por confiar en Compu Desk",
        20,
        278
    );





    pdf.save(

        `Comprobante_CompuDesk_${cliente.empresa}.pdf`

    );



}
