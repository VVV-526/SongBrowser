// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import withFirebaseAuth from "react-with-firebase-auth"


const firebaseConfig = {
  apiKey: "AIzaSyBxo4IIZTAtrqULzBSCpbZk475GWFd7Id0",
  authDomain: "song-browser.firebaseapp.com",
  projectId: "song-browser",
  storageBucket: "song-browser.appspot.com",
  messagingSenderId: "235420055008",
  appId: "1:235420055008:web:f072664ded8f7383026785",
  measurementId: "G-NMCLM4RNMS"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app)

const providers = {
  googleProvider: new GoogleAuthProvider(),
}

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
})

const signInWithGoogle = () => {
  signInWithPopup(auth, providers.googleProvider)
}

const signOutFirebase = () => {
  signOut(auth)
}

export {
  db,
  app,
  auth,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase as signOut,
}

