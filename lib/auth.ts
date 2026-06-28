import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import { auth } from "./firebase";

// 이메일 회원가입
export async function registerWithEmail(email: string, password: string, displayName: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 닉네임(displayName) 설정 및 기본 프로필 설정
    await updateProfile(user, {
        displayName: displayName,
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
    });
    
    return user;
}

// 이메일 로그인
export async function loginWithEmail(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

// 구글 로그인
export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
}

// 로그아웃
export async function logout() {
    await signOut(auth);
}
