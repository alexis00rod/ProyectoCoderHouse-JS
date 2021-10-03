// Funcion para generar el slider con los productos destacados
function productosDestacadoUI(productos) {
    // Busco en el array productos los productos destacados
    let productosDestacados = productos.filter(productos => productos.valoracion > 4.9)

    // Genero el html por cada producto
    for (const producto of productosDestacados) {
        $(".slider-items").append(`<li class="slider-item">
                                    <img src="img/tienda/${producto.img}">
                                    <div class="slider-item__contenido">
                                        <h3>${producto.nombre}</h3>
                                        <div class="slider-item__descripcion">
                                        <p>${producto.descripcion}</p>
                                        <strong>$${producto.precio}</strong>
                                        </div>
                                        <span class="btn__ver-producto" id="${producto.id}">Ver detalles</span>
                                    </div>
                                </li>`)
    }

    // Genero las variables que voy a necesitar para las funciones de los botones
    let sliderItems = $('.slider li').length;
    let sliderPos = 1;

    // Oculto todos los items que hay dentro del slider y muestro solo el primero
    $(".slider li").hide();
    $(".slider li:first").show();

    // Agrego la funcion para el boton de anterior
    $(".btn__slider-left").click(()=>{
        if( sliderPos >= sliderItems){
            sliderPos = 1;
        } else {
            sliderPos++;
        }
        $('.slider li').hide();
        $(`.slider li:nth-child(${sliderPos})`).fadeIn(1000);
    });

    // Agrego la funcion para el boton de siguiente
     $(".btn__slider-right").click(()=>{
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
    $(".catalogo__categorias").prepend(`<li>
                                            <a href="#productos"><span>Todos</span><i class="fas fa-chevron-right"></i></a>
                                        </li>`)
    categoria.forEach(categoria => {
        $(".catalogo__categorias").append(`<li>
                                            <a href="#productos"><span>${categoria}</span><i class="fas fa-chevron-right"></i></a>
                                            </li>`)
    })

    // Genero la funcion para cuando se seleccione una categoria
    $(".catalogo__categorias li").click(filtrarProductos);

    // Genero la funcion para mostrar y ocultar las lista de categorias al dar click en el boton de ver categorias
    $(".btn__ver-categorias").click(()=>{
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

// Funcion para obtener el nuevo producto agregado
function productoNuevoUI(productos) {
    // Busco el ultimo objeto del array productos
    let productoNuevo = productos[productos.length - 1]

    // Genero el html del objeto correspondiente
    $(".catalogo__producto-nuevo").append(`<div class="producto-nuevo__item">
                                            <div class="producto-nuevo__contenido">
                                                <div class="producto-nuevo__titulo">
                                                    <h4>${productoNuevo.nombre}</h4>
                                                    <p>${productoNuevo.categoria}<span><i class="fas fa-star"></i>${productoNuevo.valoracion}</span></p>
                                                </div>
                                                <div class="producto-nuevo__info">
                                                    <p>${productoNuevo.descripcion}</p>
                                                    <strong>$${productoNuevo.precio}</strong>
                                                </div>
                                                <div class="producto-nuevo__botones">
                                                    <a href="" class="btn__agregar" id="${productoNuevo.id}">Agregar al carrito<i class="fas fa-shopping-bag"></i></a>
                                                </div>
                                            </div>
                                            <div class="producto-nuevo__img">
                                                <img src="img/tienda/${productoNuevo.img}" alt="${productoNuevo.nombre}">
                                            </div>
                                        </div>`)
}

// Funcion para ordenar los productos
function ordenProductosUI(productos) {

    $("#ordenar-por").change(()=>{
        if($("#ordenar-por").val() == 1){
            let orden = productos.sort((a,b)=>{
                if(a.valoracion > b.valoracion){
                    return -1
                }
                if(a.valoracion < b.valoracion){
                    return 1
                }
                return 0
            })
    
            $(".catalogo__productos").empty();
            catalogoProductosUI(orden);

        } else if ($("#ordenar-por").val() == 2){
            let orden = productos.sort((a,b)=>{
                if(a.nombre < b.nombre){
                    return -1
                }
                if(a.nombre > b.nombre){
                    return 1
                }
                return 0
            })
    
            $(".catalogo__productos").empty();
            catalogoProductosUI(orden);

        } else if ($("#ordenar-por").val() == 3){
            let orden = productos.sort((a,b)=>{
                if(a.nombre < b.nombre){
                    return 1
                }
                if(a.nombre > b.nombre){
                    return -1
                }
                return 0
            })
    
            $(".catalogo__productos").empty();
            catalogoProductosUI(orden);

        } else if ($("#ordenar-por").val() == 4){
            let orden = productos.sort((a,b)=>{
                if(a.precio > b.precio){
                    return -1
                }
                if(a.precio < b.precio){
                    return 1
                }
                return 0
            })
    
            $(".catalogo__productos").empty();
            catalogoProductosUI(orden);

        } else {
            let orden = productos.sort((a,b)=>{
                if(a.precio > b.precio){
                    return 1
                }
                if(a.precio < b.precio){
                    return -1
                }
                return 0
            })
    
            $(".catalogo__productos").empty();
            catalogoProductosUI(orden);

        }
    })

}

// Funcion para generar el catalogo de productos
function catalogoProductosUI(productos) {
    // Agrego el contador de todos los productos que hay en el catalogo
    $(".contador-catalogo").html(`Mostrando ${productos.length} resultados`);

    // Genero el html del catalogo con todos los productos
    for (const producto of productos) {
        $(".catalogo__productos").append(`<div class="producto-item" id="${producto.id}">
                                            <div class="producto-item__body">
                                                <img src="img/tienda/${producto.img}" alt="${producto.nombre}">
                                                <div class="producto-item__titulo">
                                                    <h4>${producto.nombre}</h4>
                                                    <span><i class="fas fa-star"></i>${producto.valoracion}</span>
                                                </div>
                                            </div>
                                            <div class="producto-item__footer">
                                                <strong>$${producto.precio}</strong>
                                                <span class="btn__ver-producto" id="${producto.id}">Ver detalles</span>
                                            </div>
                                        </div>`);

    }

    // Agrego la funcion para ver detalle del producto
    $(".btn__ver-producto").click(verDetalleProducto);

    // Agrego la funcion para el boton de agregar al carrito
    $(".btn__agregar").click(comprarProducto);

}

// Funcion para ver detalle del producto seleccionado
function verDetalleProducto(e){
    e.preventDefault();

    // Busco el producto en el array productos
    const verProducto = productos.find(producto => producto.id == e.target.id);

    // Se muestra el detalle del producto seleccioando
    $(".producto").show();

    // Funcion para cerrar los detalles del producto
    $(".cerrar-detalle-producto").click(()=>{
        $(".producto").hide();
    })

    // Genero el html con los detalles del producto seleccionado
    $(".producto-detalles").html(`<div class="producto-detalles__body">
                                    <img src="img/tienda/${verProducto.img}" alt="${verProducto.nombre}">
                                    <div class="producto-detalles__contenido">
                                        <div class="producto-detalles__titulo">
                                            <h4>${verProducto.nombre}</h4>
                                        </div>
                                        <p>${verProducto.categoria}<span><i class="fas fa-star"></i>${verProducto.valoracion}</span><p>
                                    </div>
                                </div>
                                <div class="producto-detalles__precio">
                                    <strong>$${verProducto.precio}</strong>    
                                </div>
                                <div class="producto-detalles__footer">
                                    <p>${verProducto.descripcion}</p>    
                                </div>
                                <div class="producto-detalles__botones">
                                <a href="" class="btn__agregar" id="${verProducto.id}">Agregar al carrito<i class="fas fa-shopping-bag"></i></a>    
                                </div>`)

    // Busco productos similares
    const productoSimilares = productos.filter(producto => producto.categoria == verProducto.categoria);

    // Genero el html por cada producto similar
    let productoSimilar = "";
    for (const producto of productoSimilares){
        if(verProducto != producto){
            productoSimilar += `<div class="producto-similar">
                                    <img src="img/tienda/${producto.img}" alt="${producto.nombre}">
                                    <div class="producto-similar__contenido">
                                        <h4>${producto.nombre}</h4>
                                        <p><strong>$${producto.precio}</strong><span><i class="fas fa-star"></i>${producto.valoracion}</spam></p>
                                    </div>
                                </div>`
        }

    }
    $(".productos-similares").html(productoSimilar)

    // Agrego la funcion para el boton de agregar al carrito
    $(".btn__agregar").click(comprarProducto);
    
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
        carritoItem += `<li class="carrito-item">
                            <img src="img/tienda/${producto.img}" alt="">
                            <div class="carrito-item__contenido">
                                <h4>${producto.nombre}</h4>
                                <div class="carrito-item__cantidad">
                                <i class="fas fa-chevron-left btn__restar-cantidad"" id="${producto.id}"></i>
                                <p class="cantidad-contador">${producto.cantidad}</p>
                                <i class="fas fa-chevron-right btn__sumar-cantidad" id="${producto.id}"></i>
                                </div>
                            </div>
                            <strong>$${producto.precio}</strong>
                            <i class="fas fa-trash btn__eliminar-producto" id="${producto.id}"></i>
                        </li>`;
    }

    // Agrego los productos seleccionados al body del carrito
    $(".carrito__productos").html(carritoItem);

    // Genero el html con el contador de productos seleccionados
    $('#btn__carrito p').html(`${cantidadTotalProductos()}`);

    // Agrego la funcion para el boton de restar cantidad
    $(".btn__restar-cantidad").click((e)=>{
        // Busco en el array carrito el producto seleccionado segun su id
        let productoCarrito = carrito.find(producto => producto.id == e.target.id)

        // Acceso el contador de cantidad del producto seleccionado
        let cantidadContador = e.target.parentNode.childNodes[3]

        // Si la cantidad del producto seleccionado es mayor a 1:
        if(productoCarrito.cantidad > 1){
            // Resto 1 a la cantidad del producto
            productoCarrito.controladorCantidad(-1)

            // Actualizo el contador de cantidad
            cantidadContador.innerHTML = productoCarrito.cantidad

            // Actualizo el precio final
            $(".carrito__total .cantidad-productos span").html(`(${cantidadTotalProductos()})`);
            $(".carrito__total .subtotal span").html(`$${precioFinal()}`);
            $(".carrito__total .total span").html(`$${precioFinal() + 350}`);
                
            // Actualizo el contador de la cantidad total de productos en el carrito
            $('#btn__carrito p').html(`${cantidadTotalProductos()}`);

            // Guardo en el localStorange
            localStorage.setItem("carrito", JSON.stringify(carrito));

        }


    })

    // Agrego la funcion para el boton de sumar cantidad
    $(".btn__sumar-cantidad").click((e)=>{
        // Busco en el array carrito el producto seleccionado segun su id
        let productoCarrito = carrito.find(producto => producto.id == e.target.id)
        
        // Sumo 1 a la cantidad del producto
        productoCarrito.controladorCantidad(1);

        // Acceso el contador de cantidad del producto seleccionado
        let cantidadContador = e.target.parentNode.childNodes[3]

        // Actualizo el contador de cantidad
        cantidadContador.innerHTML = productoCarrito.cantidad

        // Actualizo el precio final
        $(".carrito__total .cantidad-productos span").html(`(${cantidadTotalProductos()})`);
        $(".carrito__total .subtotal span").html(`$${precioFinal()}`);
        $(".carrito__total .total span").html(`$${precioFinal() + 350}`);

        // Actualizo el contador de la cantidad total de productos en el carrito
        $('#btn__carrito p').html(`${cantidadTotalProductos()}`);

        // Guardo en el localStorange
        localStorage.setItem("carrito", JSON.stringify(carrito));

    })
    
    // Agrego la funcion para calcular el precio total 
    function precioFinal(){
        let precioFinal = 0;
        carrito.forEach(precio => precioFinal += precio.precioTotal())
        // return precioFinal.toFixed(2);
        return precioFinal;
    }

    // Agrego la funcion para calcular la cantidad de productos seleccionados
    function cantidadTotalProductos(){
        let cantidadTotalProductos = 0;
        carrito.forEach(cantidad => cantidadTotalProductos += cantidad.cantidad)
        return cantidadTotalProductos;
    }

    // Si en el carrito hay mas de 1 producto mostrar el total de la compra
    if(cantidadTotalProductos() >= 1){
        $(".carrito__total .cantidad-productos span").html(`(${cantidadTotalProductos()})`);
        $(".carrito__total .subtotal span").html(`$${precioFinal()}`);
        $(".carrito__total .envio span").html("$350");
        $(".carrito__total .total span").html(`$${precioFinal() + 350}`);
    }
    // Si no hay productos en el carrito no mostrar el total 
    else {
        $(".carrito__productos").html("<p>Tu carrito esta vacio</p>")
        $(".carrito__total .cantidad-productos span").html("");
        $(".carrito__total .subtotal span").html("");
        $(".carrito__total .envio span").html("");
        $(".carrito__total .total span").html("");
    }

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
    $(".btn__finalizar-compra").click(finalizarCompra)

}

// Agrego el contador de notificaciones
let notificaciones = 0;

function finalizarCompra () {
    notificaciones += 1

    // Agrego la notificacion en el boton de notificaciones
    $("#btn__notificacion p").html(notificaciones)

    // Agrego el mensaje de compra finalizada en la seccion notificaciones
    $(".notificaciones-contenido").append("<p>Su compra finalizo con exito, pronto recibiras los productos en la puerta de tu casa. Gracias por elegirnos.</p>")

    // Si hay notificaciones muestro el boton para eliminar los mensajes
    if(notificaciones + 1){
        $(".btn__eliminar-msjs").show();
    }

    // Agrego la funcion del boton para borrar los mensajes
    $(".btn__eliminar-msjs").click(()=>{
        // Borro los html de las notificaciones
        $(".notificaciones-contenido").html("");

        // Restauro a 0 el contador de notifaciones
        notificaciones = 0;

        // Actualizo el contadador de notificaciones del boton
        $("#btn__notificacion p").html(`${notificaciones}`);

        // Oculto el boton para borrar mensajes
        $(".btn__eliminar-msjs").hide();
    })

    // Vacio el carrito
    localStorage.removeItem("carrito");
    carrito.length = 0;
    $("#btn__carrito p").html("0")
    $(".carrito__productos").html("<p>Tu carrito esta vacio</p>");

    $(".carrito__total .cantidad-productos span").html("");
    $(".carrito__total .subtotal span").html("");
    $(".carrito__total .envio span").html("");
    $(".carrito__total .total span").html("");

    // Cierro el carrito
    $(".carrito").toggleClass("mostrar-carrito");
}

// Funcion para el boton de notificaciones
$("#btn__notificacion").click(()=>{
    $("#notificaciones").slideToggle()
})

// Funcion para el boton del menu
$("#btn__menu").click(()=>{
    $(".navbar").toggleClass("mostrar-menu");
})

// Funcion para el boton del carrito
$("#btn__carrito").click(()=>{
    $(".carrito").toggleClass("mostrar-carrito");
    
})

// Funcion para el boton de cerrar el carrito
$(".btn__cerrar-carrito").click(()=>{
    $(".carrito").toggleClass("mostrar-carrito");
})
