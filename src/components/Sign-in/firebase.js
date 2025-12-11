// firebase.js - CORRECTED VERSION (Recommended)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBB8A_t7NysIG8r_CYXa_OVswx7NRJUIEo",
  authDomain: "lms-tech-ad475.firebaseapp.com",
  projectId: "lms-tech-ad475",
  storageBucket: "lms-tech-ad475.firebasestorage.app",
  messagingSenderId: "432036093755",
  appId: "1:432036093755:web:ead64a02c40c51a260a11e",
  measurementId: "G-E6LFFTY16G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export individually
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();