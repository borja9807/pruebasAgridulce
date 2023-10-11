// Selección de elementos
// Objeto para mantener un registro del inventario por tallas y productos
const inventory = {
    1: {
        S: 5,
        M: 15,
        L: 20,
        XL: 5
    },
    2: {
        S: 5,
        M: 7,
        L: 10,
        XL: 3
    }
};
const cartContent = document.getElementById('cart-content');
const cartContainer = document.getElementById('cart-container');
const cartButton = document.getElementById('cart-button');
const closeCartButton = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const modal = document.querySelector('.modal');


// Arreglo para almacenar los productos en el carrito
const cart = [];

// Mostrar el carrito
cartButton.addEventListener('click', () => {
    modal.classList.add('active');
    
});

// Ocultar el carrito
closeCartButton.addEventListener('click', () => {
    modal.classList.remove('active');
});

window.onclick = (event) => {
    const outModal = document.querySelector('.modal.active');

    if(event.target === outModal) {
        outModal.classList.remove('active');
    }
}


// Función para agregar un producto al carrito
function addToCart(productId) {
    const product = document.querySelector(`#cart-item-${productId}`);
    if (product) {
        alert("El producto ya está en el carrito.");
    } else {
        const productName = document.querySelector(`#product-${productId} h2`).textContent;
        const selectedSize = document.querySelector(`#product-${productId} #size-${productId}`);
        const size = selectedSize.value;
        const availableQuantity = inventory[productId][size];
        
        if (availableQuantity > 0) {
            const cartItems = document.getElementById("cart-items");
            const listItem = document.createElement("li");
            listItem.textContent = `${productName} - Talla: ${size}`;
            listItem.id = `cart-item-${productId}`;
            cartItems.appendChild(listItem);
            alert("Producto agregado al carrito.");
            
            // Actualiza el inventario después de agregar al carrito
            inventory[productId][size] -= 1;
            document.getElementById(`available-quantity-${productId}`).textContent = `Cantidad Disponible: ${inventory[productId][size]}`;
        } else {
            alert("No hay suficiente inventario disponible.");
        }
        
    }   
}

// Obtén los elementos necesarios
const openTabButton = document.getElementById('open-tab-button');
const tabContent = document.getElementById('tab-content');

// Agrega un evento clic al botón
openTabButton.addEventListener('click', () => {
    // Alterna la visibilidad de la pestaña
    tabContent.classList.toggle('hidden');
});

// Función para renderizar el carrito
function renderCart() {
    // Limpia la lista de elementos del carrito
    cartItemsList.innerHTML = '';

    // Calcula el total
    let total = 0;

    // Recorre los productos en el carrito
    cart.forEach((product) => {
        // Actualiza el total
        total += product.price;

        // Crea un elemento de lista para el producto
        const cartItem = document.createElement('li');
        cartItem.textContent = product.name + ' - $' + product.price.toFixed(2);
        cartItemsList.appendChild(cartItem);
    });

    // Actualiza el total en el carrito
    cartTotal.textContent = '$' + total.toFixed(2);
}

// Ejemplo de agregar productos al carrito
const product1 = { name: 'Product-1', price: 50.0 };
const product2 = { name: 'Product-2', price: 40.0 };

addToCart(product1);
addToCart(product2);

// Función para aplicar los filtros
function applyFilters() {
    const selectedColors = Array.from(document.querySelectorAll('input[type="checkbox"][id^="filter-color-"]:checked')).map(input => input.id.replace("filter-color-", ""));
    const selectedSizes = Array.from(document.querySelectorAll('input[type="checkbox"][id^="filter-size-"]:checked')).map(input => input.id.replace("filter-size-", ""));
    
    // Aplicar lógica de filtro aquí, por ejemplo, mostrar/ocultar productos basados en las selecciones
    // Puedes ocultar productos que no coincidan con los colores o tallas seleccionados
    
    // Ejemplo: Ocultar productos sin colores o tallas seleccionados
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productColor = product.getAttribute('data-color');
        const productSize = product.getAttribute('data-size');
        
        if (
            (selectedColors.length === 0 || selectedColors.includes(productColor)) &&
            (selectedSizes.length === 0 || selectedSizes.includes(productSize))
        ) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Agregar event listeners para los filtros
const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});
