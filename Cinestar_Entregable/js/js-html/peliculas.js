import { getPeliculas } from '../firebase/peliculaGet.js';

const contenedor = document.getElementById('contenido-interno');

const mostrarPeliculas = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('id'); 
    
    // Cambiamos el número por texto entre comillas para que coincida con tu Firebase
    const estadoABuscar = (tipo === 'estrenos') ? "2" : "1"; 

    const querySnapshot = await getPeliculas(estadoABuscar);
    
    let html = `<br/><h1>${tipo === 'estrenos' ? 'Próximos Estrenos' : 'Cartelera'}</h1><br/>`;

    if (querySnapshot && !querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            const peli = doc.data();
            
            // Usamos peli.Titulo, peli.Sinopsis y peli.Link con la primera letra en mayúscula
            html += `
                <div class="contenido-pelicula">
                    <div class="datos-pelicula">
                        <h2>${peli.Titulo}</h2><br/>
                        <p>${peli.Sinopsis}</p><br/> 
                        <div class="boton-pelicula"> 
                            <a href="pelicula.html?id=${doc.id}">
                                <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                            </a>
                            <a href="https://www.youtube.com/watch?v=${peli.Link}" target="_blank">
                                <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                            </a>
                        </div> 
                    </div>
                    <img src="img/pelicula/${peli.id}.jpg" width="160" height="226"/><br/><br/>
                </div>`;
        });
    } else {
        // Si sale este mensaje, revisa que tus documentos tengan el campo 'idEstado' como número
        html += `<p>No hay películas para mostrar.</p>`;
    }
    contenedor.innerHTML = html;
};

mostrarPeliculas();