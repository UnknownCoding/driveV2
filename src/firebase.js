// Import the functions you need from the SDKs you need
import { initializeApp , getApp, getApps} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbGS8BEOl4CgnLRLoe-oR4xQLhSGaX9wA",
    authDomain: "drivev2-74854.firebaseapp.com",
    projectId: "drivev2-74854",
    storageBucket: "drivev2-74854.appspot.com",
    messagingSenderId: "997093960377",
    appId: "1:997093960377:web:840850b73434cb5f634968"
};

// Initialize Firebase
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp() ;
const db = getFirestore();
const storage= getStorage();
const auth = getAuth();
const provider = new GoogleAuthProvider;


export {app,db,storage,auth,provider}