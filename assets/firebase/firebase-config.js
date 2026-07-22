// assets/firebase/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCqmC-5Qfv4NYKkNyHQxQcY3H84bhHzxZw",
    authDomain: "compudesk-portal.firebaseapp.com",
    projectId: "compudesk-portal",
    storageBucket: "compudesk-portal.firebasestorage.app",
    messagingSenderId: "793483328077",
    appId: "1:793483328077:web:318a0b5aa0d17650b93a04",
    measurementId: "G-CM3FZ2MF8V"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
