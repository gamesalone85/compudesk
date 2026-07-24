// ==========================================
// COMPU DESK
// FIRESTORE SERVICE
// Producción v1.0
// ==========================================

import { db } from "../firebase-config.js";

import {

    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ==========================================
// OBTENER DOCUMENTO
// ==========================================

export async function getDocument(collectionName, id) {

    const reference = doc(db, collectionName, id);

    const snapshot = await getDoc(reference);

    if (!snapshot.exists()) {

        return null;

    }

    return {

        id: snapshot.id,

        ...snapshot.data()

    };

}

// ==========================================
// LISTAR DOCUMENTOS
// ==========================================

export async function getCollection(collectionName) {

    const snapshot = await getDocs(

        collection(db, collectionName)

    );

    return snapshot.docs.map(document => ({

        id: document.id,

        ...document.data()

    }));

}

// ==========================================
// CONSULTA SIMPLE
// ==========================================

export async function getWhere(

    collectionName,

    field,

    operator,

    value

) {

    const q = query(

        collection(db, collectionName),

        where(field, operator, value)

    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(document => ({

        id: document.id,

        ...document.data()

    }));

}

// ==========================================
// CREAR DOCUMENTO
// ==========================================

export async function createDocument(

    collectionName,

    data

) {

    const document = await addDoc(

        collection(db, collectionName),

        data

    );

    return document.id;

}

// ==========================================
// ACTUALIZAR
// ==========================================

export async function updateDocument(

    collectionName,

    id,

    data

) {

    await updateDoc(

        doc(db, collectionName, id),

        data

    );

}

// ==========================================
// ELIMINAR
// ==========================================

export async function deleteDocument(

    collectionName,

    id

) {

    await deleteDoc(

        doc(db, collectionName, id)

    );

}
