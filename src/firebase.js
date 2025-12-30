import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA4LWNLQbMAulJJUhwo_G5DnloaS9ino0M",
    authDomain: "algorithmst26.firebaseapp.com",
    databaseURL: "https://algorithmst26-default-rtdb.firebaseio.com",
    projectId: "algorithmst26",
    storageBucket: "algorithmst26.firebasestorage.app",
    messagingSenderId: "64877873834",
    appId: "1:64877873834:web:f050fab7fb76b4fc8c9ed3",
    measurementId: "G-S80KPPL0CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
