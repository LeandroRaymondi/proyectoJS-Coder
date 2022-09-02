// ADICIONAR NUEVO PRODUCTO

// Crear la función agregarProducto que mediante los promps obtenga el nombre, categoria, precio, stock 
// y que el ID se haga haciendo una lectura de api.JSON y sumandole ++ (uno) al máximo ID registrado,
// la función de agregarProducto además tiene que volver a pintar las cartas de productos en el index, obviamente agregando el nuevo producto ingresado
// esta función además va a tener otra función adentro que va a escribir el nuevo objeto creado dentro de api.JSON
class Productos {
    constructor(id, nombre, categoria, precio, stock, thumbnaiUrl) {
        this.id = (id);
        this.nombre = (nombre);
        this.categoria = (categoria);
        this.precio = (precio);
        this.stock = (stock);
        this.thumbnaiUrl = (thumbnaiUrl);
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
}

const addProduct = document.querySelector(".addProduct");

const agregarProducto = (data) => {
    let id = 7 ;
    let nombre = prompt("¿Cuál es el nombre del producto?");
    let categoria = prompt("¿De qué categoría es el producto?");
    let precio = parseFloat(prompt("¿Cuál es el precio que quieres asignarle a tu producto?"));
    let stock = parseInt(prompt("¿Cuántos productos del mismo quieres vender?"));

    if ((typeof precio === 'number') && (typeof stock === 'number')) {
        let nuevoProducto = new Productos(id, nombre, categoria, precio, stock, thumbnaiUrl);
        fetch ("api.json", {
            method: "POST",
            headers: {'content-type':'application/json; charset=UTF-8'},
            body: JSON.stringify(nuevoProducto)
        })
        .then(JSON.stringify(nuevoProducto))
    } else {
        alert(`Los datos ingresados no son números. Vuelve a ingresarlos.`);
    }
}

addProduct.addEventListener("click", () => {
    agregarProducto();
});

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
const fetchData = async (palabra = '', ) => {
    try {
        const rest = await fetch("api.json");
        const data = await rest.json();
        (palabra) ? (filterPrecio(data, palabra))(pintarCard(fillData)) : (pintarCard(data));
    } catch (error) {
        console.log(error);
    }
}

// Paint Products
const pintarCard = data => {
    cards.innerHTML = ''
    data.forEach(producto => {
        templateCard.querySelector(".card-img-top").setAttribute("src", producto.thumbnaiUrl);
        templateCard.querySelector(".card-title").textContent = producto.nombre;
        templateCard.querySelector(".card-price").textContent = producto.precio;
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

    Toastify({
        text: `Se añadió ${producto.title} al carrito`,
        duration: 1500,
        style: { background: "#93c4ef", color: "black" },
        close: true
    }).showToast();
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
            style: { background: "#93c4ef", color: "black" },
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
            style: { background: "#93c4ef", color: "black" },
        }).showToast();

        e.stopPropagation();
    }
}

// FILTRO PRECIOS
let menorMayor = document.querySelector(".search_box");
let fillData = {}

const filterPrecio = (data, palabra) => {
    fillData = Array.from(data.filter(word => word.nombre.toLowerCase().indexOf(palabra) > -1));
}

menorMayor.addEventListener("change", e => {
    fetchData(e.target.value)
});