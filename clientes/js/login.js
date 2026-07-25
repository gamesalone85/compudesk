// ==========================================
// COMPU DESK
// PORTAL CLIENTES
// LOGIN PRODUCCIÓN 2.0
// Firebase Authentication
// Compatible Firebase Free
// ==========================================

import {
    auth,
    db
} from "../../assets/firebase/firebase-config.js";

import {

    signInWithEmailAndPassword,
    browserLocalPersistence,
    browserSessionPersistence,
    setPersistence,
    signOut

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {

    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ==========================================
// ELEMENTOS
// ==========================================

const form = document.getElementById("loginForm");

const txtCorreo = document.getElementById("email");

const txtPassword = document.getElementById("password");

const remember = document.getElementById("remember");

const togglePassword = document.getElementById("togglePassword");


// ==========================================
// PASSWORD
// ==========================================

togglePassword?.addEventListener("click", () => {

    const visible = txtPassword.type === "text";

    txtPassword.type = visible ? "password" : "text";

    togglePassword.innerHTML = visible
        ? '<i class="fa-solid fa-eye"></i>'
        : '<i class="fa-solid fa-eye-slash"></i>';

});


// ==========================================
// LOGIN
// ==========================================

form?.addEventListener("submit", async (e) => {

    e.preventDefault();

    mostrarMensaje("Validando acceso...", "success");

    const correo = txtCorreo.value.trim().toLowerCase();

    const password = txtPassword.value;

    if (!correo || !password) {

        mostrarMensaje(
            "Completa todos los campos.",
            "error"
        );

        return;

    }

    try {

        //-------------------------------------------------
        // Persistencia
        //-------------------------------------------------

        await setPersistence(

            auth,

            remember.checked
                ? browserLocalPersistence
                : browserSessionPersistence

        );

        //-------------------------------------------------
        // Firebase Authentication
        //-------------------------------------------------

        const credencial = await signInWithEmailAndPassword(

            auth,
            correo,
            password

        );

        console.log("Auth OK");

        //-------------------------------------------------
        // Buscar usuario por correo
        //-------------------------------------------------

        const consulta = query(

            collection(db, "usuarios"),

            where("correo", "==", correo)

        );

        const resultado = await getDocs(consulta);

        if (resultado.empty) {

            await signOut(auth);

            mostrarMensaje(

                "No existe un perfil asociado a este usuario.",

                "error"

            );

            return;

        }

        //-------------------------------------------------
        // Perfil
        //-------------------------------------------------

        const documento = resultado.docs[0];

        const usuario = documento.data();

        //-------------------------------------------------
        // Estado
        //-------------------------------------------------

        if (usuario.estado !== "activo") {

            await signOut(auth);

            mostrarMensaje(

                "Tu cuenta está deshabilitada.",

                "error"

            );

            return;

        }

        //-------------------------------------------------
        // Rol
        //-------------------------------------------------

        if (usuario.rol !== "cliente") {

            await signOut(auth);

            mostrarMensaje(

                "Esta cuenta no pertenece al Portal Clientes.",

                "error"

            );

            return;

        }

        //-------------------------------------------------
        // Empresa
        //-------------------------------------------------

        let empresa = {};

        if (usuario.clienteId) {

            const clienteDoc = await getDoc(

                doc(
                    db,
                    "clientes",
                    usuario.clienteId
                )

            );

            if (clienteDoc.exists()) {

                empresa = clienteDoc.data();

            }

        }

        //-------------------------------------------------
        // Crear sesión
        //-------------------------------------------------

        const sesion = {

            uid: credencial.user.uid,

            usuarioId: documento.id,

            nombre: usuario.nombre,

            correo: usuario.correo,

            telefono: usuario.telefono || "",

            rol: usuario.rol,

            estado: usuario.estado,

            clienteId: usuario.clienteId,

            empresa: empresa.empresa || "",

            plan: empresa.plan || "",

            rfc: empresa.rfc || "",

            contacto: empresa.contacto || "",

            empresaCorreo: empresa.correo || "",

            empresaTelefono: empresa.telefono || ""

        };

        localStorage.setItem(

            "clienteCompudesk",

            JSON.stringify(sesion)

        );

        mostrarMensaje(

            "Acceso correcto.",

            "success"

        );

        setTimeout(() => {

            location.href = "dashboard.html";

        }, 600);

    }

    catch (error) {

        console.error(error);

        let mensaje = "Correo o contraseña incorrectos.";

        switch (error.code) {

            case "auth/invalid-credential":
                mensaje = "Correo o contraseña incorrectos.";
                break;

            case "auth/user-not-found":
                mensaje = "Usuario no encontrado.";
                break;

            case "auth/wrong-password":
                mensaje = "Contraseña incorrecta.";
                break;

            case "auth/network-request-failed":
                mensaje = "Sin conexión a Internet.";
                break;

            case "auth/too-many-requests":
                mensaje = "Demasiados intentos. Intenta más tarde.";
                break;

        }

        mostrarMensaje(mensaje, "error");

    }

});


// ==========================================
// MENSAJES
// ==========================================

function mostrarMensaje(texto, tipo) {

    let alerta = document.querySelector(".login-alert");

    if (!alerta) {

        alerta = document.createElement("div");

        alerta.className = "login-alert";

        document
            .querySelector(".login-card")
            .prepend(alerta);

    }

    alerta.className = "login-alert " + tipo;

    alerta.textContent = texto;

}
