// ==========================================
// COMPU DESK ADMIN
// Gestión de Clientes
// Firebase Firestore
// ==========================================


import { db } from "../../assets/firebase/firebase-config.js";


import {

    collection,
    getDocs,
    query,
    orderBy

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





// ==========================================
// ELEMENTOS HTML
// ==========================================


const tablaClientes =
document.getElementById("clientesTabla");


const totalClientes =
document.getElementById("totalClientes");


const buscarCliente =
document.getElementById("buscarCliente");




let clientes = [];







// ==========================================
// CARGAR CLIENTES FIRESTORE
// ==========================================


async function cargarClientes(){



    try{


        const clientesRef =
        collection(
            db,
            "clientes"
        );



        const consulta =
        query(

            clientesRef,

            orderBy(
                "fechaAlta",
                "desc"
            )

        );



        const resultado =
        await getDocs(
            consulta
        );



        clientes = [];



        resultado.forEach((documento)=>{


            clientes.push({


                id:
                documento.id,


                ...documento.data()



            });



        });





        mostrarClientes(
            clientes
        );





        if(totalClientes){

            totalClientes.textContent =
            clientes.length;

        }




    }

    catch(error){



        console.error(
            "Error cargando clientes:",
            error
        );



        if(tablaClientes){


            tablaClientes.innerHTML = `

            <tr>

                <td colspan="6">

                    Error cargando clientes.

                </td>

            </tr>

            `;


        }



    }



}









// ==========================================
// MOSTRAR CLIENTES
// ==========================================


function mostrarClientes(lista){





    if(!tablaClientes){

        return;

    }






    if(lista.length === 0){



        tablaClientes.innerHTML = `


        <tr>


            <td colspan="6">


                No existen clientes registrados.


            </td>


        </tr>


        `;



        return;


    }








    tablaClientes.innerHTML = "";







    lista.forEach((cliente)=>{





        const fila =
        document.createElement(
            "tr"
        );







        fila.innerHTML = `



        <td>

            ${cliente.empresa || "-"}

        </td>





        <td>

            ${cliente.contacto || "-"}

        </td>





        <td>

            ${cliente.correo || "-"}

        </td>





        <td>

            ${cliente.plan || "-"}

        </td>





        <td>


            <span class="estado ${cliente.estado || "pendiente"}">


                ${(cliente.estado || "pendiente").toUpperCase()}


            </span>



        </td>





        <td class="acciones">


            <a 

            href="ver.html?id=${cliente.id}"

            title="Ver cliente">


                <i class="fa-solid fa-eye"></i>


            </a>





            <a 

            href="editar.html?id=${cliente.id}"

            title="Editar cliente">


                <i class="fa-solid fa-pen"></i>


            </a>





        </td>




        `;






        tablaClientes.appendChild(
            fila
        );





    });






}









// ==========================================
// BUSCADOR
// ==========================================


if(buscarCliente){



buscarCliente.addEventListener(
"input",
()=>{



    const texto =
    buscarCliente.value
    .toLowerCase()
    .trim();





    const filtrados =
    clientes.filter((cliente)=>{





        return (


            cliente.empresa
            ?.toLowerCase()
            .includes(texto)



            ||



            cliente.contacto
            ?.toLowerCase()
            .includes(texto)




            ||



            cliente.correo
            ?.toLowerCase()
            .includes(texto)



        );





    });






    mostrarClientes(
        filtrados
    );






});



}









// ==========================================
// INICIO
// ==========================================


cargarClientes();
