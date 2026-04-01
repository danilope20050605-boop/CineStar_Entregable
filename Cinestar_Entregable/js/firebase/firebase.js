// 1. Importamos lo necesario de la versión 12.11.0
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// 2. Tu nueva configuración
const firebaseConfig = {
    apiKey: "AIzaSyBSfVTJUs3-ziPOwgyiFx1lJgrUCxsL1Js",
    authDomain: "cinestar-a8730.firebaseapp.com",
    databaseURL: "https://cinestar-a8730-default-rtdb.firebaseio.com", // Esto es para Realtime DB, pero no estorba
    projectId: "cinestar-a8730",
    storageBucket: "cinestar-a8730.firebasestorage.app",
    messagingSenderId: "1039213486545",
    appId: "1:1039213486545:web:e4cd29d6b0ec8996ba00f0",
    measurementId: "G-PXWZ1MXBHS"
};

// 3. Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// 4. Exportamos la base de datos Firestore (¡Súper importante!)
export const db = getFirestore(app);