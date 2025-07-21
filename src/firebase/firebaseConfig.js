// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-n-08UCHb7UZFUSAtwyHhOTjMd-4PvMQ",
  authDomain: "fullstack-mern-blog-d2c6c.firebaseapp.com",
  projectId: "fullstack-mern-blog-d2c6c",
  storageBucket: "fullstack-mern-blog-d2c6c.appspot.com", // ✅ Fixed here
  messagingSenderId: "409635510385",
  appId: "1:409635510385:web:08f970f4554ff8fc46e3d0",
  measurementId: "G-9GPW81K8MV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseStorage = getStorage(app);

// Export what you need
export { app, analytics, firebaseStorage };
