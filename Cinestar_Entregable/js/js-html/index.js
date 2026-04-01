import { getPeliculas } from '../firebase/peliculaGet.js';

const contenedor = document.getElementById('contenido-cartelera');

const cargarCartelera = async () => {
    // Obtenemos las películas con idEstado = 1 (Cartelera)
    const peliculasSnapshot = await getPeliculas(1); 
    
    let html = '';

    // Verificamos que el snapshot exista y no esté vacío antes de recorrerlo
    if (peliculasSnapshot && !peliculasSnapshot.empty) {
        peliculasSnapshot.forEach((doc) => {
            const pelicula = doc.data();

            // Usamos doc.id para la imagen si tus archivos se llaman como el ID (ej: 20.jpg)
            // O mantenemos tu lógica de reemplazar espacios si se llaman como el título
            const nombreImagen = pelicula.Titulo ? pelicula.Titulo.replace(/ /g, "_") : "default";

            html += `
                <div class="peli">
                    <a href="pelicula.html?id=${doc.id}">
                        <img src="img/pelicula/${nombreImagen}.jpg" width="160" height="226" onerror="this.src='img/pelicula/default.jpg'"/><br/><br/>
                    </a>
                    <div class="peli-tit">${pelicula.Titulo || 'Sin título'}</div><br/>
                    <p>${pelicula.Sinopsis ? pelicula.Sinopsis.substring(0, 150) + '...' : 'Sin descripción'}</p>
                    <div class="leer-mas">
                        <a href="pelicula.html?id=${doc.id}">
                            <img src="img/varios/btn-leer-mas.png" width="40" height="15"/>
                        </a>
                    </div>
                </div>
            `;
        });
    } else {
        html = '<p>No hay películas disponibles en cartelera en este momento.</p>';
    }

    contenedor.innerHTML = html;
};

cargarCartelera();