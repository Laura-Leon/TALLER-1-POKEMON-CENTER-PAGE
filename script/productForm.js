const firebaseConfig = {
    apiKey: "AIzaSyCkus2vweQm5TZWEP_rJR8C7VcmC3i9dUI",
    authDomain: "web-store-pokemon-center.firebaseapp.com",
    projectId: "web-store-pokemon-center",
    storageBucket: "web-store-pokemon-center.appspot.com",
    messagingSenderId: "961813282248",
    appId: "1:961813282248:web:995e54bc0a952e2f1e94fd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  const db = firebase.firestore();
const productForm = document.querySelector('.productForm');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormLoading = document.querySelector('.productForm__loading');
const productFormError = document.querySelector('.productForm__error');
const productFormImg = document.querySelector('.productForm__img');


productForm.type.addEventListener('change',function () {
    console.log(productForm.type.value);
})


productForm.image.addEventListener('change', function(){
    var reader = new FileReader();
    reader.onload = function(event){
       productFormImg.classList.remove('hidden');
       productFormImg.setAttribute('src',event.target.result)
    }; 

    reader.readAsDataURL(productForm.image.files[0]);
});
productForm.addEventListener('submit',function(event){
    event.preventDefault();

const product = {
    name: productForm.name.value,
    price: productForm.price.value,
    description: productForm.description.value,
    sizes: [],
    types: [],

};
if(productForm.size_s.checked) product.sizes.push('s');
if(productForm.size_m.checked) product.sizes.push('m');
if(productForm.size_l.checked) product.sizes.push('l');

if(!product.name){
    productFormError.innerText = 'Necesitas nombrar el producto';
    productFormError.classList.remove('hidden');
    return;
} 
if(!product.price){
    productFormError.innerText = 'Necesitas ponerle precio al producto';
    productFormError.classList.remove('hidden');
    return;
} 
if(!product.description){
    productFormError.innerText = 'Necesitas agregar una descripción del producto';
    productFormError.classList.remove('hidden');
    return;
} 



if(!product.type){
    productFormError.innerText = 'Necesitas seleccionar un tipo de producto';
    productFormError.classList.remove('hidden');
    return;
} 
console.log(product);

console.log(productForm.image.files)

return;

 productFormLoading.classList.remove('hidden');
db.collection("products").add(product)
.then(function(docref){
    console.log('document added',docref.id)
    productFormLoading.classList.add('hidden');

    productFormSuccess.classList.remove('hidden');
    })
    .catch(function(error) {
        productFormLoading.classList.add('hidden');
        productFormError.classList.remove('hidden');
        
    });
});