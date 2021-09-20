// Funcion para generar el slider con los productos destacados
function productosDestacadoUI(){
    // Filtrado de productos destacados
    let productosDestacados = productos.filter(producto => producto.destacado === "si");
    for (const producto of productosDestacados) {
        $(".slider").append(`<li class="slider-item">
                                <div class="slider-item__img">
                                    <img src="img/tienda/${producto.img}">    
                                </div>
                                <div class="slider-item__info">
                                    <h4>${producto.nombre}</h4>
                                    <strong>$${producto.precio}</strong>
                                    <i class="fas fa-cart-plus btn__agregar" id="${producto.id}"></i>
                                </div>
                            </li>`);
    }

    // Slider de productos destacados
    let sliderItems = $('.slider li').length;
    let sliderPos = 1;
    
    // Oculto todos los items que hay dentro del slider y muestro solo el primero
    $(".slider li").hide();
    $(".slider li:first").show();
    
    // Agrego la funcion para el boton de anterior
    $(".btn__slider--prev").click(()=>{
        if( sliderPos >= sliderItems){
            sliderPos = 1;
        } else {
            sliderPos++;
        }
        $('.slider li').hide();
        $(`.slider li:nth-child(${sliderPos})`).fadeIn(1000);
    });

    // Agrego la funcion para el boton de siguiente
    $(".btn__slider--next").click(()=>{
        if( sliderPos <= 1){
            sliderPos = sliderItems;
        } else {
            sliderPos--;
        }
        $('.slider li').hide();
        $(`.slider li:nth-child(${sliderPos})`).fadeIn(1000);
    });

}

// Funcion para generar el filtro por categorias
function filtroCategoriasUI() {
    // Filtro las categorias
    const categoria = categorias.filter((ele, pos) => categorias.indexOf(ele) == pos)
    
    // Genero el html con cada categoria
    $(".catalogo__categorias").prepend(`<li><span>Todos</span><i class="fas fa-chevron-right"></i></li>`)
    categoria.forEach(categoria => {
        $(".catalogo__categorias").append(`<li><span>${categoria}</span><i class="fas fa-chevron-right"></i></li>`)
    })
    
    // Genero la funcion para cuando se seleccione una categoria
    $(".catalogo__categorias li").click(filtrarProductos);

    // Genero la funcion para mostrar y ocultar las lista de categorias al dar click en el boton de ver categorias
    $(".ver-categorias").click(()=>{
        $(".catalogo__categorias").slideToggle("fast")
    })

}

// Funcion para filtrar los productos por la categoria seleccionada
function filtrarProductos(e){
    e.preventDefault;

        // Vacio el catalogo para mostrar solo los productos filtrados
        $(".catalogo__productos").empty();

        // Filtro los productos del catalogo segun la categoria seleccionada
        let filtro = e.target.textContent;
        const productosFiltrados = productos.filter(producto => producto.categoria === filtro);

        // Genero el html de la categoria seleccionada
        if(filtro == 'Todos'){
            catalogoProductosUI(productos);
        } else {
            catalogoProductosUI(productosFiltrados);
        }

}

// Funcion para generar el catalogo de productos
function catalogoProductosUI(productos) {
    // Agrego el contador de todos los productos que hay en el catalogo
    $(".contador-catalogo").html(`Mostrando ${productos.length} resultados`);

    // Genero el html del catalogo con todos los productos
    for (const producto of productos) {
        $(".catalogo__productos").append(`<div class="producto-item" id="${producto.id}">
                                            <div class="producto-item__img">
                                                <img src="img/tienda/${producto.img}" alt="${producto.nombre}">
                                            </div>
                                            <div class="producto-item--body">
                                                <h4>${producto.nombre}</h4>
                                                <div class="producto-item--head">
                                                    <strong>$${producto.precio}</strong>
                                                    <i class="fas fa-cart-plus btn__agregar" id="${producto.id}"></i>
                                                </div>
                                            </div>
                                        </div>`);

    }

    // Agrego la funcion para ver detalle del producto
    $(".producto-item__img img").click(verDetalleProducto);

    // Agrego la funcion para el boton de agregar al carrito
    $(".btn__agregar").click(comprarProducto);

}

// Funcion para ver detalle del producto seleccionado
function verDetalleProducto(e){
    e.preventDefault();

    // Busco el producto en el array productos
    const verProducto = productos.find(producto => producto.nombre == e.target.alt);

    console.log(verProducto)

    // Se muestra el detalle del producto seleccioando
    $("#producto").show();

    // Funcion para cerrar los detalles del producto
    $(".cerrar-detalle-producto").click(()=>{
        $("#producto").hide();
    })

    // Genero las cuotas para el producto seleccionado
    const precioCuotas12 = verProducto.precio/12;

    // Genero el html con los detalles del producto seleccionado
    $(".producto-detalles").html(`<div class="producto-detalle">
                                    <div class="producto__img">
                                        <img src="img/tienda/${verProducto.img}" alt="${verProducto.nombre}">
                                    </div>
                                    <div class="producto-info">
                                        <div class="producto__nombre"><h4>${verProducto.nombre}</h4></div>
                                        <div class="producto__categoria"><span>${verProducto.categoria}</span></div>
                                        <div class="producto__precio">
                                            <p><strong>$${verProducto.precio}</strong></p>
                                            <p><strong>$${precioCuotas12.toFixed(2)}</strong></p>
                                        </div>
                                        <div class="producto-info__footer">
                                            <p><i class="fas fa-check"></i> Stock disponible</p>
                                            <p><i class="fas fa-shipping-fast"></i> Envios a todo el pais</p>
                                        </div>
                                        <div class="producto-info__descripcion">
                                            <p>${verProducto.descripcion}</p>
                                        </div>
                                    </div>
                                </div>`);

    // Busco productos similares
    const productoSimilares = productos.filter(producto => producto.categoria == verProducto.categoria);

    // Genero el html por cada producto similar
    let productoSimilar = "";
    for (const producto of productoSimilares){
        if(verProducto != producto){
            productoSimilar += `<div class="producto-similar">
                                    <div class="producto-similar__img">
                                        <img src="img/tienda/${producto.img}" alt="${producto.nombre}">
                                    </div>
                                    <div class="producto-similar__info">
                                        <h4>${producto.nombre}</h4>
                                        <p><strong>$${producto.precio}</strong></p>
                                    </div>
                                </div>`
        }

    }
    $(".productos-similares").html(productoSimilar)
    
}

// Funcion para comprar el producto
function comprarProducto(e) {
    e.preventDefault();

    // Obtengo id del producto
    const idProducto = e.target.id;

    // Busco el objeto del producto seleccionado en el array carrito
    const productoSeleccionado = carrito.find(producto => producto.id == idProducto);
 
    if(productoSeleccionado == undefined){
        // Si no se encuentra el producto seleccionado, lo agrego al array carrito
        carrito.push(productos.find(producto => producto.id == idProducto))
    } else {
        // Si se encuentra, sumo 1 a la cantidad del producto
        productoSeleccionado.controladorCantidad(1)
    }

    // Agrego el carrito al localStorange
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Genero el html para los productos seleccionados
    carritoUI();

}

// Funcion para generar el html del carrito
function carritoUI(){
    // Traigo objeto del producto del localStorange
    let carritoLocal = JSON.parse(localStorage.getItem("carrito"));

    // Genero el html de cada producto seleccionado
    let carritoItem = '';
    for (const producto of carritoLocal) {
        carritoItem += `<li class="carrito-item" id="${producto.id}">
                            <div class="item-img">
                                <img src="img/tienda/${producto.img}" alt="">
                            </div>
                            <div class="item-nombre">
                                <h5>${producto.nombre}</h5></td>
                            </div>
                            <div class="item-precio">
                                <strong>$${producto.precio}</strong>
                            </div>
                            <div class="item-cantidad">
                                <i class="fas fa-chevron-left btn__restar-cantidad"" id="${producto.id}"></i>
                                <p class="cantidad-contador">${producto.cantidad}</p>
                                <i class="fas fa-chevron-right btn__sumar-cantidad" id="${producto.id}"></i>
                            </div>
                            <i class="fas fa-trash btn__eliminar-producto" id="${producto.id}"></i>
                        </li>`;
    }

    // Agrego los productos seleccionados al body del carrito
    $(".carrito-body").html(carritoItem);

    // Agrego la funcion para el boton de restar cantidad
    $(".btn__restar-cantidad").click((e)=>{
        // Busco en el array carrito el producto seleccionado segun su id
        let productoCarrito = carrito.find(producto => producto.id == e.target.id)

        // Si la cantidad del producto seleccionado es mayor a 1:
        if(productoCarrito.cantidad > 1){
            // Resto 1 a la cantidad del producto
            productoCarrito.controladorCantidad(-1)

            // Resto 1 en el contador de cantidad
            $(`.cantidad-contador`).html(`${productoCarrito.cantidad}`)
            
            // Actualizo el precio final
            $(".precio-final span").html(`$${precioFinal()}`)

            // Actualizo el contador de la cantidad total de productos en el carrito
            $('#btnCarrito p').html(`${cantidadTotalProductos()}`);

            // Guardo en el localStorange
            localStorage.setItem("carrito", JSON.stringify(carrito));

        }

    })

    // Agrego la funcion para el boton de sumar cantidad
    $(".btn__sumar-cantidad").click((e)=>{
        // Busco en el array carrito el producto seleccionado segun su id
        let productoCarrito = carrito.find(producto => producto.id == e.target.id)
        
        //Sumo 1 a la cantidad del producto
        productoCarrito.controladorCantidad(1);
        $(`.cantidad-contador`).html(`${productoCarrito.cantidad}`)

        // Actualizo el precio final
        $(".precio-final span").html(`$${precioFinal()}`)

        // Actualizo el contador de la cantidad total de productos en el carrito
        $('#btnCarrito p').html(`${cantidadTotalProductos()}`);

        // Guardo en el localStorange
        localStorage.setItem("carrito", JSON.stringify(carrito));

    })
    
    // Agrego la funcion para calcular el precio total 
    function precioFinal(){
        let precioFinal = 0;
        carrito.forEach(precio => precioFinal += precio.precioTotal())
        return precioFinal.toFixed(2);
    }

    // Agrego la funcion para calcular la cantidad de productos seleccionados
    function cantidadTotalProductos(){
        let cantidadTotalProductos = 0;
        carrito.forEach(cantidad => cantidadTotalProductos += cantidad.cantidad)
        return cantidadTotalProductos;
    }

    // Si en el carrito hay mas de 1 producto mostrar el footer del carrito
    if(cantidadTotalProductos() >= 1){
        $(".carrito-footer").html(`<li>
                                    <p class="precio-final">Subtotal: <span>$${precioFinal()}</span></p>
                                </li>
                                <button class="btn__continuar-compra">Comprar</button>`);
    }
    // Si no hay productos en el carrito el footer desaparece 
    else {
        $(".carrito-footer").html("");
    }
    
    // Genero el html con el contador de productos seleccionados
    $('#btnCarrito p').html(`${cantidadTotalProductos()}`);

    // Agrego la funcion para el boton de eliminar producto del carrito
    $(".btn__eliminar-producto").click((e)=>{
        const idProducto = e.target.id

        // Busco en el array carrito la posicion del producto seleccionado segun su id
        let posicionProducto = carrito.findIndex(producto => producto.id == idProducto);

        // Busco en el array carrito el objeto del producto seleccionado segun su id
        let productoObjeto = carrito.find(producto => producto.id == idProducto);

        // Reseteo la cantidad del producto
        productoObjeto.cantidad = 1;

        // Elimino del array carrito el producto seleccionado 
        carrito.splice(posicionProducto, 1);

        // Guardo en el localstorange el nuevo carrito
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Genero el nuevo html
        $(document).ready(function(){
            carritoUI(carrito);
        })

    })

    // Agrego la funcion continuar compra
    $(".btn__continuar-compra").click(()=>{
        // Calculo el descuento del 15% del precio final
        const descuento = precioFinal()*0.15;

        // Genero la variable para el precio final con descuento
        let precioFinalDescontado = 0;

        const envio = 350;

        // Si la cantidad total de productos es mayor a 3 aplico el descuento 
        if(cantidadTotalProductos() >= 3){
            // Al precio final le resto el descuento
            precioFinalDescontado = precioFinal() - descuento;

            $(".carrito-footer").html(`<div class="carrito-finalizacion">
                                        <h4>Resumen de compra</h4>
                                        <ul>
                                            <li><p>Productos: </p><span>(${cantidadTotalProductos()})</span></li>
                                            <li><p>Subtotal: </p><span>$${precioFinal()}</span></li>
                                            <li><p>Descuento del 15%: </p><span>$${descuento}</span></li>
                                            <li><p>Envio: </p><span>${envio}</span></li>
                                            <li><p>Total: </p><span>$${precioFinalDescontado + envio}</span></li>
                                        </ul>
                                        <button class="btn__cancelar-compra">Cancelar compra</button>
                                        <button class="btn__finalizar-compra">Finalizar compra</button>
                                    </div>`);
        } 
        // Si la cantidad total no es mayor a 3 no aplicar descuento
        else {
            precioFinalDescontado = precioFinal();

            $(".carrito-footer").html(`<div class="carrito-finalizacion">
                                    <h4>Resumen de compra</h4>
                                    <ul>
                                        <li><p>Productos: </p><span>(${cantidadTotalProductos()})</span></li>
                                        <li><p>Subtotal: </p><span>$${precioFinal()}</span></li>
                                        <li><p>Envio: </p><span>${envio}</span></li>
                                        <li><p>Total: </p><span>$${precioFinalDescontado + envio}</span></li>
                                    </ul>
                                    <button class="btn__cancelar-compra">Cancelar compra</button>
                                    <button class="btn__finalizar-compra">Finalizar compra</button>
                                </div>`);
        
        }       

        // Agrego la funcion para el boton de cancelar compra
        $(".btn__cancelar-compra").click(cancelarCompra)

        // Agrego la funcion para el boton de finalizar compra
        $(".btn__finalizar-compra").click(finalizarCompra)

    })

}

// Funcion para el boton del menu
$("#btnMenu").click(()=>{
    $("nav ul").toggleClass("show");
})

// Funcion para para cerrar el menu al presionar un link
$("nav ul li a").click(()=>{
    $("nav ul").toggleClass("show");
})

// Funcion para el boton del carrito
$("#btnCarrito").click(()=>{
    // $(".carrito").toggleClass("show");
    $("#banner").hide();
    $("#catalogo").hide();
    $(".carrito").show();
    
})

// Funcion para el boton de cerrar el carrito
$(".btn__cerrar-carrito").click(()=>{
    // $(".carrito").toggleClass("show");
    $("#banner").show();
    $("#catalogo").show();
    $(".carrito").hide();
})

// Funcion para mostrar elementos al hacer scroll
// $(document).scroll(()=>{
//     let scroll = $(document).scrollTop();

//     if(scroll > 200){
//         $(".producto-item").fadeIn(1000)
//     }
// })