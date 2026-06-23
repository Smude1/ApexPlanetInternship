let products = [

    {
        name:"Laptop",
        category:"Electronics",
        price:50000
    },

    {
        name:"Smartphone",
        category:"Electronics",
        price:25000
    },

    {
        name:"Java Book",
        category:"Books",
        price:500
    },

    {
        name:"T-Shirt",
        category:"Clothing",
        price:800
    },

    {
        name:"DSA Book",
        category:"Books",
        price:700
    },

    {
        name:"Jeans",
        category:"Clothing",
        price:1200
    }
];

displayProducts(products);

function displayProducts(productArray){

    let container =
    document.getElementById("productContainer");

    container.innerHTML = "";

    productArray.forEach(product => {

        container.innerHTML += `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: ₹${product.price}</p>
            </div>
        `;
    });
}

function filterProducts(){

    let category =
    document.getElementById("categoryFilter").value;

    if(category === "all"){
        displayProducts(products);
        return;
    }

    let filteredProducts =
    products.filter(product =>
        product.category === category
    );

    displayProducts(filteredProducts);
}

function sortProducts(){

    let sortValue =
    document.getElementById("sortPrice").value;

    let sortedProducts = [...products];

    if(sortValue === "low"){

        sortedProducts.sort(
            (a,b) => a.price - b.price
        );
    }

    else if(sortValue === "high"){

        sortedProducts.sort(
            (a,b) => b.price - a.price
        );
    }

    displayProducts(sortedProducts);
}