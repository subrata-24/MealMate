// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mealmate-ca7af.firebaseapp.com",
  projectId: "mealmate-ca7af",
  storageBucket: "mealmate-ca7af.firebasestorage.app",
  messagingSenderId: "471084705184",
  appId: "1:471084705184:web:a1e76dc354805bd2c4b0c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
