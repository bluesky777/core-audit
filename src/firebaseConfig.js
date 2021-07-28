import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBPYtbGHUFoQneYcQwlR2vmCSVq3Wwk_bE",
  authDomain: "medicina-app-3ef15.firebaseapp.com",
  projectId: "medicina-app-3ef15",
  storageBucket: "medicina-app-3ef15.appspot.com",
  messagingSenderId: "202829388483",
  appId: "1:202829388483:web:11b84fdecab620a369a076"
};


firebase.initializeApp(firebaseConfig)

export const firebaseAuth = firebase.auth();
export const firestoreDB = firebase.firestore();
