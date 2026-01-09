// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbUj73yf2V63yzFWvICG5-RaJM20oIgMk",
  authDomain: "puntmate-413c6.firebaseapp.com",
  projectId: "puntmate-413c6",
  storageBucket: "puntmate-413c6.firebasestorage.app",
  messagingSenderId: "176198912298",
  appId: "1:176198912298:web:3560dbc6d077eddb18b653",
  measurementId: "G-1RPXMTRR29"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { messaging };


















// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBbUj73yf2V63yzFWvICG5-RaJM20oIgMk",
//   authDomain: "puntmate-413c6.firebaseapp.com",
//   projectId: "puntmate-413c6",
//   storageBucket: "puntmate-413c6.firebasestorage.app",
//   messagingSenderId: "176198912298",
//   appId: "1:176198912298:web:3560dbc6d077eddb18b653",
//   measurementId: "G-1RPXMTRR29"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);