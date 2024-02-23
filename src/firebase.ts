import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore'; 
import { getDatabase, ref, set } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyCHBGCf93Ic0sjlL4Gnnh-JE8OzTEcMWcU",
  authDomain: "lyse-shop.firebaseapp.com",
  projectId: "lyse-shop",
  storageBucket: "lyse-shop.appspot.com",
  messagingSenderId: "954017959648",
  appId: "1:954017959648:web:ba512cc472f6af73ef4a85", 
  databaseURL: 'https://lyse-shop-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const dbRealtime = getDatabase(app) 

export const productsRef = collection(db, 'products')
export const cartRef = ref(dbRealtime, "cart")
