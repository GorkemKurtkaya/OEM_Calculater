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
        getData: function () {
            return data;
        },
        addProduct:function(name,price){
            let id;
            if(data.products.length>0){
                id=data.products[data.products.length-1].id+1;
            }else{
                id=0;
            }

            const newProduct=new Product(id,name,parseFloat(price));
            data.products.push(newProduct);
            return newProduct;
    }
}

})();

//UI Controller
const UIController = (function () {
    const Selectors={
        productList:'#item-list',
        addButton:'.addBtn',
        productName: '#productName',
        productPrice: '#productPrice',
        productCard: '#productCard'

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
                                    <button type="submit" class="btn btn-warning btn-sm">
                                            <i class="far fa-edit"></i>
                                            
                                        </button>
                            </td>
                        </tr>
                        <tr>
                `;

            }
            );
            document.querySelector(Selectors.productList).innerHTML = html;
        },
        
        getSelectors:function(){
            return Selectors;
        },
        addProduct:function(prd){
            document.querySelector(Selectors.productCard).style.display='block';
            var item= `
            <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price}</td>
                        <td class="text-right">
                                <button type="submit" class="btn btn-warning btn-sm">
                                        <i class="far fa-edit"></i>
                                        
                                    </button>
                        </td>
                    </tr>
                    <tr>
            `;
            document.querySelector(Selectors.productList).innerHTML+=item;
        },
        clearInputs:function(){
            document.querySelector(Selectors.productName).value='';
            document.querySelector(Selectors.productPrice).value='';
        },
        hideCard:function(){
            document.querySelector(Selectors.productCard).style.display='none';
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
    }

    const productAddSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            //Add Product
            const newProduct= ProductController.addProduct(productName, productPrice);
            //Add Product to List
            UIController.addProduct(newProduct);

            UIController.clearInputs();
        }
        else {
            console.log('Fail');
        }

        e.preventDefault();
    }

    return {
        init: function () {
            console.log('App is started');
            const products = ProductController.getProduct();
            if(products.length==0){
                UIController.hideCard();
            }else{
                UIController.createProductList(products);
            }

            UIController.createProductList(products);

            loadEventListeners();
        }
    }
})(StorageController, ProductController, UIController);

App.init();