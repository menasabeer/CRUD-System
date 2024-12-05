var productNameInput = document.getElementById('nameInput');
var productPriceInput = document.getElementById('priceInput');
var productCategoryInput = document.getElementById('categoryInput');
var productDescriptionInput = document.getElementById('descriptionInput');
var inputs = document.getElementsByClassName('input')
var addBtn = document.getElementById('addBtn');
var alertName = document.getElementById('alertName');
var alertPrice = document.getElementById('alertPrice');
var alertCategory = document.getElementById('alertCategory');
var alertDisc = document.getElementById('alertDisc');
var searchInput = document.getElementById("searchInput")
var products=[];
var currentIndex = 0;
if(JSON.parse(localStorage.getItem('productList'))!=null){
    products= JSON.parse(localStorage.getItem('productList'));
    displayProduct();
}
addBtn.onclick=function() {
    if(addBtn.innerHTML=='Add Product'){
        addProduct();
    }else{
        updateProduct()
    }
    displayProduct();
    clearForm();  
    productNameInput.classList.remove('is-valid');
    productPriceInput.classList.remove('is-valid');
    productCategoryInput.classList.remove('is-valid');
    productDescriptionInput.classList.remove('is-valid');
    addBtn.disabled = 'true'
};
function addProduct(){
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    }
    products.push(product),
    localStorage.setItem('productList', JSON.stringify(products))
};
function displayProduct(){
    var cartona=''
    for(var i=0;i<products.length;i++){
        cartona+=`<tr>  
                    <td>${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].category}</td>
                    <td>${products[i].description}</td>
                    <td><button onclick='getProductInfo(${i})' class='btn btn-warning'>Upadate</button></td>
                    <td><button onclick='deleteProduct(${i})' class='btn btn-danger'>Delete</button></td>
                </tr>`
    }
    document.getElementById('tableBody').innerHTML=cartona;
};
function clearForm(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value=''
    }
};
function deleteProduct(index){
    products.splice(index,1);
    displayProduct();
    localStorage.setItem('productList', JSON.stringify(products));
};
searchInput.onkeyup=function(){
    var cartona=''
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
            cartona+=`<tr>  
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].description}</td>
                <td><button onclick='getProductInfo(${i})' class='btn btn-warning'>Upadate</button></td>
                <td><button onclick='deleteProduct(${i})' class='btn btn-danger'>Delete</button></td>
            </tr>`
        }
        
    }
    document.getElementById('tableBody').innerHTML=cartona;
}
function getProductInfo(index){
    currentIndex =index;
    var currentProduct = products[index];
    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value = currentProduct.category;
    productDescriptionInput.value = currentProduct.description;
    addBtn.innerHTML = 'Update Product'
}
function updateProduct(){
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        description: productDescriptionInput.value,
    }
    products[currentIndex]=product;
    addBtn.innerHTML='Add Product';
}
function ifLogic (alert, input){
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    alert.classList.add('d-none')
}
function elseLogic(alert,input){
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    alert.classList.remove('d-none')
}    
productNameInput.onkeyup = function (){
    let nameRejex = /^[A-Z][a-z]{2,9}$/
    if(nameRejex.test(productNameInput.value)){
        ifLogic (alertName,productNameInput);
    }else{
        elseLogic(alertName , productNameInput);
    }
}
productPriceInput.onkeyup = function (){
    let priceRejex = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/
    if(priceRejex.test(productPriceInput.value)){
        ifLogic (alertPrice,productPriceInput);
    }else{
        elseLogic(alertPrice , productPriceInput);
    }
}
productCategoryInput.onkeyup = function (){
    let categoryRejex=/^[A-Za-z\s]+$/
    if(categoryRejex.test(productCategoryInput.value)){
        ifLogic (alertCategory,productCategoryInput);
    }else{
        elseLogic(alertCategory , productCategoryInput);
    }
}
productDescriptionInput.onkeyup = function (){
    let DescriptionRejex=/^[A-Za-z\s]+$/
    if(DescriptionRejex.test(productDescriptionInput.value)){
        ifLogic (alertDisc,productDescriptionInput);
        addBtn.removeAttribute('disabled');

    }else{
        elseLogic(alertDisc , productDescriptionInput);
        addBtn.disabled ='true'
    }
}
