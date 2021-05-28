
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
const productDescription = document.querySelector('.description');



//imagenes
const current = document.querySelector('.product__current');
const thumbs1 = document.querySelector('.product__thumb--1');
const thumbs2 = document.querySelector('.product__thumb--2');
const thumbs3 = document.querySelector('.product__thumb--3');
const thumbs4 = document.querySelector('.product__thumb--4');

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
    productDescription.innerText = `${data.description}`;

    thumbs1.setAttribute('src', data.images[0].url);
    thumbs2.setAttribute('src', data.images[1].url);
    thumbs3.setAttribute('src', data.images[2].url);
    thumbs4.setAttribute('src', data.images[3].url);


     //
 const cartBtn = document.querySelector('.product__cartBtn');
 cartBtn.addEventListener('click', function(){
     addToMyCart({
         ...data,
         id: doc.id,
       });
 });


});

//image presentation
const productThumb = document.querySelectorAll('.product__thumb');
productThumb.forEach((imgItem)=>{
    function handleThumbClick(){
        const thumbSrc = imgItem.getAttribute('src');
        productImg.setAttribute('src',thumbSrc);
    }
    imgItem.addEventListener('click',handleThumbClick);

});
//add to cart
