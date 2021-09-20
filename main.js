// Declaro las variables globales
const URLproductos = "data/productos.json";
const productos = [];
const carrito = [];
const categorias = [];

// Productos
class Producto {
    constructor(id, nombre, precio, categoria, img, destacado, cantidad, descripcion) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.categoria = categoria;
        this.img = img;
        this.destacado = destacado;
        this.cantidad = parseInt(cantidad);
        this.descripcion = descripcion;
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
            productos.push(new Producto(producto.id,producto.nombre,producto.precio,producto.categoria,producto.img,producto.destacado,producto.cantidad,producto.descripcion));
            
            categorias.push(producto.categoria)

        }
    }

    // Genero el slider con los productos destacados
    productosDestacadoUI(productos);

    // Genero el filtro de categorias
    filtroCategoriasUI();

    // Genero el catalogo de los productos
    catalogoProductosUI(productos);

});
