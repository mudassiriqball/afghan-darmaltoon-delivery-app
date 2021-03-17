import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyAOd25x502YhekxnK9TytjdzfGooB5wKts",
    authDomain: "afghan-darmal-toon.firebaseapp.com",
    projectId: "afghan-darmal-toon",
    storageBucket: "afghan-darmal-toon.appspot.com",
    messagingSenderId: "262178561866",
    appId: "1:262178561866:web:615a0f10f569ff1e03abb3",
    measurementId: "G-XPQ222FQ4Z"
};
// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    // console.log('Fire base error:', err)
}

export default firebase;