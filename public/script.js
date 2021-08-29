window.addEventListener('load', main);

function main() {
    fetchProducts();
    
    //GET ALL
    const buttonProducts = document.getElementById('showAllProducts');
    buttonProducts.addEventListener('click', fetchProducts);

    //GET BY ID
    const formSearch = document.getElementById('formSearchButton');
    formSearchButton.addEventListener('click', searchProduct);

    //POST
    let form = document.getElementById('formPost');
    form = addEventListener('submit', onPostSubmit);

    //DELETE
    //Eventlistener Added to <li> when created i printProducts()

    //PUT
    //TODO: Create..
}

//GET ALL 
async function fetchProducts() {
    let products = "";
    try {
        let response = await fetch('http://localhost:3003/api/products');
        products = await response.json();
    } catch (error) {
        console.log(error);
    }

    resetProducsList();
    setHeadlineText("Product list");
    printProducts(products);
}

//DELETE BY ID
function deleteProduct(productId) {
    fetch(`http://localhost:3003/api/products/${productId}`, 
    {
        method: "DELETE", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

//GET BY ID
async function searchProduct() {
    const input = document.getElementById('formSearch');
    const searchId = input.elements[0].value;
    let product = "";
    try {
        let response = await fetch(`http://localhost:3003/api/products/${searchId}`);
        product = await response.json();
    } catch (error) {
        console.log(error);
    }
    
    resetProducsList();
    setHeadlineText("Search result");
    
    //TODO: Hantering av 404 (Not found) från api, else-blocket nås inte nu
    if (product) {
        
        const ol = document.getElementById("presentation-list");
        const p = document.createElement("p");
        p.innerText = `Name: ${product.name} Type: ${product.type}, Price: ${product.price}, Id: ${product.id}`;
        ol.appendChild(p);
    } else {
        const ol = document.getElementById("presentation-list");
        const p = document.createElement("p");
        p.innerText = `No products found with id "${searchId}"`;
        ol.appendChild(p);
    }
}

// Submithandler POST
function onPostSubmit(event) {
    if(event.preventDefault()) {
        event.preventDefault();
        return false;
    }
    let formData = new FormData(event.target);
    let jsonData = JSON.stringify(Object.fromEntries(formData));
    console.log("JSON DATA: " + jsonData.toString());
    fetch('http://localhost:3003/api/products', 
    {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: jsonData
    });
}

function resetProducsList() {
    document.getElementById('presentation-list').innerHTML = "";
}

function setHeadlineText(headline) {
    document.getElementById('headline-text').innerHTML = `${headline}`;
}

function printProducts(products) {
    if (products) {
        for (const product of products) {
            const ol = document.getElementById("presentation-list");
            const p = document.createElement("p");
            const li = document.createElement("li");
            li.addEventListener('click', () => deleteProduct(product.id));
            p.innerText = `Name: ${product.name}, Type: ${product.type}, Price: ${product.price}, Id: ${product.id}`;
            li.appendChild(p);
            ol.appendChild(li);
        }
    }else {
        const ol = document.getElementById("presentation-list");
        const p = document.createElement("p");
        p.innerText = `No products are saved in file: products.json`;
        ol.appendChild(p);
    }
}