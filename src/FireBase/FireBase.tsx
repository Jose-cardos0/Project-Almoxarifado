// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkCywbd88bvthNjGEXFfMFstnjEDX3ZPE",
  authDomain: "curso-55a92.firebaseapp.com",
  projectId: "curso-55a92",
  storageBucket: "curso-55a92.appspot.com",
  messagingSenderId: "958192175702",
  appId: "1:958192175702:web:39a4c655a9fefa078d49f7",
  measurementId: "G-7MMKG1Y9QY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
