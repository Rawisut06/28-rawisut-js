const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const imgInput = document.getElementById("product-image");
const createBtn = document.querySelector(".create-product");
const addBtn = document.querySelector(".add-cart");
const calcBtn = document.querySelector(".calc-price");
const products = [];

// สร้างฟังก์ชั่นแสดงสินค้า
function displayProduct(item) {
    const dashboard = document.querySelector(".product-dashboard");
    dashboard.innerHTML += `
    <div class="item" id="${item.id}">
        <input type="checkbox" name="product-name" id="product-name">
        <img src="${item.image}" alt="product-image">
        <div class="itemInfo">
            <h3>${item.name}</h3>
            <p>${item.price}$</p>
        </div>
        <button>Remove</button>
    </div>
    `;
    console.log(123);
}
// สร้างอีเวนท์คลิกเพื่อใช้คำสั่ง displayProduct() เพื่อแสดงสินค้าออกมาหลังคลิก
createBtn.addEventListener("click", () => {
    const nameValue = nameInput.value.trim();
    const priceValue = priceInput.value.trim();
    const imgValue = imgInput.value.trim();
    const item = {
        id: Date.now(), // เพื่อสร้าง unique id จาก timestamp
        name: nameValue,
        price: priceValue,
        image: imgValue
    }
    products.push(item);
    displayProduct(item);
    nameInput.value = "";
    priceInput.value = "";
    imgInput.value = "";
});
