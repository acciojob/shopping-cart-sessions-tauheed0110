// Sample product data
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
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render the list of products on the page
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render the cart list
function renderCart() {
  // Clear the cart list in the UI
  cartList.innerHTML = '';

  // Get the cart data from sessionStorage
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  // If there are items in the cart, render them
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button onclick="removeFromCart(${product.id})">Remove from Cart</button>`;
    cartList.appendChild(li);
  });
}

// Add a product to the cart
function addToCart(productId) {
  // Get current cart from sessionStorage (or initialize an empty array if not found)
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  // Find the selected product from the product list
  const product = products.find((p) => p.id === productId);
  if (product) {
    // Add the product to the cart array
    cart.push(product);
    // Store the updated cart array in sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  // Re-render the cart to show the updated data
  renderCart();
}

// Remove a product from the cart
function removeFromCart(productId) {
  // Get current cart from sessionStorage
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  // Filter out the product to be removed by id
  cart = cart.filter((product) => product.id !== productId);

  // Update the sessionStorage with the new cart data
  sessionStorage.setItem('cart', JSON.stringify(cart));

  // Re-render the cart to show the updated data
  renderCart();
}

// Clear the entire cart
function clearCart() {
  // Clear sessionStorage
  sessionStorage.removeItem('cart');
  
  // Re-render the cart to show an empty cart
  renderCart();
}

// Attach event listener for clearing the cart
clearCartBtn.addEventListener("click", clearCart);

// Initial render of products and cart (including any data from sessionStorage)
renderProducts();
renderCart();
