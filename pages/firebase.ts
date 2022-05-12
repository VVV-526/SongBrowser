// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyBxo4IIZTAtrqULzBSCpbZk475GWFd7Id0",
  authDomain: "song-browser.firebaseapp.com",
  projectId: "song-browser",
  storageBucket: "song-browser.appspot.com",
  messagingSenderId: "235420055008",
  appId: "1:235420055008:web:f072664ded8f7383026785",
  measurementId: "G-NMCLM4RNMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db, app }