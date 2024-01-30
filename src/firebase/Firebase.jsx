import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYIDY4FS6xXN7eO__bepBh44-Qu9ITz9Q",
  authDomain: "personal-blogs-a3bbb.firebaseapp.com",
  projectId: "personal-blogs-a3bbb",
  storageBucket: "personal-blogs-a3bbb.appspot.com",
  messagingSenderId: "127806095418",
  appId: "1:127806095418:web:c843ce0831e15f6979f503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const dataCollection = collection(db, "comments-details")