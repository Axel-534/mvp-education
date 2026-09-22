import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyDDGu4BmFg9-XR7dbwPEMxYzHYiOBPBnDE",
  authDomain: "plateforme-educative-ia.firebaseapp.com",
  projectId: "plateforme-educative-ia",
  storageBucket: "plateforme-educative-ia.firebasestorage.app",
  messagingSenderId: "629337192460",
  appId: "1:629337192460:web:f3e5df1c6cbfcb0598d629"
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);

// Exporte les services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

