// ==========================================
// COMPU DESK
// CLIENTE AUTH GUARD
// Producción v2.0
// Compatible Firebase Free
// ==========================================

import {

    auth,
    db

} from "../../assets/firebase/firebase-config.js";

import {

    onAuthStateChanged,
    signOut

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {

    collection,
    query,
    where,
    getDocs

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.replace("login.html");

        return;

    }

    try {

        const correo = user.email.toLowerCase();

        const consulta = query(

            collection(db, "usuarios"),

            where("correo", "==", correo)

        );

        const resultado = await getDocs(consulta);

        if (resultado.empty) {

            await signOut(auth);

            localStorage.removeItem("clienteCompudesk");

            window.location.replace("login.html");

            return;

        }

        const documento = resultado.docs[0];

        const datos = documento.data();

        if (datos.estado !== "activo") {

            await signOut(auth);

            localStorage.removeItem("clienteCompudesk");

            window.location.replace("login.html");

            return;

        }

        localStorage.setItem(

            "clienteCompudesk",

            JSON.stringify({

                uid: user.uid,

                usuarioId: documento.id,

                ...datos

            })

        );

    }

    catch (error) {

        console.error(error);

        await signOut(auth);

        localStorage.removeItem("clienteCompudesk");

        window.location.replace("login.html");

    }

});
