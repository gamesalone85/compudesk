// ==========================================
// COMPU DESK
// AUTH SERVICE
// Producción v1.0
// ==========================================

import { auth, db } from "../firebase-config.js";

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    browserLocalPersistence,
    browserSessionPersistence,
    setPersistence
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ==========================================
// LOGIN
// ==========================================

export async function login(email, password, remember = false) {

    await setPersistence(
        auth,
        remember
            ? browserLocalPersistence
            : browserSessionPersistence
    );

    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

}

// ==========================================
// LOGOUT
// ==========================================

export async function logout() {

    await signOut(auth);

}

// ==========================================
// OBSERVADOR DE SESIÓN
// ==========================================

export function observeAuth(callback) {

    return onAuthStateChanged(auth, callback);

}

// ==========================================
// ADMIN
// ==========================================

export async function getAdmin(uid) {

    const ref = doc(db, "admins", uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        return null;

    }

    return {

        uid,

        ...snap.data()

    };

}

// ==========================================
// CLIENTE
// ==========================================

export async function getClientUser(uid) {

    const ref = doc(db, "usuarios", uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        return null;

    }

    return {

        uid,

        ...snap.data()

    };

}
