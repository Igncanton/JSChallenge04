/*
    Lista de productos y stock
    Permite agregar productos junto a su stock y eliminarlos juntos también
*/

//función inicializadora
const iniciarApp = () => {

    alert("Bienvenido al gestor de productos, presione ENTER para continuar")

    const listaDeItems = []

    let arrayItems = []

    //Consultar stock
    const consultarStock = () => {
        if (listaDeItems.length >= 1) {
            arrayItems = []

            for (let i = 0; i < listaDeItems.length; i++) {
                let itemNombre = listaDeItems[i].nombre
                let itemStock = listaDeItems[i].stock

                arrayItems.push(` ${itemNombre} stock: ${itemStock}`)
            }

            alert(`Lista de productos: ${arrayItems}`)
        } else {
            alert("No products added yet!, please add some products!")
            consultaOperacion()
        }
    }

    //Standariza los inputs al ingresarlo para facilitar la busqueda luego
    const standarizarPalabra = (palabra) => {
        if (palabra === '') {
            return 'empty'

        } else {
            let nuevaPalabra = palabra.split('')
            nuevaPalabra[0] = nuevaPalabra[0].toUpperCase()
            return nuevaPalabra.join('')
        }
    }

    //Imprimir listado en pantalla
    const printProductos = () => {
        const arrayDeProductos = () => {
            //lee propiedades del objeto listaDeItems y crea sus respectivos elementos
            for (let i = 0; i < listaDeItems.length; i++) {
                const listaContainer = document.getElementById('lista')
                const productoItem = document.createElement('div')
                productoItem.innerHTML = `<p>${listaDeItems[i].nombre}</p>
                <p>${listaDeItems[i].stock}</p>`

                listaContainer.append(productoItem)
            }
        }

        //crea al div contenedor y la estructura en general
        const contenedor = document.createElement('main')
        contenedor.innerHTML = `
        <div class="contenedor">
            <h1 class="titulo">Lista de Productos</h1>
            <div class="categorias">
                <p>Productos</p>
                <p>Unidades</p>
            </div>
            <div id="lista">
            </div>
            <button class="button" onclick="document.location.reload(true)">Reiniciar App</button>
        </div>
        `
        document.body.append(contenedor)
        arrayDeProductos()
    }

    //Consulta que operación se desea realizar
    const consultaOperacion = () => {
        const userInput = parseInt(prompt("Ingrese el numero de la operación a realizar: 1-Consultar Stock 2-Ingresar Producto 3-Eliminar Producto 4-Mostrar en Pantalla 5-Terminar Operación"))

        switch (userInput) {
            case 1:
                // consulta stock
                consultarStock()
                consultaOperacion()
                break;

            case 2:
                // ingresa producto
                const ingresarProductos = () => {
                    const nombreProducto = standarizarPalabra(prompt("Ingrese el nombre de su producto:"))
                    const stockProducto = parseInt(prompt("Ingrese el stock de su producto:"))

                    if (stockProducto === NaN || nombreProducto === 'empty') {
                        alert("Ingrese un nombre y una cantidad válida por favor!")
                        ingresarProductos()
                    } else if (nombreProducto && stockProducto) {
                        //pushea los inputs como objeto al array
                        listaDeItems.push({ nombre: nombreProducto, stock: stockProducto })
                        alert("Producto agregado! presione ENTER para continuar")
                        consultaOperacion()
                    } else {
                        alert("Ingrese valores validos por favor")
                        ingresarProductos()
                    }
                }
                ingresarProductos()
                break;

            case 3:
                //elimina producto
                const inputProductoEliminar = () => {
                    const productoEliminar = standarizarPalabra(prompt("Ingrese el producto a eliminar: "))
                    const busquedaIndexProducto = listaDeItems.findIndex(listaDeItems => listaDeItems.nombre === productoEliminar)
                    if (busquedaIndexProducto !== -1) {
                        listaDeItems.splice(busquedaIndexProducto, 1)
                        alert("producto eliminado")
                        consultaOperacion()
                    } else {
                        alert("please enter a valid name")
                        inputProductoEliminar()
                    }
                }
                inputProductoEliminar()
                break;

            case 4:
                //imprimir en pantalla la lista de productos
                if (listaDeItems.length === 0) {
                    alert("no products added yet! add some products!")
                    consultaOperacion()
                } else {
                    printProductos()
                }
                break;

            case 5:
                //terminar operación
                alert("Operación terminada, sistemas apagados, que tenga un buen dia!")
                break;


            default:
                alert("Ingrese un número de operación válido por favor!")
                consultaOperacion()
                break;
        }
    }
    consultaOperacion()
}

//Inicializacion de la app
iniciarApp()
