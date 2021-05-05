
const params = new URLSearchParams(location.search);
const id = params.get('id');

console.log(id);

if(!id){
    location.href = './404.html';
}
const productImg = document.querySelector('.product__img');
const productName = document.querySelector('.product__name');
const productPrice = document.querySelector('.product__price');
const productType = document.querySelector('.product__type');

function getTypeLabel(type){
    switch(type){
        case'typePlush': return 'Peluche';
        case'typeKeyring':return 'Llavero';
    }
    return '';
}
db.collection('products')
.doc(id)
.get()
.then(function(doc){
    console.log(doc.id, doc.data());
    const data = doc.data();

    if(!data){
        location.href = './404.html';
    }

    productImg.setAttribute('src', data.images[0].url);
    productName.innerText = data.name;
    productPrice.innerText = `$ ${data.price}`;
    productType.innerHTML =`type:<strong>${getTypeLabel(data.type)}</strong>`;
});