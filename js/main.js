var productNameInput = document.getElementById("nameInput");
var productPriceInput = document.getElementById("priceInput");
var productCategoryInput = document.getElementById("categoryInput");
var productDescriptionInput = document.getElementById("descriptionInput");
var inputs = document.getElementsByClassName("input");
var addBtn = document.getElementById("addBtn");
var alertName = document.getElementById("alertName");
var alertPrice = document.getElementById("alertPrice");
var alertCategory = document.getElementById("alertCategory");
var alertDisc = document.getElementById("alertDisc");
var searchInput = document.getElementById("searchInput");
var products = [];
var currentIndex = 0;

if (JSON.parse(localStorage.getItem("productList")) != null) {
    products = JSON.parse(localStorage.getItem("productList"));
    displayProduct();
}

addBtn.onclick = function () {
    if (addBtn.innerHTML == "Add Product") {
        addProduct();
    } else {
        updateProduct();
    }
    displayProduct();
    clearForm();
    productNameInput.classList.remove("is-valid");
    productPriceInput.classList.remove("is-valid");
    productCategoryInput.classList.remove("is-valid");
    productDescriptionInput.classList.remove("is-valid");
    addBtn.disabled = true;
};

function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    };
    products.push(product);
    localStorage.setItem("productList", JSON.stringify(products));
}

function displayProduct() {
    var cartona = "";
    for (var i = 0; i < products.length; i++) {
        cartona += `<tr>  
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].category}</td>
                    <td>${products[i].description}</td>
                    <td><button onclick='getProductInfo(${i})' class='btn btn-warning'>Update</button></td>
                    <td><button onclick='deleteProduct(${i})' class='btn btn-danger'>Delete</button></td>
                </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    displayProduct();
    localStorage.setItem("productList", JSON.stringify(products));
}

searchInput.onkeyup = function () {
    var cartona = "";
    for (var i = 0; i < products.length; i++) {
        if (
            products[i].name
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
        ) {
            cartona += `<tr>  
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].description}</td>
                <td><button onclick='getProductInfo(${i})' class='btn btn-warning'>Update</button></td>
                <td><button onclick='deleteProduct(${i})' class='btn btn-danger'>Delete</button></td>
            </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = cartona;
};

function getProductInfo(index) {
    currentIndex = index;
    var currentProduct = products[index];
    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescriptionInput.value = currentProduct.description;
    addBtn.innerHTML = "Update Product";
    addBtn.disabled = true;

    validateInput(
        productNameInput,
        alertName,
        /^[A-Za-z0-9]{3,20}( [A-Za-z0-9]{3,20})*$/
    );
    validateInput(
        productPriceInput,
        alertPrice,
        /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/
    );
    validateInput(productCategoryInput, alertCategory, /^[A-Za-z\s]+$/);
    validateInput(productDescriptionInput, alertDisc, /^[A-Za-z\s]+$/);

    checkFormValidity();
}

function updateProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    };
    products[currentIndex] = product;
    addBtn.innerHTML = "Add Product";
    addBtn.disabled = true;
}

function ifLogic(alert, input) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    alert.classList.add("d-none");
}

function elseLogic(alert, input) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    alert.classList.remove("d-none");
}

function validateInput(input, alert, regex) {
    if (regex.test(input.value)) {
        ifLogic(alert, input);
    } else {
        elseLogic(alert, input);
    }
}

function checkFormValidity() {
    if (
        productNameInput.classList.contains("is-valid") &&
        productPriceInput.classList.contains("is-valid") &&
        productCategoryInput.classList.contains("is-valid") &&
        productDescriptionInput.classList.contains("is-valid")
    ) {
        addBtn.removeAttribute("disabled");
    } else {
        addBtn.disabled = true;
    }
}

productNameInput.onkeyup = function () {
    validateInput(
        productNameInput,
        alertName,
        /^[A-Za-z0-9]{3,20}( [A-Za-z0-9]{3,20})*$/
    );
    checkFormValidity();
};

productPriceInput.onkeyup = function () {
    validateInput(
        productPriceInput,
        alertPrice,
        /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/
    );
    checkFormValidity();
};

productCategoryInput.onkeyup = function () {
    validateInput(productCategoryInput, alertCategory, /^[A-Za-z\s]+$/);
    checkFormValidity();
};

productDescriptionInput.onkeyup = function () {
    validateInput(productDescriptionInput, alertDisc, /^[A-Za-z\s]+$/);
    checkFormValidity();
};
