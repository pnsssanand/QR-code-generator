
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDC5yNTakozkLTineBF4iChUWnKtv853UM",
  authDomain: "qr-code-generator-e2cd4.firebaseapp.com",
  projectId: "qr-code-generator-e2cd4",
  storageBucket: "qr-code-generator-e2cd4.firebasestorage.app",
  messagingSenderId: "400161142121",
  appId: "1:400161142121:web:55912716199daf707539f8",
  measurementId: "G-TLVSKF1EXN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
