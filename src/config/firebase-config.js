// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuxbwtmf6W_KVL7Ue78DXiB6HmTRlkk4I",
  authDomain: "expense-tracker-1dc57.firebaseapp.com",
  projectId: "expense-tracker-1dc57",
  storageBucket: "expense-tracker-1dc57.appspot.com",
  messagingSenderId: "73475351514",
  appId: "1:73475351514:web:7b738b41ce8bc6cd5e96e3",
  measurementId: "G-ZBB5WYF4ZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//we write by ouer own
export const auth= getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app) //making a reference to our database