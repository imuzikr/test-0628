import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const isFirebaseConfigured = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined";

let app: FirebaseApp | undefined;
let db: any;
let auth: any;

if (isFirebaseConfigured) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
} else {
    if (typeof window !== "undefined") {
        console.warn("Firebase API Key가 설정되지 않았습니다. 프런트엔드 확인용 Mock 모드로 동작합니다.");
    }
    db = {}; // Firestore Mock
    auth = {}; // Auth Mock
}

export { app, db, auth, isFirebaseConfigured };
