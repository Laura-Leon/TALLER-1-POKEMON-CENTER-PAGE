
const productForm = document.querySelector('.productForm');
const productFormSuccess = document.querySelector('.productForm__success');
const productFormLoading = document.querySelector('.productForm__loading');
const productFormError = document.querySelector('.productForm__error');
const productFormImages = document.querySelector('.productForm__images');

const imageFiles = [];


productForm.type.addEventListener('change', function () {
    console.log(productForm.type.value);
})


productForm.image.addEventListener('change', function () {
    const file = productForm.image.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (event) {
        const productFormImg = document.createElement('img');
        productFormImg.classList.add('productForm__img');
        productFormImg.setAttribute('src', event.target.result);
        productFormImages.appendChild(productFormImg);
    }

    reader.readAsDataURL(file);
    imageFiles.push(file);
});
productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const product = {
        name: productForm.name.value,
        price: parseFloat(productForm.price.value),
        description: productForm.description.value,
        sizes: [],
        type: productForm.type.value,

    };
    if (productForm.size_s.checked) product.sizes.push('s');
    if (productForm.size_m.checked) product.sizes.push('m');
    if (productForm.size_l.checked) product.sizes.push('l');

    if (!product.name) {
        productFormError.innerText = 'Necesitas nombrar el producto';
        productFormError.classList.remove('hidden');
        return;
    }
    if (!product.price) {
        productFormError.innerText = 'Necesitas ponerle precio al producto';
        productFormError.classList.remove('hidden');
        return;
    }
    if (!product.description) {
        productFormError.innerText = 'Necesitas agregar una descripción del producto';
        productFormError.classList.remove('hidden');
        return;
    }
    if (!product.type) {
        productFormError.innerText = 'Necesitas seleccionar un tipo de producto';
        productFormError.classList.remove('hidden');
        return;
    }
        console.log(product);

        console.log(productForm.image.files);


        console.log(imageFiles);

        productFormLoading.classList.remove('hidden');
        productFormError.classList.add('hidden');

        const genericCatch = function (error) {
            productFormLoading.classList.add('hidden');
            productFormError.classList.remove('hidden');
            productFormError.innerHTML = "Ocurrió un error al subir el producto";
        }

    //espera a subir la información al firestore
    db.collection("products").add(product)
        .then(function (docRef) {

            const uploadPromises = [];
            const downloadUrlpromises = [];

            imageFiles.forEach(function (file) {
                var storageRef = firebase.storage().ref();
                var fileRef = storageRef.child(`products/${docRef.id}/${file.name}`);
                //esperamos a subir la imagen
                uploadPromises.push(fileRef.put(file));
            });
            Promise.all(uploadPromises).then(function (snapshots) {
                snapshots.forEach(function (snapshot) {

                    //esperamos a tener url de descarga de la imagen
                    downloadUrlpromises.push(snapshot.ref.getDownloadURL());
                });

                Promise.all(downloadUrlpromises).then(function (downloadURLs) {
                    const images = [];
                    downloadURLs.forEach(function (url, index) {
                        images.push({
                            url: url,
                            ref: snapshots[index].ref.fullPath
                        });
                    });

                    console.log(downloadURLs);
                    db.collection('products').doc(docRef.id).update({
                        images: images
                    }).then(function () {
                        productFormLoading.classList.add('hidden');
                        productFormSuccess.classList.remove('hidden');

                    })
                    .catch(genericCatch);;
                })
                .catch(genericCatch);;
            })
            .catch(genericCatch);
        })
        .catch(genericCatch);
});