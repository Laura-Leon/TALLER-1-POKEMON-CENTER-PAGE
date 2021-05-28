const list = document.querySelector('.list');

const handleCollectionResult = (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement('div');
        let img = data.images[0]?.url;
        if (!img) {
            img = './images/placeholder-image.png';
        }
        product.innerHTML = `
        <div class="Prodcontainer">
        <a class = "product" href="./product.html?id=${doc.id}&name=${data.name}" >
            <img class="product__img", src="${img}"alt="">
            <div class="product__info">
             <h1 class=" =product__title">
        ${data.name}
         </h1>
        <h3 class="product__price">$ ${data.price}</h3>
        </div>
       
        </a>
        <button class= "product__cartBtn">Agregar al carrito</button>
        <button class ="product__deleteBtn hidden showLoggedAdmin"><img class="product__img", src="/images/delete.svg"alt=""></button>
   </div>
        `;

        list.appendChild(product);

        //deletebutton
        const deleteBtn = product.querySelector('.product__deleteBtn');
        deleteBtn.addEventListener('click', function () {
            //delete element
            db.collection('products').doc(doc.id).delete()
                .then(() => {
                    console.log("Document successfully deleted!");

                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
        });
        //
        const cartBtn = product.querySelector('.product__cartBtn');
        cartBtn.addEventListener('click', function () {
            addToMyCart({
                ...data,
                id: doc.id,
            });
        });
    });
}

const filters = document.querySelector('.filters');

filters.addEventListener('change', function () {

    let productsCollection = db.collection('products');
    if (filters.type.value) {
        productsCollection = productsCollection.where('type', '==', filters.type.value);
    }

    const types = [];

    if (types.length > 0) {
        productsCollection = productsCollection.where('type', 'in', types);
    }


    if (filters.price.value) {
        switch (filters.price.value) {
            case '0':
                productsCollection = productsCollection.where('price', '<', 10);
                break;
            case '1':
                productsCollection = productsCollection.where('price', '>=', 10);
                productsCollection = productsCollection.where('price', '<', 30);

                break;
            case '2':
                productsCollection = productsCollection.where('price', '>=', 30);
                break;
        }

    }

    if (filters.pokecollection.value) {
        productsCollection = productsCollection.where('pokecollection', '==', filters.pokecollection.value);
    }


    if (filters.order.value) {
        switch (filters.order.value) {
            case 'price_asc':
                productsCollection = productsCollection.orderBy('price', 'asc');
                break;
            case 'price_desc':
                productsCollection = productsCollection.orderBy('price', 'desc');
                break;
            case 'Alpha':
                if (filters.price.value) {
                    productsCollection = productsCollection.orderBy('price', 'asc');
                }
                productsCollection = productsCollection.orderBy('name', 'asc');
                break;
        }
    }

    productsCollection.get().then(handleCollectionResult);
});


let productsCollection = db.collection('products')
const params = new URLSearchParams(location.search);
if (params.get('type')) {
    productsCollection = productsCollection.where('type', '==', params.get('type'));
}
if (params.get('pokecollection')) {
    productsCollection = productsCollection.where('pokecollection', '==', params.get('pokecollection'));
}
productsCollection.get().then(handleCollectionResult);
