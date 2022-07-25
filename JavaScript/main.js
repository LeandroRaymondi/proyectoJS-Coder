// ADICIONAR NUEVO PRODUCTO

class Productos {
    constructor(nombre, categoria, precio, stock){
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = (precio);
        this.stock = (stock);
    }

    comprar(cantidad) {
        if (this.stock >= cantidad) {
            this.stock = this.stock - cantidad;
            console.log(`quedan ${this.stock}`)
        }else{
            alert(`No tenemos esa cantidad de stock, quedan ${this.stock}`)
        }
        return this.stock;
    }

    cargarStock(cantidad) {
        this.stock = this.stock + cantidad;
        //Agregar un return de true or false, para tener respuesta de la función y ver si se cargó bien el stock
    }
}

const listaProductos = [
    {nombre: "topcoat", categoria: "esmaltes", precio: 1200, stock: 10},
    {nombre: "esmalte", categoria: "esmaltes", precio: 890, stock: 35},
    {nombre: "torno", categoria: "manicura", precio: 11999, stock: 10},
    {nombre: "cabina", categoria: "manicura", precio: 4500, stock: 10},
    {nombre: "lima", categoria: "manicura", precio: 100, stock: 50},
    {nombre: "repujador", categoria: "manicura", precio: 150, stock: 15}
]

const agregarProducto = () => {
    let nombre = prompt("¿Cuál es el nombre del producto?");
    let categoria = prompt("¿De qué categoría es el producto?");
    let precio = parseFloat(prompt("¿Cuál es el precio que quieres asignarle a tu producto?"));
    let stock = parseInt(prompt("¿Cuántos productos del mismo quieres vender?"));
    if ((typeof precio === 'number') && ( typeof stock === 'number')){
            let nuevoProducto = new Productos(nombre, categoria, precio, stock);
            listaProductos.push(nuevoProducto);
            console.log(listaProductos);
    } else {
        alert(`Los datos ingresados no son números. Vuelve a ingresarlos.`)
    }
}

// LISTA DE STOCK + IVA
const stockIva = listaProductos.map((producto) => {return {
        nombre: producto.nombre,
        categoría: producto.categoria,
        precio: producto.precio * 1.21,
        stock: producto.stock 
    }}
    )

// FILTRO PRECIOS
let menorMayor = document.querySelector(".filterPrecio");

const filterPrecio = () => {
    let filterUsuario = parseFloat(prompt("¿Hasta que precio quieres buscar?"));
    let search = listaProductos.filter(producto => producto.precio <= filterUsuario);
    if (search != `undefined`) {
        console.log(search);
    }else console.log(`No se ha encontrado productos en ese rango de precio.`)
}

menorMayor.addEventListener("click", filterPrecio);

//Cambiar titulo
let cambiarTitulo = document.querySelector(".cambiarTitulo");

cambiarTitulo.addEventListener("click", () => {
    let titulo = document.querySelector(".titulo");
    titulo.innerHTML = (prompt("¿Cuál es el título que quieres colocar?"))
    return titulo.innerText
})

// ELIMINAR PRODUCTOS

// Buscar la manera de hacer esta funcion, filter, find y recortar el index, etc.