// ============================================================
//  RUSI MOTORS V2 – Firebase Configuration
//  Replace placeholder values with your Firebase project config
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgg55CUQ0p196KqhAQW6WtB2VROYvsnSI",
  authDomain: "rusi-motors-v2.firebaseapp.com",
  projectId: "rusi-motors-v2",
  storageBucket: "rusi-motors-v2.firebasestorage.app",
  messagingSenderId: "399283633846",
  appId: "1:399283633846:web:e76d3f2f96fbd3adc03017",
  measurementId: "G-EB3T6SLDS9"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

export { auth, db };
