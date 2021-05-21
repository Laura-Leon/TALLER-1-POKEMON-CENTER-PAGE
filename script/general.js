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


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection('users').doc(user.uid).get().then(function(doc){
        loggedUser = doc.data();
        loggedUser.uid = user.uid;
        userAuthChanged(true);

      });
    } else {
      loggedUser = null;
      userAuthChanged(false);
    }
  });