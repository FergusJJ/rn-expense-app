// Import the functions you need from the SDKs you need
import {FIREBASE_CONFIG_API_KEY, FIREBASE_CONFIG_AUTH_DOMAIN, FIREBASE_CONFIG_PROJECT_ID, FIREBASE_CONFIG_STORAGE_BUCKET, FIREBASE_CONFIG_MESSAGING_SENDER_ID, FIREBASE_CONFIG_APP_ID, FIREBASE_CONFIG_MEASUREMENT_ID} from "@env"
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_CONFIG_API_KEY,
  authDomain: FIREBASE_CONFIG_AUTH_DOMAIN,
  projectId: FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: FIREBASE_CONFIG_APP_ID,
  measurementId: FIREBASE_CONFIG_MEASUREMENT_ID
};
console.log(firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authSess = getAuth();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
// const analytics = getAnalytics(app);


