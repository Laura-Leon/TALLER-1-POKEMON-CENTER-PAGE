const list = document.querySelector('.orderList');



const handleCollectionResultz = (querySnapshot) => {
    list.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const customer = document.createElement('div');
     
        customer.innerHTML = `
        <div class="Prodcontainer">
       


             <h1 class=" =product__title">
        ${data.uid}
         </h1>
        <h3 class="product__price">$ ${data.total}</h3>
       

   </div>
        `;

        list.appendChild(customer);

    });
}

let ordersCollections = db.collection('orders')

ordersCollection.get().then(handleCollectionResultz);