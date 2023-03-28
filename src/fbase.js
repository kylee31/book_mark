// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwao2Y3iyWqvEQYJ9wSMzmzLjTrBQaLYU",
    authDomain: "book-mark-db594.firebaseapp.com",
    projectId: "book-mark-db594",
    storageBucket: "book-mark-db594.appspot.com",
    messagingSenderId: "684468139110",
    appId: "1:684468139110:web:ecce4128a6c92ac9b1a9a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const db = getFirestore(app);