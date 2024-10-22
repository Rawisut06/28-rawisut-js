const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const imgInput = document.getElementById("product-image");
const createBtn = document.querySelector(".create-product");
const addBtn = document.querySelector(".add-cart");
const calcBtn = document.querySelector(".calc-price");
const dashboard = document.querySelector(".product-dashboard");
const products = [];
const checkedProducts = [];
// สร้าง item object เพื่อเก็บค่าที่ input มา

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
    if (priceValue === "" || isNaN(priceValue) || priceValue <= 0) {
        return alert("Must enter a valid number for the price.");
    }
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
function displayItem(item) {
    return `
        <img src="${item.image}" alt="item-image">
        <div class="item-info">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
        </div>
    `;
}

// สร้างฟังก์ชั่นแสดงสินค้าใน dashboard
function displayDashboard(item) {
    const inputTag = `<input type="checkbox" name="item-name" value="${item.id}">`
    const editBtnTag = `<button onclick="editItem(${item.id})">Edit</button>`
    const dashboardItemHTML = `
        <div class="item" id="${item.id}">
            ${inputTag}
            ${displayItem(item)}
            ${editBtnTag}
        </div>
    `;
    dashboard.innerHTML += dashboardItemHTML;
}

function editItem(id) {
    const editItem = products.find((product) => product.id === id);
    const newName = prompt("Edit Name", editItem.name);
    const newPrice = prompt("Edit Price", editItem.price);
    const newImage = prompt("Edit Image", editItem.image);
    if (newName.trim() !== "") {
        editItem.name = newName;
        document.getElementById(`${id}`).querySelector("h3").textContent = editItem.name;
    }
    if (newPrice !== "" || !isNaN(newPrice) || newPrice >= 0) {
        editItem.price = newPrice;
        document.getElementById(`${id}`).querySelector("p").textContent = editItem.price;
    }
    if (newImage !== "") {
        editItem.image = newImage;
        document.getElementById(`${id}`).querySelector("p").textContent = editItem.image;
    }
}
// สร้างอีเวนท์คลิกเพื่อใช้คำสั่ง selectedProducts()เพื่อแสดงสินค้าที่เลือก
addBtn.addEventListener("click", () => {
    const checkboxes = dashboard.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked === true) {
            const selectedItem = products.find(product => product.id == checkbox.value);
            if (selectedItem) {
                checkedProducts.push(selectedItem);
                selectedProducts(selectedItem);
            }
            checkbox.checked = false;
        }
    })
})

// ฟังก์ชั่นแสดงสินค้าที่เลือกลงใน cart
function selectedProducts(item) {
    const cart = document.querySelector(".display-product");
    const removeBtnTag = `<button onclick="removeCartItem(${item.id})">Remove</button>`;
    const cartItemHTML = `
        <div class="item" id="cart-${item.id}">
            ${displayItem(item)}
            ${removeBtnTag}
        </div>
    `;
    cart.innerHTML += cartItemHTML;
}

// ฟังก์ชั่นลบสินค้า
function removeCartItem(id) {
    const cartItem = document.getElementById(`cart-${id}`);
    if (cartItem) {
        cartItem.remove();
    }
}

// สร้างฟังก์ชั่นคำนวณสินค้า
function calculate() {
    const cartPrice = Number(document.querySelector("p").textContent);
    cartPrice += cartPrice;
}

// สร้างอีเวนท์คลิกเพื่อใช้คำสั่ง calculate()เพื่อคำนวณราคาสินค้าที่เลือก
calcBtn.addEventListener("click", () => {
    const cartItems = document.querySelectorAll(".display-product .item");
    const displayCalc = document.querySelector(".display-payment span");
    let totalPrice = 0;

    cartItems.forEach(cartItem => {
        const priceText = cartItem.querySelector("p").textContent.replace('$', '');
        totalPrice += Number(priceText);
        displayCalc.innerHTML = totalPrice;
    });
});