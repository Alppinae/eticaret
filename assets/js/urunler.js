const BASE_URL = "https://dummyjson.com";
const limit = 45;

function checkEndpoints(productId = 1) {
    return {
        products: "products",
        productDetails: `products/${productId}`
    };
}

const endpoints = checkEndpoints();

const container = document.querySelector(".container");

async function urunleriGetir() {
    const response = await fetch(`${BASE_URL}/${endpoints.products}?limit=${limit}`);
    const data = await response.json();
    return data;
}

async function ekranaYaz() {
    const data = await urunleriGetir();
    
    container.innerHTML = ''; // container'ı temizle
    
    for (const product of data.products) {
        container.innerHTML += `
            <div class="itemContainer">              
                <a href="urun.html" class="pages">
                    <div class="clicked" data-productid=${product.id}> 
                        <img data-productid=${product.id} src="${product.thumbnail}">
                        <h2 data-productid=${product.id}>${product.title}</h2>
                        <p data-productid=${product.id} id="brand">${product.brand}</p>
                        <span data-productid=${product.id}>${product.rating}</span>
                        <p data-productid=${product.id}>price: ${product.price}$</p>
                        <button class="btn-1" data-productid=${product.id}>Ürüne git</button>
                    </div>
                </a>
            </div>
        `;
    }

    // tıklanan elemanları yakalayıp idsini localStorage'e kaydediyor
    const clickedProducts = document.querySelectorAll(".clicked");
    clickedProducts.forEach(clicked => {
        clicked.addEventListener("click", function(e) {
            localStorage.setItem("productid", e.target.dataset.productid);
        });
    });
}

async function IdGetir(id) {
    const endpoint = checkEndpoints(id);
    const response = await fetch(`${BASE_URL}/${endpoint.productDetails}`);
    const data = await response.json();
    return data; // data'yı döndür
}

// İlk ürünleri getir
ekranaYaz();

// İlk ürünleri tekrar getirme, çünkü yukarıda zaten çağrılmış
// urunleriGetir();

// Örnek olarak IdGetir fonksiyonunu kullanmak için bir id gönder
// Örneğin, ilk ürünün detaylarını almak için
const firstProductId = 1;
IdGetir(firstProductId)
    .then(data => {
        console.log("Product Details:", data);
    })
    .catch(error => {
        console.error("Error fetching product details:", error);
    });
