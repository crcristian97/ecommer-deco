class Producto {
    constructor(id, imagen, precio, stock, categoria, titulo, subtitulo, descripcion, medidas) {
        this.id = id;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.titulo = titulo;
        this.subtitulo = subtitulo;
        this.descripcion = descripcion;
        this.medidas = medidas;
    }
}

export const productos = [
    new Producto(1, "imagen1.jpg", 100, 10, "exterior", "Silla Exterior", "Resistente al clima"),
    new Producto(2, "imagen2.jpg", 80, 20, "interior", "Silla Interior", "Cómoda y elegante"),
    new Producto(3, "../img/living/sillonLiving.jpg", 150, 5, "living", "Sofá de Living","Espacioso y cómodo", 'Nuestro sillón Dafne ofrece comodidad y sofisticación, gracias a su silueta de líneas limpias y su acolchado asiento con apoyabrazos. Su sólida base de hierro y su tapizado de terciopelo de color blanco ofrecen una experiencia de lujo y comodidad inigualable. Con un diseño atemporal, este mueble se adapta a una variedad de estilos de decoración, desde lo clásico hasta lo contemporáneo. Ideal para sumar a una sala de estar, estudio o dormitorio.', ['Largo: 200 cm', 'Ancho: 90 cm', 'Altura: 85 cm']),
    new Producto(4, "../img/living/sillonLiving.jpg", 150, 5, "living", "Lampara imperbleame","Espacioso y cómodo", 'Nuestro sillón Dafne ofrece comodidad y sofisticación, gracias a su silueta de líneas limpias y su acolchado asiento con apoyabrazos. Su sólida base de hierro y su tapizado de terciopelo de color blanco ofrecen una experiencia de lujo y comodidad inigualable. Con un diseño atemporal, este mueble se adapta a una variedad de estilos de decoración, desde lo clásico hasta lo contemporáneo. Ideal para sumar a una sala de estar, estudio o dormitorio.', ['Largo: 200 cm', 'Ancho: 90 cm', 'Altura: 85 cm']),
    new Producto(5, "../img/living/sillonLiving.jpg", 150, 5, "living", "Silla de madera","Espacioso y cómodo", 'Nuestro sillón Dafne ofrece comodidad y sofisticación, gracias a su silueta de líneas limpias y su acolchado asiento con apoyabrazos. Su sólida base de hierro y su tapizado de terciopelo de color blanco ofrecen una experiencia de lujo y comodidad inigualable. Con un diseño atemporal, este mueble se adapta a una variedad de estilos de decoración, desde lo clásico hasta lo contemporáneo. Ideal para sumar a una sala de estar, estudio o dormitorio.', ['Largo: 200 cm', 'Ancho: 90 cm', 'Altura: 85 cm']),
    new Producto(6, "../img/living/sillonLiving.jpg", 150, 5, "living", "Sofá de Living","Espacioso y cómodo", 'Nuestro sillón Dafne ofrece comodidad y sofisticación, gracias a su silueta de líneas limpias y su acolchado asiento con apoyabrazos. Su sólida base de hierro y su tapizado de terciopelo de color blanco ofrecen una experiencia de lujo y comodidad inigualable. Con un diseño atemporal, este mueble se adapta a una variedad de estilos de decoración, desde lo clásico hasta lo contemporáneo. Ideal para sumar a una sala de estar, estudio o dormitorio.', ['Largo: 200 cm', 'Ancho: 90 cm', 'Altura: 85 cm']),
    new Producto(7, "../img/living/sillonVerdeLiving.jpg", 150, 5, "living", "Sofá de Living","Espacioso y cómodo"),
    new Producto(8, "../img/living/sillonVerdeLiving.jpg", 150, 5, "living", "Sofá de Living","Espacioso y cómodo"),
    new Producto(9, "../img/living/sillonVerdeLiving.jpg", 150, 5, "living", "Sofá de Living","Espacioso y cómodo"),
    new Producto(10, "../img/living/sillonVerdeLiving.jpg", 150, 5, "living", "Sofá de Living","Espacioso y cómodo"),
    new Producto(11, "../img/living/sillonPlanta.jpg", 150, 5, "living", "Sofá de Living","Espacioso y cómodo"),
    new Producto(12, "../img/living/sillonPlanta.jpg", 150, 5, "living", "Sofá de Living","Espacioso y cómodo"),
    new Producto(13, "../img/living/sillonPlanta.jpg", 150, 5, "living", "Sofá de Living","Espacioso y cómodo"),
    new Producto(14, "../img/living/sillonPlanta.jpg", 150, 5, "living", "Sofá de Living","Espacioso y cómodo"),
    new Producto(15, "imagen4.jpg", 200, 8, "comedor", "Mesa de Comedor", "Diseño moderno"),
    new Producto(16, "/img/dormitorio/blurry-bedroom-interior.desing.compress.webp", 300, 4, "dormitorio", "pie de cama", "Diseño moderno"),
    new producto(17, "/img/exteriores/empty-hammock-garden.compress.webp", 200, 5, "exteriores", "Amaga Paraguaya", "Diseño moderno"),
    new producto(18, "/img/interior/modern-wooden-chair-compress.webp", 150, 8, "interior", "silla rigida", "delux"),
    new producto(19, "/img/oficina/still-life-office-chair-indoors-compress.webp", 500, 2, "oficina", "silla de oficina", "premium"),
];

// Filtrar productos por categoría
function filtrarProductos(categoria = '') {
    return productos.filter(producto => producto.categoria === categoria);
}

function obtenerCategoria() {
    const rutaActual = window.location.pathname;
    const categoria = rutaActual.split('/').pop().replace('.html', '');
    return categoria;
}

// Mostrar productos en la página
function mostrarProductos() {
    const categoria = obtenerCategoria();
    const contenedorProductos = document.querySelector(".productos-container");
    const productosFiltrados = filtrarProductos(categoria);

    productosFiltrados.forEach(producto => {
        const productoHTML = `
            <div class="producto" data-id="${producto.id}">
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <h3>${producto.titulo}</h3> 
                <p>${producto.subtitulo}</p>
                <p>$${producto.precio}</p>
            </div>
        `;
        contenedorProductos.innerHTML += productoHTML;
    });

    // Agregar event listeners después de crear los elementos
    document.querySelectorAll('.producto').forEach(producto => {
        producto.addEventListener('click', () => {
            irADetalleProducto(producto.dataset.id);
        });
    });
}

window.irADetalleProducto = function(id) {
    window.location.href = `/components/landingEcommerce/productoOverview.html?id=${id}`;
}

// Ejecutar la función de mostrar productos cuando se carga la página
document.addEventListener("DOMContentLoaded", mostrarProductos);
