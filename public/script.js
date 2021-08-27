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
    let form = document.getElementById('form');
    form = addEventListener('submit', onPostSubmit);
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

function resetProducsList() {
    document.getElementById('presentation-list').innerHTML = "";
}

function setHeadlineText(headline) {
    document.getElementById('headline-text').innerHTML = `${headline}`;
}

// Submithandler GET by id
async function onSearchSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let jsonData = JSON.stringify(Object.fromEntries(formData));
    let product = "";
    try {
        let response = await fetch(`http://localhost:3003/api/products/${jsonData.id}`);
        product = await response.json();
    } catch (error) {
        //TODO: Felmedelande ?
        console.log(error);
    }
    resetProducsList();
    setHeadlineText("Search result");
    if (product) {
        //TODO: Förutsätter nu att bara en produkt hittas..
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

// Submithandler POST
function onPostSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let jsonData = JSON.stringify(Object.fromEntries(formData));
    //TODO: alla parametrar blir av typen string, price till int/float? så validering funkar
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