window.addEventListener('load', main);

function main() {
    fetchProducts();
    
    //GET ALL
    const buttonProducts = document.getElementById('showAllProducts');
    buttonProducts.addEventListener('click', fetchProducts);

    //POST
    var form = document.getElementById('form');
    form = addEventListener('submit', onSubmit);
}

//TODO: Dela upp funktion i två ?
async function fetchProducts() {
    let products = "";
    try {
        var response = await fetch('http://localhost:3003/api/products');
        products = await response.json();
    } catch (error) {
        //TODO: Felmeddelande?
        console.log(error);
    }

    resetProducsList();

    for (const product of products) {
        const ol = document.getElementById("products");
        const p = document.createElement("p");
        const li = document.createElement("li");
        p.innerText = `Name: ${product.name}, Type: ${product.type}, Price: ${product.price}`;
        li.appendChild(p);
        ol.appendChild(li);
    }
}

function resetProducsList() {
    document.getElementById('products').innerHTML = "";
}

// En submithandler...
function onSubmit(event) {
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