// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// 인증을 위해 사용
import 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB70iLiOPlvgMBba7_lQX8rFPWl2UTbyjk",
  authDomain: "react-native-todo-app-df733.firebaseapp.com",
  projectId: "react-native-todo-app-df733",
  storageBucket: "react-native-todo-app-df733.appspot.com",
  messagingSenderId: "151826102351",
  appId: "1:151826102351:web:33b24bc5295379eb9d923a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;