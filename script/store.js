const list = document.querySelector('.list');
const filters = document.querySelector('.filters');

const handleCollectionResult = (querySnapshot) => {
    list.innerHTML='';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('a');
        let img = data.images[0]?.url;
        if (!img) {
            img = './images/placeholder-image.png';
        }
        product.innerHTML = `
            <img class="product__img", src="${img}"alt="">
            <div class="product__info">
             <h1 class=" =product__title">
        ${data.name}
         </h1>
        <h3 class="product__price">$ ${data.price}</h3>
        </div>`;
        product.classList.add('product');
        product.setAttribute('href', '#');
        list.appendChild(product);

    });
}


filters.type.addEventListener('change', function () {
    console.log(filters.type.value);


    let productsCollection = db.collection('products');
    if(filters.type.value){
        productsCollection = productsCollection.where('type','==',filters.type.value)    
    }
 
    productsCollection.get().then(handleCollectionResult);
});


db.collection('products')
    .get()
    .then(handleCollectionResult)

