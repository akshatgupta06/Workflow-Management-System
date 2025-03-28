import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLvsdAmmWyi2-3rQqJ55M4WEzuEjRxmPo",
  authDomain: "workflow-6a90f.firebaseapp.com",
  projectId: "workflow-6a90f",
  storageBucket: "workflow-6a90f.appspot.com",
  messagingSenderId: "925159297985",
  appId: "1:925159297985:web:04fc650bdb4e80513fd540",
  measurementId: "G-4GVV97BSBL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
};
