// ==========================================
// COMPU DESK
// ADMIN LOGIN
// Producción v1.0
// ==========================================

import { auth, db } from "../../assets/firebase/firebase-config.js";

import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ==========================================
// ELEMENTOS
// ==========================================

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const remember = document.getElementById("rememberSession");
const message = document.getElementById("loginMessage");
const togglePassword = document.getElementById("togglePassword");

const btnLogin = document.getElementById("btnLogin");
const btnText = document.getElementById("btnText");
const spinner = document.getElementById("loadingSpinner");

// ==========================================
// PASSWORD
// ==========================================

togglePassword?.addEventListener("click", () => {

    const visible = password.type === "text";

    password.type = visible ? "password" : "text";

    togglePassword.innerHTML = visible
        ? '<i class="fa-solid fa-eye"></i>'
        : '<i class="fa-solid fa-eye-slash"></i>';

});

// ==========================================
// LOGIN
// ==========================================

form?.addEventListener("submit", async (e) => {

    e.preventDefault();

    clearMessage();

    const correo = email.value.trim();
    const clave = password.value;

    if (!correo || !clave) {
        showMessage("Completa todos los campos.", "error");
        return;
    }

    setLoading(true);

    try {

        await setPersistence(
            auth,
            remember.checked
                ? browserLocalPersistence
                : browserSessionPersistence
        );

        const credential = await signInWithEmailAndPassword(
            auth,
            correo,
            clave
        );

        const uid = credential.user.uid;

        const adminRef = doc(db, "admins", uid);

        const adminSnap = await getDoc(adminRef);

        if (!adminSnap.exists()) {

            await signOut(auth);

            showMessage(
                "No tienes permisos para acceder al portal de administración.",
                "error"
            );

            return;
        }

        const admin = adminSnap.data();

        if (admin.activo !== true) {

            await signOut(auth);

            showMessage(
                "Tu cuenta se encuentra deshabilitada.",
                "error"
            );

            return;
        }

        showMessage(
            "Autenticación correcta.",
            "success"
        );

        window.location.replace("index.html");

    } catch (error) {

        console.error(error);

        let texto = "No fue posible iniciar sesión.";

        switch (error.code) {

            case "auth/invalid-credential":
            case "auth/user-not-found":
            case "auth/wrong-password":
                texto = "Correo o contraseña incorrectos.";
                break;

            case "auth/too-many-requests":
                texto = "Demasiados intentos. Intenta nuevamente más tarde.";
                break;

            case "auth/network-request-failed":
                texto = "No hay conexión con Internet.";
                break;

        }

        showMessage(texto, "error");

    } finally {

        setLoading(false);

    }

});

// ==========================================
// UI
// ==========================================

function showMessage(text, type) {

    message.textContent = text;
    message.className = `login-message ${type}`;

}

function clearMessage() {

    message.textContent = "";
    message.className = "login-message";

}

function setLoading(status) {

    btnLogin.disabled = status;

    spinner.classList.toggle("hidden", !status);

    btnText.textContent = status
        ? "Validando..."
        : "Iniciar sesión";

}
