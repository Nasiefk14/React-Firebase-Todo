import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyApw0JZqOVtWekXVWQR0JZM0wjDkLJrXQE",
    authDomain: "react-todo-7dce0.firebaseapp.com",
    projectId: "react-todo-7dce0",
    storageBucket: "react-todo-7dce0.appspot.com",
    messagingSenderId: "1044365723012",
    appId: "1:1044365723012:web:def5753fc0cd6a0fb7c9d1",
    measurementId: "G-3Z3PL09TLF"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export{ db, auth, provider}