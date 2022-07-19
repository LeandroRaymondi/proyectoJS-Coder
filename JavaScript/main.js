// ADICIONAR NUEVO PRODUCTO

class Productos {
    constructor(nombre, categoria, precio, stock){
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
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
    let stock = prompt("¿Cuántos productos del mismo quieres vender?");
    
    let nuevoProducto = new Productos(nombre, categoria, precio, stock);
    listaProductos.push(nuevoProducto);
    console.log(nuevoProducto);
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

const filterPrecio = () => {
    let filterUsuario = parseFloat(prompt("¿Hasta que precio quieres buscar?"));
    let search = listaProductos.filter(producto => producto.precio <= filterUsuario);
    if (search != `undefined`) {
        console.log(search);
    }else console.log(`No se ha encontrado productos en ese rango de precio.`)
}

// ELIMINAR PRODUCTOS

// Esto es algo que me tiene trabado hace bastante jajaja

/* const eliminarProducto = () => {
    let producto = prompt("¿Qué elemento quieres eliminar?");
    let search = listaProductos.find(elemento => elemento.nombre == search);

} */