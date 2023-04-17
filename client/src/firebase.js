// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAljihOCOzCjzc1PL9uh0izchyhj267eZk",
  authDomain: "videoshare-95ca1.firebaseapp.com",
  projectId: "videoshare-95ca1",
  storageBucket: "videoshare-95ca1.appspot.com",
  messagingSenderId: "168372661595",
  appId: "1:168372661595:web:75cbcbdd5563089314be7e",
  measurementId: "G-Y35BPFXLPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;