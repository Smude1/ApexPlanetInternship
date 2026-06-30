const products = [
	{ id: 1, name: "Nova Wireless Headphones", category: "Electronics", price: 89.99, rating: 4.8, image: "images/electronics.svg", alt: "Wireless headphones" },
	{ id: 2, name: "Pulse Bluetooth Speaker", category: "Electronics", price: 59.99, rating: 4.6, image: "images/electronics.svg", alt: "Bluetooth speaker" },
	{ id: 3, name: "Smart Watch X2", category: "Electronics", price: 129.99, rating: 4.9, image: "images/electronics.svg", alt: "Smart watch" },
	{ id: 4, name: "Urban Hoodie", category: "Clothing", price: 49.99, rating: 4.7, image: "images/clothing.svg", alt: "Hoodie" },
	{ id: 5, name: "Classic Denim Jacket", category: "Clothing", price: 74.99, rating: 4.5, image: "images/clothing.svg", alt: "Denim jacket" },
	{ id: 6, name: "Everyday T-Shirt Pack", category: "Clothing", price: 34.99, rating: 4.4, image: "images/clothing.svg", alt: "T-shirt pack" },
	{ id: 7, name: "Runner Pro Sneakers", category: "Shoes", price: 79.99, rating: 4.8, image: "images/shoes.svg", alt: "Sneakers" },
	{ id: 8, name: "Trail Comfort Shoes", category: "Shoes", price: 94.99, rating: 4.7, image: "images/shoes.svg", alt: "Trail shoes" },
	{ id: 9, name: "City Street Trainers", category: "Shoes", price: 69.99, rating: 4.5, image: "images/shoes.svg", alt: "Street trainers" },
	{ id: 10, name: "Minimal Leather Watch", category: "Accessories", price: 119.99, rating: 4.9, image: "images/accessories.svg", alt: "Watch" },
	{ id: 11, name: "Travel Backpack", category: "Accessories", price: 54.99, rating: 4.6, image: "images/accessories.svg", alt: "Backpack" },
	{ id: 12, name: "Aero Sunglasses", category: "Accessories", price: 39.99, rating: 4.3, image: "images/accessories.svg", alt: "Sunglasses" }
];

const appState = {
	searchTerm: "",
	category: "all",
	sortBy: "default"
};

const cartStorageKey = "techstore-cart";
let cart = loadCart();

const productGrid = document.getElementById("productGrid");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");
const cartItems = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");
const clearCartButton = document.getElementById("clearCart");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

function formatPrice(price) {
	return price.toLocaleString("en-US", {
		style: "currency",
		currency: "USD"
	});
}

function loadCart() {
	const savedCart = localStorage.getItem(cartStorageKey);

	if (!savedCart) {
		return [];
	}

	try {
		return JSON.parse(savedCart);
	} catch (error) {
		return [];
	}
}

function saveCart() {
	localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function getFilteredProducts() {
	const searchValue = appState.searchTerm.trim().toLowerCase();

	let filteredProducts = products.filter((product) => {
		const matchesSearch = product.name.toLowerCase().includes(searchValue);
		const matchesCategory = appState.category === "all" || product.category === appState.category;

		return matchesSearch && matchesCategory;
	});

	if (appState.sortBy === "price-asc") {
		filteredProducts = [...filteredProducts].sort((firstProduct, secondProduct) => firstProduct.price - secondProduct.price);
	}

	if (appState.sortBy === "price-desc") {
		filteredProducts = [...filteredProducts].sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price);
	}

	return filteredProducts;
}

function renderProducts() {
	const filteredProducts = getFilteredProducts();

	resultsCount.textContent = `Showing ${filteredProducts.length} of ${products.length} products`;

	if (!filteredProducts.length) {
		productGrid.innerHTML = `
			<div class="empty-state">
				<h3>No products found</h3>
				<p>Try a different search term or choose another category.</p>
			</div>
		`;
		return;
	}

	productGrid.innerHTML = filteredProducts.map((product) => `
		<article class="product-card">
			<div class="product-media">
				<img src="${product.image}" alt="${product.alt}" loading="lazy" decoding="async">
			</div>
			<div class="product-body">
				<p class="eyebrow">${product.category}</p>
				<h3 class="product-name">${product.name}</h3>
				<div class="product-meta">
					<span class="product-rating">Rating: ${product.rating.toFixed(1)} / 5</span>
					<span class="product-price">${formatPrice(product.price)}</span>
				</div>
				<button class="btn btn-primary" type="button" data-add-to-cart="${product.id}">Add to Cart</button>
			</div>
		</article>
	`).join("");
}

function getCartItemsWithDetails() {
	return cart.map((cartItem) => {
		const product = products.find((productItem) => productItem.id === cartItem.id);
		return { ...cartItem, product };
	}).filter((cartItem) => cartItem.product);
}

function renderCart() {
	const detailedCartItems = getCartItemsWithDetails();
	const totalItemQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
	const totalItemPrice = detailedCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

	cartBadge.textContent = `${totalItemQuantity} ${totalItemQuantity === 1 ? "item" : "items"}`;
	totalQuantity.textContent = totalItemQuantity;
	totalPrice.textContent = formatPrice(totalItemPrice);

	if (!detailedCartItems.length) {
		cartItems.innerHTML = '<p class="cart-empty">Your cart is empty. Add products to see them here.</p>';
		return;
	}

	cartItems.innerHTML = detailedCartItems.map((cartItem) => `
		<article class="cart-item">
			<img src="${cartItem.product.image}" alt="${cartItem.product.alt}" loading="lazy" decoding="async">
			<div>
				<h3>${cartItem.product.name}</h3>
				<p>${cartItem.product.category}</p>
				<p>${formatPrice(cartItem.product.price)} each</p>

				<div class="cart-item-row">
					<div class="quantity-controls" aria-label="Update quantity for ${cartItem.product.name}">
						<button type="button" data-action="decrease" data-id="${cartItem.id}">-</button>
						<span>${cartItem.quantity}</span>
						<button type="button" data-action="increase" data-id="${cartItem.id}">+</button>
					</div>
					<button class="remove-button" type="button" data-action="remove" data-id="${cartItem.id}">Remove</button>
				</div>
			</div>
		</article>
	`).join("");
}

function addToCart(productId) {
	const existingCartItem = cart.find((cartItem) => cartItem.id === productId);

	if (existingCartItem) {
		existingCartItem.quantity += 1;
	} else {
		cart.push({ id: productId, quantity: 1 });
	}

	saveCart();
	renderCart();
}

function updateCartItem(productId, action) {
	const cartItem = cart.find((item) => item.id === productId);

	if (!cartItem) {
		return;
	}

	if (action === "increase") {
		cartItem.quantity += 1;
	}

	if (action === "decrease") {
		cartItem.quantity -= 1;

		if (cartItem.quantity <= 0) {
			cart = cart.filter((item) => item.id !== productId);
		}
	}

	if (action === "remove") {
		cart = cart.filter((item) => item.id !== productId);
	}

	saveCart();
	renderCart();
}

function clearCart() {
	cart = [];
	saveCart();
	renderCart();
}

function handleProductGridClick(event) {
	const addButton = event.target.closest("[data-add-to-cart]");

	if (!addButton) {
		return;
	}

	const productId = Number(addButton.dataset.addToCart);
	addToCart(productId);
}

function handleCartClick(event) {
	const actionButton = event.target.closest("[data-action]");

	if (!actionButton) {
		return;
	}

	const productId = Number(actionButton.dataset.id);
	updateCartItem(productId, actionButton.dataset.action);
}

function toggleMenu() {
	const isOpen = siteNav.classList.toggle("is-open");
	menuToggle.setAttribute("aria-expanded", String(isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

function closeMenu() {
	siteNav.classList.remove("is-open");
	menuToggle.setAttribute("aria-expanded", "false");
	menuToggle.setAttribute("aria-label", "Open menu");
}

searchInput.addEventListener("input", (event) => {
	appState.searchTerm = event.target.value;
	renderProducts();
});

categoryFilter.addEventListener("change", (event) => {
	appState.category = event.target.value;
	renderProducts();
});

sortBy.addEventListener("change", (event) => {
	appState.sortBy = event.target.value;
	renderProducts();
});

productGrid.addEventListener("click", handleProductGridClick);
cartItems.addEventListener("click", handleCartClick);
clearCartButton.addEventListener("click", clearCart);
menuToggle.addEventListener("click", toggleMenu);

siteNav.addEventListener("click", (event) => {
	if (event.target.matches("a")) {
		closeMenu();
	}
});

document.addEventListener("click", (event) => {
	if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
		closeMenu();
	}
});

window.addEventListener("resize", () => {
	if (window.innerWidth > 780) {
		closeMenu();
	}
});

renderProducts();
renderCart();
