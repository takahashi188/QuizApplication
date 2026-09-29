// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN9BJ8OwvKFJ56AiqXufpP0-XQxKAhkWU",
  authDomain: "quiz-25930.firebaseapp.com",
  projectId: "quiz-25930",
  storageBucket: "quiz-25930.firebasestorage.app",
  messagingSenderId: "322402457960",
  appId: "1:322402457960:web:75c35c6f9487c36f8ddedd",
  measurementId: "G-1W82DRJPKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);