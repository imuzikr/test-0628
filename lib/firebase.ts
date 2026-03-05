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

// 프런트엔드 우선 확인을 위해, API Key가 없으면 가짜(Mock) 객체로 초기화를 지연합니다.
let app: FirebaseApp | undefined;
let db: any = {}; // Firestore Mock
let auth: any = {}; // Auth Mock

const isFirebaseConfigured = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "undefined";

if (typeof window !== "undefined") {
    if (isFirebaseConfigured) {
        app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
    } else {
        console.warn("Firebase API Key가 설정되지 않았습니다. 프런트엔드 확인용 Mock 모드로 동작합니다.");
    }
}

export { app, db, auth, isFirebaseConfigured };
