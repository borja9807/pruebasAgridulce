// Arreglo para almacenar los productos en el carrito
const cart = [];

// Función para agregar un producto al carrito
function addToCart(productId) {
    // Obtener la información del producto seleccionado
    const selectedSize = document.getElementById(`size-${productId}`).value;
    const productName = document.querySelector(`.product[data-size="${selectedSize}"][data-color="${selectedColor}"] h2`).textContent;
    
    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.productId === productId && item.size === selectedSize);
    
    if (existingItem) {
        alert("El producto ya está en el carrito.");
    } else {
        const availableQuantity = parseInt(document.getElementById(`available-quantity-${productId}`).textContent.match(/\d+/)[0]);

        if (availableQuantity > 0) {
            // Agregar el producto al carrito
            cart.push({
                productId: productId,
                size: selectedSize,
                name: productName,
            });
            alert("Producto agregado al carrito.");
            
            // Actualizar la cantidad disponible
            document.getElementById(`available-quantity-${productId}`).textContent = `Cantidad Disponible: ${availableQuantity - 1}`;
            
            // Renderizar el carrito
            renderCart();
        } else {
            alert("No hay suficiente inventario disponible.");
        }
    }
}

// Función para renderizar el carrito
function renderCart() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;
    
    // Limpiar el contenido del carrito
    cartItemsList.innerHTML = '';
    
    // Mostrar los elementos del carrito
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Talla: ${item.size}`;
        cartItemsList.appendChild(listItem);
        total += getPriceForProduct(item.productId);
    });
    
    // Actualizar el total
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Obtener el precio de un producto por su ID (debes definir esta función)
function getPriceForProduct(productId) {
    // Debes implementar la lógica para obtener el precio del producto por su ID
    // Esto puede involucrar buscar en una base de datos o en algún otro lugar donde tengas la información del precio
    // Retorna el precio del producto
    // Por ejemplo, podrías tener un objeto de productos con precios
    const productPrices = {
        1: 50.0,
        2: 40.0,
        // ...
    };
    
    return productPrices[productId];
}

// Función para alternar la visibilidad del carrito
function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.classList.toggle('cart-visible');
    cartContainer.classList.toggle('cart-hidden');
}

// Resto de tu código JavaScript, incluyendo la lógica de filtros y otros aspectos de la tienda
