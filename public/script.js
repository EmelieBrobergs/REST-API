window.addEventListener('load', main);

function main() {
    //fetchProducts();
    
    //GET ALL
    const buttonProducts = document.getElementById('showAllProducts');
    buttonProducts.addEventListener('click', fetchProducts);

    //GET BY ID
    const formSearch = document.getElementById('formSearch');
    formSearch.addEventListener('submit', onSearchSubmit);

    //POST
    let form = document.getElementById('formPost');
    form = addEventListener('submit', onPostSubmit);

    //DELETE
    //Added to <li> when created
}

//TODO: Dela upp funktion i två ?
async function fetchProducts() {
    let products = "";
    try {
        let response = await fetch('http://localhost:3003/api/products');
        products = await response.json();
    } catch (error) {
        //TODO: Felmeddelande?
        console.log(error);
    }

    resetProducsList();
    setHeadlineText("Product list");
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

async function deleteProduct(productId) {
    fetch(`http://localhost:3003/api/products/${productId}`, 
    {
        method: "DELETE", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

function resetProducsList() {
    document.getElementById('presentation-list').innerHTML = "";
}

function setHeadlineText(headline) {
    document.getElementById('headline-text').innerHTML = `${headline}`;
}

// Submithandler GET by id
async function onSearchSubmit(event) {
    // if(event.preventDefault()) {
        event.preventDefault();
    //     return false;
    // }
    //let searchProduct = document.getElementById('productIdSearch').nodeValue;
    let formData = new FormData(event.target);
    let jsonData = JSON.stringify(Object.fromEntries(formData));
    // console.log(jsonData.id);
    let product = "";
    try {
        //TODO: ta ut text med endast id, inte json-format !
        let response = await fetch(`http://localhost:3003/api/products/${jsonData['id']}`);
        product = await response.json();
    } catch (error) {
        //TODO: Felmedelande ?
        console.log(error);
    }
    resetProducsList();
    setHeadlineText("Search result");
    if (product) {
            const ol = document.getElementById("presentation-list");
            const p = document.createElement("p");
            const li = document.createElement("li");
            p.innerText = `Name: ${product.name}, Type: ${product.type}, Price: ${product.price}, Id: ${product.id}`;
            li.appendChild(p);
            ol.appendChild(li);
    }else {
        const ol = document.getElementById("presentation-list");
        const p = document.createElement("p");
        p.innerText = `No products found with id "${jsonData.id}"`;
        ol.appendChild(p);
    }
}

async function searchProduct() {
    const input = document.getElementById('formSearch');
    const text = input.elements[0].value;

    let response = await fetch(`http://localhost:3003/api/products/${text}`);
    const product = await response.json();

    resetProducsList();
    setHeadlineText("Search result");

    const ol = document.getElementById("presentation-list");
    const p = document.createElement("p");
    p.innerText = `Name: ${product.name} Type: ${product.type}, Price: ${product.price}, Id: ${product.id}`;
    ol.appendChild(p);
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