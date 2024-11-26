// Función para obtener los parámetros de la URL
import { productos } from "./productos.js";

function obtenerParametrosURL() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get('id');
}

// Función para encontrar el producto por ID
function encontrarProducto(id) {
    return productos.find(producto => producto.id === parseInt(id));
}
function mostrarDetalleProducto() {
    debugger;
    const idProducto = obtenerParametrosURL();
    
    const producto = encontrarProducto(idProducto);
    if (!producto) {
        console.error('Producto no encontrado');
        return;
    }

    actualizarInformacionBasica(producto);
    actualizarImagen(producto);
    generarListaMedidas(producto.medidas);
}

function actualizarInformacionBasica(producto) {
    const elementos = {
        categoriaCart: producto.categoria.toUpperCase(),
        tituloCart: producto.titulo,
        precioCart: producto.precio,
        descripcionCart: producto.descripcion
    };

    Object.entries(elementos).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor;
    });
}

function actualizarImagen(producto) {
    const imagenCart = document.getElementById('imagenCart');
    if (imagenCart) {
        imagenCart.src = `../img/${producto.categoria}/${producto.imagen}`;
        imagenCart.alt = producto.titulo;
    }
}

function generarListaMedidas(medidas) {
    const listContainer = document.querySelector('#listaMedidas');
    if (!listContainer) return;

    const iconoSVG = `
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="26" height="26" rx="13" fill="#4F46E5" />
            <path d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                stroke="white" stroke-width="1.6" stroke-linecap="round" />
        </svg>`;

    medidas.forEach(medida => {
        const listItem = document.createElement('li');
        listItem.className = 'flex items-center gap-3';
        listItem.innerHTML = `
            ${iconoSVG}
            <span class="font-normal text-base text-gray-900">${medida}</span>
        `;
        listContainer.appendChild(listItem);
    });
}

function comprarProducto() {
    const idProducto = obtenerParametrosURL();
    const producto = encontrarProducto(idProducto);
    localStorage.setItem('productoComprar', JSON.stringify(producto));
    window.location.href = '../carritoCompra.html';
}

const btnComprarProducto = document.getElementById('btnComprarProducto');
btnComprarProducto.addEventListener('click', comprarProducto);
// Ejecutar cuando se carga la página
document.addEventListener('DOMContentLoaded', mostrarDetalleProducto);