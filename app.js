//Storage Controller
const StorageController = (function () {

})();


// Product Controller
const ProductController = (function () {

    //Private
    const Product = function (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    const data = {
        products: [],
        selectedProduct: null,
        totalPrice: 0

    }



    //Public
    return {
        getProduct: function () {
            return data.products;
        },
        getProductById: function (id) {
            let product = null;

            data.products.forEach(prd => {
                if (prd.id == id) {
                    product = prd;
                }
            });
            return product;
        },
        setCurrentProduct: function (product) {
            data.selectedProduct = product;
        },
        getCurrentProduct: function () {
            return data.selectedProduct;
        },
        getData: function () {
            return data;
        },
        addProduct: function (name, price) {
            let id;
            if (data.products.length > 0) {
                id = data.products[data.products.length - 1].id + 1;
            } else {
                id = 0;
            }

            const newProduct = new Product(id, name, parseFloat(price));
            data.products.push(newProduct);
            return newProduct;
        },
        getTotal: function () {
            let total = 0;
            data.products.forEach(item => {
                total += item.price;
            });
            data.totalPrice = total;
            return {
                totalPrice: data.totalPrice
            }
        },
    }

})();

//UI Controller
const UIController = (function () {
    const Selectors = {
        productList: '#item-list',
        addButton: '.addBtn',
        productName: '#productName',
        productPrice: '#productPrice',
        productCard: '#productCard',
        totalTl: '#total-tl',
        totalDolar: '#total-dolar',
        editBtn: '#editBtn',

    }

    return {
        createProductList: function (products) {
            let html = '';



            products.forEach(prd => {
                html += `
                <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}</td>
                        <td class="text-right">         
                        <i  class="far fa-edit edit-product"></i>
                        </td>
                        </tr>
                        <tr>
                `;

            }
            );
            document.querySelector(Selectors.productList).innerHTML = html;
        },

        getSelectors: function () {
            return Selectors;
        },
        addProduct: function (prd) {
            document.querySelector(Selectors.productCard).style.display = 'block';
            var item = `
            <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price}</td>
                        <td class="text-right">
                                        <i class="far fa-edit edit-product"></i>

                        </td>
                    </tr>
                    <tr>
            `;
            document.querySelector(Selectors.productList).innerHTML += item;
        },
        clearInputs: function () {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';
        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = 'none';
        },
        showTotal: function (total) {
            document.querySelector(Selectors.totalDolar).textContent = total;
            document.querySelector(Selectors.totalTl).textContent = total * 34.
        },
        addProductToForm: function () {
            const selectedProduct = ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value = selectedProduct.name;
            document.querySelector(Selectors.productPrice).value = selectedProduct.price;   
        }

    }


})();


//App Controller
const App = (function (StorageController, ProductController, UIController) {

    const UISelectors = UIController.getSelectors();

    //Load Event Listeners
    const loadEventListeners = function () {
        //add product event
        document.querySelector(UISelectors.addButton).addEventListener('click', productAddSubmit);
        //edit product click
        document.querySelector(UISelectors.productList).addEventListener('click', productEditSubmit);
    }

    const productAddSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            //Add Product
            const newProduct = ProductController.addProduct(productName, productPrice);
            //Add Product to List
            UIController.addProduct(newProduct);

            //get total
            const total = ProductController.getTotal().totalPrice;

            //show total
            UIController.showTotal(total);

            UIController.clearInputs();
        }
        else {
            console.log('Fail');
        }

        e.preventDefault();
    }

    const productEditSubmit = function (e) {

        if (e.target.classList.contains('edit-product')) {
            const id=e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

            //get selected product
            const product = ProductController.getProductById(id);

            //set current product
            ProductController.setCurrentProduct(product);

            //add product to UI
            UIController.addProductToForm(product);
        }

        e.preventDefault();
    }

    return {
        init: function () {
            console.log('App is started');
            const products = ProductController.getProduct();
            if (products.length == 0) {
                UIController.hideCard();
            } else {
                UIController.createProductList(products);
            }

            UIController.createProductList(products);

            loadEventListeners();
        }
    }
})(StorageController, ProductController, UIController);

App.init();