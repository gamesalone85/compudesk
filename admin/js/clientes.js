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

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";





const tablaClientes =
document.getElementById("clientesTabla");


const totalClientes =
document.getElementById("totalClientes");


const buscarCliente =
document.getElementById("buscarCliente");



let clientes = [];




// Cargar clientes

async function cargarClientes(){


    try{


        const clientesRef =
        collection(db,"clientes");



        const consulta =
        query(
            clientesRef,
            orderBy(
                "fechaAlta",
                "desc"
            )
        );



        const resultado =
        await getDocs(consulta);



        clientes = [];



        resultado.forEach((doc)=>{


            clientes.push({

                id:doc.id,

                ...doc.data()

            });


        });



        mostrarClientes(clientes);



        totalClientes.textContent =
        clientes.length;



    }catch(error){


        console.error(
            "Error cargando clientes:",
            error
        );


        tablaClientes.innerHTML = `

        <tr>

            <td colspan="6">

            Error al cargar clientes.

            </td>

        </tr>

        `;


    }


}







// Pintar tabla

function mostrarClientes(lista){



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



        const fila = document.createElement("tr");



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

            <span class="estado ${cliente.estado}">

            ${cliente.estado || "pendiente"}

            </span>

        </td>


        <td>


            <a href="editar.html?id=${cliente.id}">

            <i class="fa-solid fa-pen"></i>

            </a>


        </td>


        `;



        tablaClientes.appendChild(fila);



    });



}







// Buscador

buscarCliente.addEventListener(
"input",
()=>{


    const texto =
    buscarCliente.value
    .toLowerCase();



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



    mostrarClientes(filtrados);



});







// Inicio

cargarClientes();
