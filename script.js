const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Render product list
function renderProducts() {
    products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>`;
        productList.appendChild(li);
    });
}

// Render cart list
function renderCart() {
    cartList.innerHTML = '';  // Clear the cart display

    const data = JSON.parse(sessionStorage.getItem('cart')) || [];
    data.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button onclick="removeFromCart(${product.id})">Remove from Cart</button>`;
        cartList.appendChild(li);
    });
}

// Add item to cart
function addToCart(productId) {
    const data = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    const product = products.find(p => p.id === productId);
    if (product) {
        data.push(product);  // Add product to cart array
        sessionStorage.setItem('cart', JSON.stringify(data));  // Update sessionStorage
        console.log("After adding product:", data);  // Debugging statement
    }

    renderCart();  // Re-render cart to display updated items
}

// Remove item from cart
function removeFromCart(productId) {
    let data = JSON.parse(sessionStorage.getItem('cart')) || [];
    data = data.filter(product => product.id !== productId);  // Remove product by ID
    sessionStorage.setItem('cart', JSON.stringify(data));  // Update sessionStorage
    renderCart();  // Re-render cart after removal
}

// Clear cart
function clearCart() {
    sessionStorage.clear();  // Clear sessionStorage
    renderCart();  // Re-render cart after clearing
}

// Event listener for clearing the cart
document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

// Initial render of products and cart
renderProducts();
renderCart();
