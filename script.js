const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const imgInput = document.getElementById("product-image");
const createBtn = document.querySelector(".create-product");
const addBtn = document.querySelector(".add-cart");
const calcBtn = document.querySelector(".calc-price");
const dashboard = document.querySelector(".product-dashboard");
const products = [];
const checkedProducts = [];

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
    if (!imgValue.match(/^http.*\.(jpeg|jpg|gif|png)$/)) {
        return alert("This is not image.");
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
    // คืนค่า value เป็นช่องว่าง เพื่อให้ value ใน input ที่เราพิมพ์มันหายไป
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
    const inputTag = `<input type="checkbox" name="item-name" value="${item.id}">`;
    const editBtnTag = `<button onclick="editItem(${item.id})">Edit</button>`;
    const dashboardItemHTML = `
        <div class="item" id="${item.id}">
            ${inputTag}
            ${displayItem(item)}
            ${editBtnTag}
        </div>
    `;
    dashboard.innerHTML += dashboardItemHTML;
}

// ฟังก์ชั่นแก้ไขสินค้า
function editItem(id) {
    // กำหนดตัวแปรที่รับค่าจากการหา item object ที่ item.id ตรงกับ parameter
    const editItem = products.find((product) => product.id === id);

    // กำหนดตัวแปรของ value ใน item object ที่แก้้ไขโดยใช้ prompt()
    const newName = prompt("Edit Name", editItem.name);
    const newPrice = prompt("Edit Price", editItem.price);
    const newImage = prompt("Edit Image", editItem.image);

    // สร้างเงื่อนไขและเปลี่ยนแปลงค่า value ใน item object
    if (newName.trim() !== "") {
        editItem.name = newName;
        document.getElementById(`${id}`).querySelector("h3").textContent = editItem.name;
    }
    if (newPrice !== "" || !isNaN(newPrice) || newPrice >= 0) {
        editItem.price = newPrice;
        document.getElementById(`${id}`).querySelector("p").textContent = `$${editItem.price}`;
    }
    if (newImage.match(/^http.*\.(jpeg|jpg|gif|png)$/)) { //เช็ค url ที่เป็น image
        editItem.image = newImage;
        document.getElementById(`${id}`).querySelector("img").src = editItem.image;
    }
}
// สร้างอีเวนท์คลิกเพื่อใช้คำสั่ง selectedProducts()เพื่อแสดงสินค้าที่เลือก
addBtn.addEventListener("click", () => {
    const checkboxes = dashboard.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach((checkbox) => { // วนลูป checkbox ทุกตัว ที่ดึงค่ามาจาก input ใน dashboard
        if (checkbox.checked === true) { // เช็ํคถ้ามีการกด checkbox
            const selectedItem = products.find(product => product.id == checkbox.value); // กำหนดตัวแปรและเช็คค่าจากการหา item object ใน products array ที่มีการกด checkbox
            checkedProducts.push(selectedItem);
            selectedProducts(selectedItem);
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
    cartItem.remove();
}

// สร้างอีเวนท์คลิกเพื่อคำนวณราคาสินค้าที่เลือก
calcBtn.addEventListener("click", () => {
    const cartItems = document.querySelectorAll(".display-product .item");
    const displayCalc = document.querySelector(".display-payment span");
    let totalPrice = 0; // กำหนดราคารวมเริ่มต้น

    cartItems.forEach(cartItem => { // วนลูปสินค้าใน cart เพื่อแปลง type string เป็น number และนำมาบวกกัน
        const priceText = cartItem.querySelector("p").textContent.replace('$', ''); // นำสัญลักษณ์ออกให้เหลือแต่ตัวเลข
        totalPrice += Number(priceText); // เปลี่ยนตัวเลขจาก type string เป็น number และมาบวกกัน
        displayCalc.innerHTML = totalPrice; // แสดงค่ารวมที่คำนวณ
    });
});