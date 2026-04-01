import { db } from './firebase.js';
import { collection, getDocs, query, where, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

export const getPeliculas = async (idEstado) => {
    try {
        const q = query(collection(db, "peliculas"), where("idEstado", "==", idEstado));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error("Error al obtener películas: ", error);
        return null;
    }
};

export const getPeliculaById = async (id) => {
    try {
        const docRef = doc(db, "peliculas", id);
        return await getDoc(docRef);
    } catch (error) {
        console.error("Error al obtener el detalle: ", error);
    }
};
