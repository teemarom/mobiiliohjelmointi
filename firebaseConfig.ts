// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxdiwxZLhrHLV0NBx99Jy6pj8g0BX3pv8",
  authDomain: "my-app-firebase-7df31.firebaseapp.com",
  databaseURL: "https://my-app-firebase-7df31-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-app-firebase-7df31",
  storageBucket: "my-app-firebase-7df31.firebasestorage.app",
  messagingSenderId: "199798594979",
  appId: "1:199798594979:web:8cee2084d5c92882814e16"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);