// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { 
    getAuth, onAuthStateChanged, signInWithEmailAndPassword , createUserWithEmailAndPassword , signOut
 } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {getDocs, getFirestore, doc,getDoc, setDoc ,collection, addDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwTEAMPdYPVNqb2Y8qMxYtlspgqVJt8P8",
    authDomain: "loginsignup-88249.firebaseapp.com",
    projectId: "loginsignup-88249",
    storageBucket: "loginsignup-88249.firebasestorage.app",
    messagingSenderId: "170707397317",
    appId: "1:170707397317:web:13fc12e5053e1973965eac",
    measurementId: "G-HXPGJF7CBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {addDoc,getDocs, collection, serverTimestamp, app, signOut, setDoc, getDoc, doc, db, getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword }
