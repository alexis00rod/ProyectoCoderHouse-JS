// Declaro las variables globales
const URLproductos = "data/productos.json";
const productos = [];
const carrito = [];
const categorias = [];

// Productos
class Producto {
    constructor(id, nombre, precio, categoria, img, cantidad, descripcion, valoracion) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.categoria = categoria;
        this.img = img;
        this.cantidad = parseInt(cantidad);
        this.descripcion = descripcion;
        this.valoracion = valoracion;
    }
    controladorCantidad(unidad){
        this.cantidad += unidad;
    }
    precioTotal() {
        return this.cantidad * this.precio;
    }

}

$.get(URLproductos, function(datos, estado){
    if(estado == "success") {
        for(const producto of datos){
            productos.push(new Producto(producto.id,producto.nombre,producto.precio,producto.categoria,producto.img,producto.cantidad,producto.descripcion,producto.valoracion));
            
            categorias.push(producto.categoria)

        }
    }

    // Genero el slider con los productos destacados
    productosDestacadoUI(productos);

    // Genero el filtro de categorias
    filtroCategoriasUI();

    // Genero un banner con el ultimo producto agregado
    productoNuevoUI(productos);

    // Genero el select para ordenar los productos
    ordenProductosUI(productos);

    // Genero el catalogo de los productos
    catalogoProductosUI(productos);


});



