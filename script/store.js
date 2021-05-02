
const list = document.querySelector('.list');
function handleProductItem (item){
    const product = document.createElement('a');
    product.innerHTML = `
    <img class="product__img", src="${item.img}"alt="">
    <div class="product__info">
        <h1 class=" =product__title">
            ${item.title}
        </h1>
        <h3 class="product__price">$ ${item.price}</h3>
    </div>`;
    product.classList.add('product');
    product.setAttribute('href','#');
list.appendChild(product);
}
products.forEach(handleProductItem)