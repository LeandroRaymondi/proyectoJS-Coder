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

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.item');

    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);
}

function updateShoppingCartTotal() {
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );
        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('€', '')
        );
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuantity'
        );
        const shoppingCartItemQuantity = Number(
            shoppingCartItemQuantityElement.value
        );
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}€`;
}

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}
// API.JSON es algo que quiero implementar luego de ver bien el tema fetch, async, etc, por eso está dentro del root
