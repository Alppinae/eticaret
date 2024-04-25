
// localdaki tıklanan idyi yakalayıp değişkene atıyouz.
const clickedProductsId = localStorage.getItem("productid");
const mainPage = document.querySelector(".urunSayfasi");

// fetch ile datayı dönüyoruz id parametresi ile.
async function sepetId(id) {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
}

// ürünleri getirmesi için olan fonksiyon tıklanan idye göre 
// yakalanan ıdnin ürününü ekrana basıyoruz.
// item değişkenine localdeki idyi veriyoruz.

function adetAzalt() {
    let input = document.getElementById("adet");
    let value = parseInt(input.value);
    if (value > 0) {
        value--;
        input.value = value;
    }
}

function adetArttir() {
    let input = document.getElementById("adet");
    let value = parseInt(input.value);
    value++;
    input.value = value;
}

function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

async function getProduct() {
                                      // shoppingCart objesini tanımlama
    const shoppingCart = {
        items: [],
        total: 0,
    };

    const item = await sepetId(clickedProductsId);

    const indirimliFiyat = calculateDiscountedPrice(item.price, item.discountPercentage);
    const btn = document.querySelectorAll(".buyBtn");
    mainPage.innerHTML = `
        <div class="desktop">
            <div class="group-11">
                <div class="group-11-1">
                    <img src="${item.thumbnail}">
                    <div class="group-9">
                        <div class="group-9-img"></div>
                        <div class="group-9-img"></div>
                        <div class="group-9-img"></div>
                        <div class="group-9-img"></div>
                    </div>
                </div>
                <div class="group-11-2">
                    <h1>${item.title}</h1>
                    <p class="p-1">${item.description}</p>
                    <div class="group">
                        <p class="p-3">${indirimliFiyat}$</p>
                        <p class="p-4">${item.price}</p>
                        <div class="indirim">
                            %${item.discountPercentage}
                        </div>
                    </div>
                    <div class="group-7">
                        <div class="group-5">
                            <div class="sepet-adet">
                                <button class="sepet-buton azalt" onclick="adetAzalt()">-</button>
                                <input type="text" class="sepet-girdi" id="adet" value="0">
                                <button class="sepet-buton arttır" onclick="adetArttir()">+</button>
                            </div>
                        </div>
                        <div class="btn-3">
                            <button class="buyBtn">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    const sepetBtn = document.querySelector(".buyBtn");
    sepetBtn.addEventListener("click", function () {
        const canvas = document.querySelector("#mySidenav");

        const existingCartItem = shoppingCart.items.find(cartItem => cartItem.id === item.id);
        if (existingCartItem) {
            existingCartItem.Adeti++;
        } else {
            const newItem = {
                id: item.id,
                title: item.title,
                price: item.price,
                thumbnail: item.thumbnail,
                Adeti: 1,
            };

            shoppingCart.items.push(newItem);
        }

        shoppingCart.total += item.price;
                                     // Sepeti güncelleyen fonksiyon
function updateCartUI() {
    const cartContainer = document.querySelector("#mySidenav");
                                    // Sepet içeriğini biriktirmek için bir dize oluştur
    let cartHTML = "";

    for (const item of shoppingCart.items) {
        cartHTML += `
            <div class="itemContainer" data-productid="${item.id}">
                <div class="plus-item">
                    <img src="${item.thumbnail}">
                    <h2>${item.title}</h2>
                    <p>${item.price}$</p>
                    <p class="Adeti">Adeti: ${item.Adeti}</p>
                </div>
            </div>
        `;
    }
                                            // Sepet içeriğini bir kerede güncelle
    cartContainer.innerHTML = cartHTML;
}

        updateCartUI();
    });
}

function calculateDiscountedPrice(originalPrice, discountPercentage) {
    const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
    return discountedPrice.toFixed(2); // İki ondalık basamakla sınırlıyoruz
}

// id ile yakalayıp value 0 dan büyükse 
// value -- olarak eksiltip inputun valuesine eşitliyor.
// const olunca değişken olmadığı için çalıştıramadım .
// htmle basılmadan cağırdığım için htmlde adet id'sini nul verdi.
function adetAzalt() {
    let input = document.getElementById("adet"); 
    let value = parseInt(input.value);
    if (value > 0) { 
        value--;
        input.value = value;
    }
}

function adetArttir() {
    let input = document.getElementById("adet"); 
    let value = parseInt(input.value); 
    value++; 
    input.value = value; 
}

function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

getProduct();
