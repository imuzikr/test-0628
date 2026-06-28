import { Question, Answer, Notice } from "./types";
import { db } from "./firebase";
import { 
    collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    doc, 
    query, 
    where, 
    orderBy, 
    serverTimestamp,
    updateDoc,
    increment
} from "firebase/firestore";

// --- Firestore CRUD (Connected with Firebase Firestore) ---

export async function getQuestions(subject?: string) {
    try {
        const questionsCol = collection(db, "questions");
        let q = query(questionsCol, orderBy("createdAt", "desc"));
        if (subject && subject !== "전체") {
            q = query(questionsCol, where("subject", "==", subject), orderBy("createdAt", "desc"));
        }
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                // serverTimestamp가 로컬 클라이언트에서 아직 null일 경우 대비
                createdAt: data.createdAt ? data.createdAt : { toDate: () => new Date() }
            };
        }) as Question[];
    } catch (error) {
        console.error("질문 목록 가져오기 에러:", error);
        return [];
    }
}

export async function addQuestion(data: any) {
    try {
        const questionsCol = collection(db, "questions");
        const docRef = await addDoc(questionsCol, {
            ...data,
            answerCount: 0,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("질문 등록 에러:", error);
        throw error;
    }
}

export async function getQuestion(id: string) {
    try {
        const docRef = doc(db, "questions", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                ...data,
                createdAt: data.createdAt ? data.createdAt : { toDate: () => new Date() }
            } as Question;
        }
        return null;
    } catch (error) {
        console.error("질문 상세 조회 에러:", error);
        return null;
    }
}

export async function getAnswers(questionId: string) {
    try {
        const answersCol = collection(db, "questions", questionId, "answers");
        const q = query(answersCol, orderBy("createdAt", "asc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt ? data.createdAt : { toDate: () => new Date() }
            };
        }) as Answer[];
    } catch (error) {
        console.error("답변 가져오기 에러:", error);
        return [];
    }
}

export async function addAnswer(questionId: string, data: any) {
    try {
        const answersCol = collection(db, "questions", questionId, "answers");
        const docRef = await addDoc(answersCol, {
            ...data,
            createdAt: serverTimestamp()
        });
        
        // 질문의 답변 수 카운트 증가
        const questionRef = doc(db, "questions", questionId);
        await updateDoc(questionRef, {
            answerCount: increment(1)
        });
        
        return docRef.id;
    } catch (error) {
        console.error("답변 등록 에러:", error);
        throw error;
    }
}

export async function getNotices() {
    try {
        const noticesCol = collection(db, "notices");
        const q = query(noticesCol, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt ? data.createdAt : { toDate: () => new Date() }
            };
        }) as Notice[];
    } catch (error) {
        console.error("공지사항 가져오기 에러:", error);
        return [];
    }
}
