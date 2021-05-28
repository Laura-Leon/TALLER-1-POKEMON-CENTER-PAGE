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

const db = firebase.firestore();
const storage = firebase.storage();

let loggedUser = null;

const setLoggedUser = (info, id) => {
  loggedUser = info;
  loggedUser.uid = id;
  userAuthChanged(true);
  if(typeof checkProductFormAdmin !== 'undefined') checkProductFormAdmin();
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(function (doc) {
      if(!doc.data()) return;
      setLoggedUser(doc.data(), user.uid);
    });
    getMyCart(user.uid);
  } else {
    loggedUser = null;
    cart = [];
    userAuthChanged(false);
  }
});

let cart = [];
const cartBtnNumber = document.querySelector('.cartBtn span');
const CART_COLLECTION = db.collection('cart');
const ORDERS_COLLECTION = db.collection('orders');

const addToMyCart = (product) => {
  cart.push(product);
  CART_COLLECTION.doc(loggedUser.uid).set({
    cart,
  });
  cartBtnNumber.innerText = cart.length;
};

let renderCart = null;

const getMyCart = (uid) => {
  CART_COLLECTION.doc(uid).get().then(snapShot => {
    const data = snapShot.data();
    if(!data) return;
    if(cartBtnNumber) cartBtnNumber.innerText = data.cart.length;
    cart = data.cart;
    if(renderCart) renderCart();
  });
}
