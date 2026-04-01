import { db } from './firebase.js';
import { 
    collection, 
    getDocs, 
    query, 
    where, 
    doc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// 1. Obtener todos los cines (para cines.html)
export const getCines = async () => {
    try {
        const cinesCol = collection(db, "cines");
        const querySnapshot = await getDocs(cinesCol);
        return querySnapshot;
    } catch (error) {
        console.error("Error al obtener los cines: ", error);
        return null;
    }
};

// 2. Obtener el detalle de un cine por su ID (para cine.html)
export const getCineById = async (id) => {
    try {
        const docRef = doc(db, "cines", id);
        return await getDoc(docRef);
    } catch (error) {
        console.error("Error al obtener el detalle del cine: ", error);
        return null;
    }
};

// 3. Obtener las TARIFAS de un cine (Usando la colección cinetarifas de tu imagen)
export const getTarifasByCine = async (idCine) => {
    try {
        // Importante: idCine debe coincidir con el valor en Firestore (ej: "2")
        const q = query(collection(db, "cinetarifas"), where("idCine", "==", idCine));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error("Error al obtener las tarifas: ", error);
        return null;
    }
};