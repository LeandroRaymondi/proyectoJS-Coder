// ADICIONAR NUEVO PRODUCTO

class Productos {
    constructor(nombre, categoria, precio, stock) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = (precio);
        this.stock = (stock);
    }

    comprar(cantidad) {
        if (this.stock >= cantidad) {
            this.stock = this.stock - cantidad;
            console.log(`quedan ${this.stock}`)
        } else {
            alert(`No tenemos esa cantidad de stock, quedan ${this.stock}`);
        }
        return this.stock;
    }

    cargarStock(cantidad) {
        this.stock = this.stock + cantidad;
        //Agregar un return de true or false, para tener respuesta de la función y ver si se cargó bien el stock
    }
}

const listaProductos = [
    { nombre: "topcoat", categoria: "esmaltes", precio: 1200, stock: 10 },
    { nombre: "esmalte meline", categoria: "esmaltes", precio: 890, stock: 35 },
    { nombre: "torno", categoria: "manicura", precio: 11999, stock: 10 },
    { nombre: "cabina", categoria: "manicura", precio: 4500, stock: 10 },
    { nombre: "lima", categoria: "manicura", precio: 100, stock: 50 },
    { nombre: "repujador", categoria: "manicura", precio: 150, stock: 15 }
]

const agregarProducto = () => {
    let nombre = prompt("¿Cuál es el nombre del producto?");
    let categoria = prompt("¿De qué categoría es el producto?");
    let precio = parseFloat(prompt("¿Cuál es el precio que quieres asignarle a tu producto?"));
    let stock = parseInt(prompt("¿Cuántos productos del mismo quieres vender?"));
    if ((typeof precio === 'number') && (typeof stock === 'number')) {
        let nuevoProducto = new Productos(nombre, categoria, precio, stock);
        listaProductos.push(nuevoProducto);
        console.log(listaProductos);
    } else {
        alert(`Los datos ingresados no son números. Vuelve a ingresarlos.`);
    }
}

// LISTA DE STOCK + IVA
const stockIva = listaProductos.map((producto) => {
    return {
        nombre: producto.nombre,
        categoría: producto.categoria,
        precio: producto.precio * 1.21,
        stock: producto.stock
    }
}
)

// FILTRO PRECIOS
let menorMayor = document.querySelector(".filterPrecio");

const filterPrecio = () => {
    let filterUsuario = parseFloat(prompt("¿Hasta que precio quieres buscar?"));
    let search = listaProductos.filter(producto => producto.precio <= filterUsuario);
    if (search != `undefined`) {
        console.log(search);
    } else console.log(`No se ha encontrado productos en ese rango de precio.`);
}

menorMayor.addEventListener("click", filterPrecio);

//CAMBIAR TITULO
let cambiarTitulo = document.querySelector(".cambiarTitulo");

cambiarTitulo.addEventListener("click", () => {
    let titulo = document.querySelector(".titulo");
    titulo.innerHTML = (prompt("¿Cuál es el título que quieres colocar?"));
    return titulo.innerText
})

//CARRITO 1.0

const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        pintarCarrito();
    }
})

cards.addEventListener("click", e => { addCarrito(e); });

items.addEventListener("click", e => { btnAccion(e); });

// Get Products
const fetchData = async () => {
    try {
        const rest = await fetch("api.json");
        const data = await rest.json();
        pintarCard(data);
    } catch (error) {
        console.log(error);
    }
}

// Paint Products
const pintarCard = data => {
    data.forEach(producto => {
        templateCard.querySelector(".card-title").textContent = producto.nombre;
        templateCard.querySelector(".card-price").textContent = producto.precio;
        templateCard.querySelector(".card-img-top").setAttribute("src", producto.thumbnaiUrl);
        templateCard.querySelector(".card-btn").dataset.id = producto.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    cards.appendChild(fragment);
}

// Add to Cart
const addCarrito = e => {
    if (e.target.classList.contains("card-btn")) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
}

const setCarrito = objeto => {

    const producto = {
        id: objeto.querySelector(".card-btn").dataset.id,
        title: objeto.querySelector(".card-title").textContent,
        precio: objeto.querySelector(".card-price").textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = { ...producto };
    pintarCarrito();
}

const pintarCarrito = () => {
    items.innerHTML = ``
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad;
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })
    items.appendChild(fragment);
    pintarFooter();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const pintarFooter = () => {
    footer.innerHTML = ``;
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito Vacío</th>
        `
        return
    };

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)

    templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
    templateFooter.querySelector("span").textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById("vaciar-carrito");
    btnVaciar.addEventListener("click", () => {
        
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡El carrito ha sido vaciado!',
            showConfirmButton: false,
            timer: 1500
        })

        carrito = {};
        pintarCarrito();
    })
}

const btnAccion = e => {

    if (e.target.classList.contains("btn-info")) {

        const producto = carrito[e.target.dataset.id];

        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1;
        carrito[e.target.dataset.id] = { ...producto };

        pintarCarrito();

        Toastify({
            text: `Se añadió un ${producto.title} mas al carrito`,
            duration: 1500,
            style: {background:"#e8e8e8", color:"black"},
            close: true
        }).showToast();
    }

    if (e.target.classList.contains("btn-danger")) {

        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;

        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }

        pintarCarrito();

        Toastify({
            text: `Se eliminó un ${producto.title} del carrito`,
            duration: 1500,
            style: {background:"#e8e8e8", color:"black"},
            onClick: () => {close: true}
        }).showToast();
    
    e.stopPropagation();
}}
