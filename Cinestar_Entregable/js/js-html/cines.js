import { getCines } from '../firebase/cineGet.js';

const contenedor = document.getElementById('contenido-interno');

const mostrarCines = async () => {
    const datos = await getCines(); 
    let estructura = '<br/><h1>Nuestros Cines</h1><br/>';

    if (datos && !datos.empty) {
        datos.forEach((doc) => {
            const cine = doc.data();
            const nombreFoto = `${doc.id}.1.jpg`; 

            // VALIDACIÓN DE DATOS (Para evitar el undefined)
            const razonSocial = cine.razonSocial || cine.RazonSocial || "Cine Star";
            const direccion = cine.direccion || cine.Direccion || "Dirección no disponible";
            const distrito = cine.distrito || cine.Distrito || "";
            const telefonos = cine.telefonos || cine.Telefonos || "Sin teléfono";

            estructura += `
                <div class="contenido-cine">
                    <img src="img/cine/${nombreFoto}" width="227" height="170" onerror="this.src='img/cine/default.jpg'"/>
                    
                    <div class="datos-cine">
                        <h4>${razonSocial}</h4><br/>
                        <div style="margin-bottom: 15px;">
                            ${direccion} - ${distrito}<br/><br/>
                            Teléfono: ${telefonos}
                        </div>
                        
                        <a href="cine.html?id=${doc.id}">
                            <img src="img/varios/ico-info2.png" width="150" height="40" alt="Ver horarios"/>
                        </a>
                    </div>
                </div>
            `;
        });
    } else {
        estructura += `<p>No se encontraron cines registrados.</p>`;
    }

    contenedor.innerHTML = estructura; 
};

mostrarCines();