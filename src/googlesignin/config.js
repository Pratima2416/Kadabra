import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDfNyeRaYsbvBE7DBEACV4MZ9dIgPAIyoU",
  authDomain: "kadabra-be13c.firebaseapp.com",
  projectId: "kadabra-be13c",
  storageBucket: "kadabra-be13c.appspot.com",
  messagingSenderId: "443882540086",
  appId: "1:443882540086:web:09038838f72c34fe75dc97",
  measurementId: "G-GPQD0S91TX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com');
export {auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, appleProvider};