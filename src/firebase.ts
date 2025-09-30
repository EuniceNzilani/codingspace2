import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Temporary hardcoded config for testing
const firebaseConfig = {
  apiKey: "AIzaSyAI9b9mNEdagcEKofBZ0odQO-amiIZU_gE",
  authDomain: "odingspace2.firebaseapp.com",
  projectId: "odingspace2",
  storageBucket: "odingspace2.firebasestorage.app",
  messagingSenderId: "928914978949",
  appId: "1:928914978949:web:de391fa568397b85c891ec",
  measurementId: "G-90KJ299QPK",
};

console.log('Firebase config:', firebaseConfig); // Should show all values

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);