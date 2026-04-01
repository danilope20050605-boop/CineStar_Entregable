import { getPeliculaById } from '../firebase/peliculaGet.js';

const contenedor = document.getElementById('contenido-interno');

const detallePelicula = async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const doc = await getPeliculaById(id);
    
    if (doc && doc.exists()) {
        const peli = doc.data();
        
        contenedor.innerHTML = `
            <br/><h1>Película</h1><br/>
            <div class="contenido-pelicula">
                <div class="datos-pelicula">
                    <h2>${peli.Titulo || 'Sin título'}</h2>
                    <p>${peli.Sinopsis || 'Sin descripción'}</p><br/> 
                    <div class="tabla">
                        <div class="fila">
                            <div class="celda-titulo">Estreno :</div>
                            <div class="celda">${peli.FechaEstreno || 'Próximamente'}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Género :</div>
                            <div class="celda">${peli.Generos || '-'}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Director :</div>
                            <div class="celda">${peli.Director || '-'}</div>
                        </div>
                        <div class="fila">
                            <div class="celda-titulo">Reparto :</div>
                            <div class="celda">${peli.Reparto || '-'}</div>
                        </div>
                    </div>
                </div>
                <img src="img/pelicula/${peli.id}.jpg" width="160" height="226" onerror="this.src='img/pelicula/default.jpg'"><br/><br/>
            </div>
            <div class="pelicula-video">
                <iframe width="580" height="400" src="https://www.youtube.com/embed/${peli.Link}" 
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
            </div>`;
    } else {
        contenedor.innerHTML = '<p>No se pudo encontrar la información de la película.</p>';
    }
};

detallePelicula();
