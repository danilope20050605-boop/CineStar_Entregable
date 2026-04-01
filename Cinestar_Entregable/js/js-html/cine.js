import { db } from '../firebase/firebase.js'; 
import { collection, getDocs, doc, getDoc, query, where } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const contenedor = document.getElementById('contenido-interno');
const urlParams = new URLSearchParams(window.location.search);
const idCine = urlParams.get('id');

const cargarDetalleCine = async () => {
    if (!idCine) return;

    try {
        const cineSnap = await getDoc(doc(db, "cines", idCine));
        if (!cineSnap.exists()) return;
        const cine = cineSnap.data();

        contenedor.innerHTML = `
            <br/><h1>Nuestros Cines</h1><br/>
            <div class="cine-info">
                <div class="datos">
                    <h2>${cine.RazonSocial || cine.razonSocial}</h2>
                    <p>${cine.Direccion || cine.direccion} - ${cine.Distrito || cine.distrito}</p>
                    <p>Teléfono: ${cine.Telefonos || cine.telefonos}</p>
                    <br/>
                    <p>Tarifas:</p>
                    <div id="contenedor-tarifas"></div>
                </div>
                
                <img src="img/cine/${idCine}.1.jpg" width="227" height="170" onerror="this.src='img/cine/default.jpg'"/>
                
                <div class="bloque-peliculas" style="clear: both; width: 100%; padding-top: 20px;">
                    <p>Películas:</p>
                    <div id="contenedor-peliculas" class="peliculas"></div>
                </div>

                <div class="aviso" style="clear: both; margin-top: 10px;">
                    <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente...</p>
                    <p><b>Los horarios de cada función están sujetos a cambios sin previo aviso.</b></p>
                </div>
            </div>
            
            <div class="cine-juegos">
                <p>Precios de los juegos: desde S/1.00 en todos los Cine Star.</p>
                <p>Horario de atención de juegos es de 12:00 m hasta las 10:30 pm.</p>
                <img src="img/cine/cine_arcade.jpg" width="300" height="200" alt="Juegos"/>
            </div>
        `;

        // 2. Cargar Tarifas - Cambio de lugar y alineación de textos
        const tSnap = await getDocs(query(collection(db, "cinetarifas"), where("idCine", "==", idCine)));
        let hT = `<div class="celda-cabecera" style="width:60%; display:inline-block;">Días</div><div class="celda-cabecera" style="width:38%; display:inline-block; text-align:center;">Precio</div>`;
        
        tSnap.forEach((d, i) => {
            const t = d.data();
            const clase = (i % 2 !== 0) ? "impar" : "";
            // Eliminamos floats y usamos flex para mantener el texto en su lugar
            hT += `<div class="${clase}" style="display:flex; width:100%; clear:both; border-bottom: 1px solid #fff;">
                <div class="celda-titulo" style="width:60%; float:none; margin:0; padding:5px;">${t.DiasSemana}</div>
                <div class="celda" style="width:40%; float:none; margin:0; padding:5px; text-align:center;">S/. ${t.Precio}</div>
            </div>`;
        });
        document.getElementById('contenedor-tarifas').innerHTML = hT;

        // 3. Cargar Películas - Cambio de lugar y alineación de textos
        const cpSnap = await getDocs(query(collection(db, "cinepeliculas"), where("idCine", "==", idCine)));
        let hP = `
            <div class="celda-cabecera" style="width: 40%; display: inline-block;">Películas</div>
            <div class="celda-cabecera" style="width: 58%; display: inline-block;">Horarios</div>
        `;

        const promesas = cpSnap.docs.map(async (docPeli, i) => {
            const relacion = docPeli.data();
            const peliSnap = await getDoc(doc(db, "peliculas", relacion.idPelicula));
            const nombrePeli = peliSnap.exists() ? peliSnap.data().Titulo : "Película";
            const clase = (i % 2 !== 0) ? "impar" : "";

            // Cambiamos la estructura para que el nombre y horario no se mezclen
            return `
                <div class="${clase}" style="display:flex; width:100%; clear:both; border-bottom: 1px solid #fff; align-items:center;">
                    <div class="celda-titulo" style="width: 40%; float:none; margin:0; padding:8px;">${nombrePeli}</div>
                    <div class="celda" style="width: 60%; float:none; margin:0; padding:8px;">${relacion.Horarios}</div>
                </div>`;
        });

        const filasPelis = await Promise.all(promesas);
        document.getElementById('contenedor-peliculas').innerHTML = hP + filasPelis.join('');

    } catch (e) { console.error(e); }
};

cargarDetalleCine();