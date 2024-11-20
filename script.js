// Define some food items
const foodItems = [
  { name: "Pizza", image: "assets/pizza.jpg", price: 12.99 },
  { name: "Burger", image: "assets/burger.jpg", price: 8.99 },
  { name: "Sushi", image: "assets/sushi.jpg", price: 15.99 },
  { name: "Pasta", image: "assets/pasta.jpg", price: 10.99 },
  { name: "Steak", image: "assets/steak.jpg", price: 34.99 },
  { name: "Meatpie", image: "assets/meatpie.jpg", price: 5.99 },
  { name: "Cheesecake", image: "assets/Cheesecake.jpg", price: 20.99 },
  { name: "Barbecue", image: "assets/barbecue.jpg", price: 14.99 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("menu.html")) {
    loadFoodItems();
  }
  if (window.location.pathname.includes("cart.html")) {
    displayCart();
  }
  if (window.location.pathname.includes("checkout.html")) {
    displayOrderSummary();
  }
});

function loadFoodItems() {
  const foodContainer = document.getElementById("food-container");
  foodItems.forEach((item, index) => {
    const foodItemElement = document.createElement("div");
    foodItemElement.classList.add("food-item");
    foodItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="details">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button onclick="addToCart(${index})">Add to Cart</button>
            </div>
        `;
    foodContainer.appendChild(foodItemElement);
  });
}

// Add food item to cart and update localStorage
function addToCart(index) {
  const item = foodItems[index];

  // Check if the item is already in the cart
  const existingItem = cart.find((cartItem) => cartItem.name === item.name);

  if (existingItem) {
    // If the item is already in the cart, just increase the quantity
    existingItem.quantity++;
  } else {
    // Otherwise, add the item to the cart
    cart.push({ ...item, quantity: 1 });
  }

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Alert the user
  alert(`${item.name} added to cart!`);
}

// Display the cart items on the cart page
function displayCart() {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceElement = document.getElementById("total-price");
  cartContainer.innerHTML = ""; // Clear previous content
  let totalPrice = 0;

  // Loop through the cart items and display them
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
    cartContainer.appendChild(cartItem);
    totalPrice += item.price * item.quantity;
  });

  // Display the total price
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Remove an item from the cart
function removeFromCart(index) {
  // Remove the item from the cart array
  cart.splice(index, 1);

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Refresh the cart page to reflect the changes
  displayCart();
}

// Display the order summary on the checkout page
function displayOrderSummary() {
  const orderDetails = document.getElementById("order-details");
  const totalPriceElement = document.getElementById("total-price");
  let totalPrice = 0;

  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    orderDetails.appendChild(itemElement);
    totalPrice += item.price * item.quantity;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);
}
