
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const apikey = import.meta.env.VITE_FIREBASE_API_KEY;

const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;
const measurementId = import.meta.env.VITE_FIREBASE_MEASURMENT_ID;

    const firebaseConfig = {
        apiKey: apikey,
        authDomain: authDomain,
        projectId: projectId,
        storageBucket: storageBucket,
        messagingSenderId: messagingSenderId,
        appId: appId,
        measurementId: measurementId
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;