// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvpGQE1zpPY_6xNOxxqGHYAV2ghDuoB_0",
  authDomain: "linkit-project.firebaseapp.com",
  projectId: "linkit-project",
  storageBucket: "linkit-project.appspot.com",
  messagingSenderId: "25480455134",
  appId: "1:25480455134:web:dec86d6fbe5aef35e9334f",
  measurementId: "G-M6F6EHLMX7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
