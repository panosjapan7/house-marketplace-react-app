import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbc-TflxMiO1TKjM1NHqaflTKW0bgMKhE",
  authDomain: "house-marketplace-react-7a1c9.firebaseapp.com",
  projectId: "house-marketplace-react-7a1c9",
  storageBucket: "house-marketplace-react-7a1c9.appspot.com",
  messagingSenderId: "537471262444",
  appId: "1:537471262444:web:8a3c5881eda24c86c80fc9"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();