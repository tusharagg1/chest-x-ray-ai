// import needed externally defined modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// necessary firebase configuration setup
const firebaseConfig = {
  apiKey: "AIzaSyB5RHIQl0a8nzZ2bMUwTMJ6XNYWciBaneM",
  authDomain: "chest-x-ray-ai-f0b4a.firebaseapp.com",
  databaseURL: "https://chest-x-ray-ai-f0b4a-default-rtdb.firebaseio.com",
  projectId: "chest-x-ray-ai-f0b4a",
  storageBucket: "chest-x-ray-ai-f0b4a.appspot.com",
  messagingSenderId: "106488932425",
  appId: "1:106488932425:web:74c67977d47848d27f3798",
  measurementId: "G-085B846RRX",
};

// necessary constants for various firebase functionalities (i.e. auth, database)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
