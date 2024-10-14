//Storage Controller
const StorageController=(function(){

})();


// Product Controller
const ProductContreller=(function(){

})();

//UI Controller
const UIController=(function(){


})();


//App Controller
const App=(function(StorageController,ProductContreller,UIController){
    return{
        init:function(){
            console.log('App is running');
        }
    }
})(StorageController,ProductContreller,UIController);