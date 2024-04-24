// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCBLTOg_kAtozDLP5DsBsLcmlU4TM-5has",
  authDomain: "shop-from-home-d5c19.firebaseapp.com",
  projectId: "shop-from-home-d5c19",
  storageBucket: "shop-from-home-d5c19.appspot.com",
  messagingSenderId: "884923807611",
  appId: "1:884923807611:web:74b64aa2e8d9299266efde",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const messaging = getMessaging(app);

export { messaging };
export default app;
