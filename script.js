const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const imgInput = document.getElementById("product-image");
const createBtn = document.querySelector(".create-product");
const addBtn = document.querySelector(".add-cart");
const calcBtn = document.querySelector(".calc-price");
const products = [];

// สร้างอีเวนท์คลิกเพื่อใช้คำสั่ง displayProduct() เพื่อแสดงสินค้าออกมาหลังคลิก
createBtn.addEventListener("click", () => {
    // กำหนดตัวแปร
    const nameValue = nameInput.value.trim();
    const priceValue = priceInput.value.trim();
    const imgValue = imgInput.value.trim();

    // กำหนดตัวแปร เพื่อเช็คชื่อสินค้าที่ซ้ำกัน
    const isDuplicate = products.some(item => item.name === nameValue);
    // สร้างเงื่อนไขเมื่อใส่ input ผิด จะเรียกใช้ alert()
    if (nameValue === "") {
        return alert("Product name cannot be empty.");
    } else if (isDuplicate) {
        return alert("This product already exists.");
    }
    if (priceValue === "" && isNaN(priceValue)) {
        return alert("Must enter a valid number for the price.");
    }

    // สร้าง item object เพื่อเก็บค่าที่ input มา
    const item = {
        id: Date.now(), // เพื่อสร้าง unique id จาก timestamp
        name: nameValue,
        price: priceValue,
        image: imgValue
    }
    products.push(item);
    displayDashboard(item);
    nameInput.value = "";
    priceInput.value = "";
    imgInput.value = "";
});

// สร้างฟังก์ชั่นแสดงสินค้า
function displayDashboard(item) {
    const dashboard = document.querySelector(".product-dashboard");
    dashboard.innerHTML += `
    <div class="item" id="${item.id}">
        <input type="checkbox" name="item-name">
        <img src="${item.image}" alt="item-image">
        <div class="item-info">
            <h3>${item.name}</h3>
            <p>${item.price}$</p>
        </div>
    </div>
    `;
}

// สร้างอีเวนท์คลิกเพื่อใช้คำสั่ง selectedProducts()เพื่อแสดงสินค้าที่เลือก
addBtn.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("input[name='item-name']:checked");

    checkboxes.forEach(checkbox => {
        const parentDiv = checkbox.closest(".item"); // Get parent div
        const selectedId = parseInt(parentDiv.id); // Get product ID from parent
        const selectedItem = products.find(product => product.id === selectedId); // Find the product
        if (selectedItem) {
            selectedProducts(selectedItem);
        }
    });
})

function selectedProducts(item) {
    const cart = document.getElementById("display-product");
    cart.innerHTML += `
    <div class="cart-item" id="cart-${item.id}">
        <img src="${item.image}" alt="item-image">
        <div class="item-info">
            <h3>${item.name}</h3>
            <p>${item.price}$</p>
        </div>
        <button onclick="removeCartItem()">Remove</button>
    </div>
    `;
}

function removeCartItem(id) {
    const cartItem = document.getElementById(`cart-${id}`);
    if (cartItem) {
        cartItem.remove();
    }
}