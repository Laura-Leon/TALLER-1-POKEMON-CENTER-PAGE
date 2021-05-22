const list = document.querySelector('.list');
console.log(loggedUser);
let cart = [];
const cartBtnNumber = document.querySelector('.cartBtn span');

const cartFromLS = localStorage.getItem('store__cart');
if(cartFromLS){
    cart = JSON.parse(cartFromLS);
    cartBtnNumber.innerText = cart.length;
}

const handleCollectionResult = (querySnapshot) => {
    list.innerHTML='';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('div');
        let img = data.images[0]?.url;
        if (!img) {
            img = './images/placeholder-image.png';
        }
        product.innerHTML = `
        <a class = "product" href="./product.html?id=${doc.id}&name=${data.name}" >
            <img class="product__img", src="${img}"alt="">
            <div class="product__info">
             <h1 class=" =product__title">
        ${data.name}
         </h1>
        <h3 class="product__price">$ ${data.price}</h3>
        </div>
        </a>
        <button class =" hidden showLoggedAdmin">delete</button>
        <button class= "product__cartBtn">Agregar al carrito</button>
        `;
       
        list.appendChild(product);

        const cartBtn = product.querySelector('.product__cartBtn');
        cartBtn.addEventListener('click', function(){
            cart.push(data);
            localStorage.setItem('store__cart',JSON.stringify(cart));
            cartBtnNumber.innerText = cart.length;
            console.log(cart.length, cartBtnNumber);
        });
    });
}

const filters = document.querySelector('.filters');
const sort = document.querySelector('.formcontainer');

filters.addEventListener('change', function () {
    console.log(filters.type.value);
    let productsCollection = db.collection('products');
    if(filters.type.value){
        productsCollection = productsCollection.where('type','==',filters.type.value);    
    }

    const types = [];
    filters.testType.forEach(function(checkbox){
        if(checkbox.checked){
            types.push(checkbox.getAttribute('data-type'));   
        }
    });
    if(types.length > 0){
        productsCollection = productsCollection.where('type', 'in',types);
    }

 
    if(filters.price.value){
        switch(filters.price.value){
            case '0': 
            productsCollection = productsCollection.where('price','<',10); 
            break;
            case '1': 
            productsCollection = productsCollection.where('price','>=',10); 
            productsCollection = productsCollection.where('price','<',30); 

            break;
            case '2': 
            productsCollection = productsCollection.where('price','>=',30); 
            break;   
        }
      
    }

    if(filters.pokecollection.value){
        productsCollection = productsCollection.where('pokecollection','==',filters.pokecollection.value);    
    }


    if(filters.order.value){
        switch(filters.order.value){
            case 'price_asc': 
            productsCollection = productsCollection.orderBy('price','asc'); 
            break;
            case 'price_desc': 
            productsCollection = productsCollection.orderBy('price','desc'); 
            break;
            case 'Alpha': 
            if(filters.price.value){
                productsCollection = productsCollection.orderBy('price','asc');
            }
            productsCollection = productsCollection.orderBy('name','asc'); 
            break;   
        }
    }
    
    productsCollection.get().then(handleCollectionResult);
});

/*
sort.addEventListener('change', function () {

    let productsCollection = db.collection('products');



    if(sort.order.value){
        switch(sort.order.value){
            case 'price_asc': 
            productsCollection = productsCollection.orderBy('price','asc'); 
            break;
            case 'price_desc': 
            productsCollection = productsCollection.orderBy('price','desc'); 
            break;
            case 'Alpha': 
            /*
            if(sort.price.value){
                productsCollection = productsCollection.orderBy('price','asc');
            }
            productsCollection = productsCollection.orderBy('name','asc'); 
            break;   
        }
    }
    productsCollection.get().then(handleCollectionResult);

});
*/

let productsCollection = db.collection('products')
const params = new URLSearchParams(location.search);
if(params.get('type')){
    productsCollection= productsCollection.where('type','==',params.get('type'));
}
if(params.get('pokecollection')){
    productsCollection= productsCollection.where('pokecollection','==',params.get('pokecollection'));
}
productsCollection.get().then(handleCollectionResult);

