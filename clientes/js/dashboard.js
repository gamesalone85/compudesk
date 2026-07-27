// ==========================================
// COMPU DESK
// CLIENTE DASHBOARD
// Producción 4.1
// Firebase Auth + Firestore
// ==========================================


import {
    auth,
    db
}
from "../../assets/firebase/firebase-config.js";


import {
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    collection,
    query,
    where,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";




// ==========================================
// ELEMENTOS
// ==========================================


const nombre =
document.getElementById("nombreCliente");


const empresa =
document.getElementById("empresaCliente");


const plan =
document.getElementById("planCliente");


const datos =
document.getElementById("datosEmpresa");


const abiertos =
document.getElementById("ticketsAbiertos");


const cerrados =
document.getElementById("ticketsCerrados");




// ==========================================
// CARGAR DASHBOARD
// ==========================================


async function cargarDashboard(user){


    const sesion = JSON.parse(

        localStorage.getItem(
            "clienteCompudesk"
        )

    );



    if(!sesion){


        location.replace(
            "login.html"
        );


        return;


    }




    // ======================================
    // DATOS DEL CLIENTE
    // ======================================


    nombre.textContent =
        sesion.nombre || "-";


    empresa.textContent =
        sesion.empresa || "-";


    plan.textContent =
        sesion.plan || "Sin plan";







    // ======================================
    // INFORMACIÓN EMPRESA
    // ======================================


    datos.innerHTML = `

    <div class="empresa-grid">


        <div>
            <label>Empresa</label>
            <strong>
                ${sesion.empresa || "-"}
            </strong>
        </div>



        <div>
            <label>Contacto</label>
            <strong>
                ${sesion.contacto || "-"}
            </strong>
        </div>



        <div>
            <label>Correo</label>
            <strong>
                ${sesion.empresaCorreo || "-"}
            </strong>
        </div>



        <div>
            <label>Teléfono</label>
            <strong>
                ${sesion.empresaTelefono || "-"}
            </strong>
        </div>



        <div>
            <label>RFC</label>
            <strong>
                ${sesion.rfc || "No registrado"}
            </strong>
        </div>


    </div>

    `;







    // ======================================
    // CONSULTAR TICKETS CLIENTE
    // ======================================


    try{


        const consulta = query(


            collection(
                db,
                "tickets"
            ),



            where(

                "correoUsuario",

                "==",

                user.email

            )


        );





        const resultado =

            await getDocs(
                consulta
            );





        let abiertosTotal = 0;

        let cerradosTotal = 0;





        resultado.forEach(

            documento=>{


                const ticket =
                    documento.data();




                const estado =

                    (
                        ticket.estado || ""
                    )
                    .toLowerCase();





                if(
                    estado === "cerrado"
                ){


                    cerradosTotal++;


                }
                else{


                    abiertosTotal++;


                }



            }

        );







        abiertos.textContent =
            abiertosTotal;



        cerrados.textContent =
            cerradosTotal;



    }

    catch(error){


        console.error(

            "Error cargando tickets:",

            error

        );



        abiertos.textContent =
            "0";


        cerrados.textContent =
            "0";


    }


}








// ==========================================
// VALIDAR SESIÓN FIREBASE
// ==========================================


onAuthStateChanged(

    auth,


    (user)=>{


        if(!user){


            location.replace(
                "login.html"
            );


            return;


        }



        cargarDashboard(
            user
        );


    }

);







// ==========================================
// LOGOUT
// ==========================================


const botonLogout =

document.getElementById(
    "logout"
);



if(botonLogout){


    botonLogout.addEventListener(

        "click",


        async()=>{


            await signOut(
                auth
            );



            localStorage.removeItem(
                "clienteCompudesk"
            );



            location.replace(
                "login.html"
            );



        }


    );


}
