# TechStore - E-Commerce Website

TechStore is a frontend-only e-commerce capstone project built for ApexPlanet using only HTML5, CSS3, and Vanilla JavaScript. It demonstrates responsive layout, product rendering from arrays, filtering, sorting, and cart persistence with Local Storage.

## Folder Structure

```text
Task5/
├── images/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Features

- Responsive navigation bar with logo, links, and hamburger menu
- Hero section with call-to-action buttons
- 12 dynamically generated products
- Search by product name
- Filter by category
- Sort by price low-to-high and high-to-low
- Shopping cart with quantity controls and remove button
- Local Storage cart persistence
- Responsive design for mobile, tablet, laptop, and desktop
- Footer with about, contact, social media links, and copyright

## How It Works

### 1. Navigation

The header contains the logo, navigation links, and a mobile menu button. On small screens, the navigation becomes a dropdown menu controlled by JavaScript.

### 2. Hero Section

The hero section introduces the store and includes buttons that scroll to the product list and cart section.

### 3. Product Data

All products are stored in a JavaScript array of objects inside `script.js`. Each object contains:

- id
- name
- category
- price
- rating
- image
- alt text

The product cards are created dynamically with JavaScript instead of being hardcoded in HTML.

### 4. Search

The search input updates a state value in JavaScript. The product list is filtered by checking whether each product name includes the typed text.

### 5. Filter

The category dropdown filters products by matching the selected category with the product data.

### 6. Sort

The sort dropdown reorders the filtered products by price:

- Price Low to High
- Price High to Low

### 7. Add to Cart

Each product card has an Add to Cart button. Clicking it stores the product id in the cart array.

### 8. Cart Management

The cart section shows all selected items. Users can:

- Increase quantity
- Decrease quantity
- Remove an item completely
- Clear the entire cart

The total quantity and total price are recalculated every time the cart changes.

### 9. Local Storage

The cart is saved in Local Storage under the key `techstore-cart`. When the page reloads, the cart is restored automatically.

### 10. Responsive Design

CSS Grid is used for the product and layout sections, while Flexbox is used for navigation, buttons, and cart rows. Media queries adjust the layout for smaller screens.

## How to Run

1. Open `index.html` in a browser, or use Live Server in VS Code.
2. Browse the products.
3. Search, filter, or sort the product list.
4. Add items to the cart and refresh the page to confirm cart persistence.

## Browser Support

TechStore works in:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

## Notes

- No frameworks are used.
- No backend or database is required.
- All product cards are generated dynamically in JavaScript.
- Product images are loaded lazily for better performance.