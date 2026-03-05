import { Question, Answer, Notice } from "./types";

// --- Mock Data ---
const MOCK_QUESTIONS: Question[] = [
    {
        id: "q_01",
        authorId: "user_02",
        authorName: "공부왕",
        authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky",
        title: "미적분학 기본 정리 질문입니다!",
        content: "이 부분 증명이 잘 이해가 안 가요. 미분계수의 정의를 사용해서 설명해 주실 분 계신가요?",
        subject: "수학",
        answerCount: 1,
        createdAt: { toDate: () => new Date(Date.now() - 1000 * 60 * 60 * 2) }
    },
    {
        id: "q_02",
        authorId: "user_03",
        authorName: "언어의술사",
        authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bear",
        title: "고전시가 '동동'에서 화자의 정서가 어떤가요?",
        content: "각 월마다 정서가 조금씩 변하는 것 같은데 핵심 키워드가 궁금합니다.",
        subject: "국어",
        answerCount: 0,
        createdAt: { toDate: () => new Date(Date.now() - 1000 * 60 * 60 * 5) }
    }
];

const MOCK_NOTICES: Notice[] = [
    {
        id: "n_01",
        title: "1학기 기말고사 기간 안내",
        content: "기말고사 기간에는 질문 답변이 더 활발해질 것으로 예상됩니다. 매너를 지켜주세요!",
        pinned: true,
        createdAt: { toDate: () => new Date() }
    }
];

// --- Firestore CRUD (Mocked for Frontend Review) ---

export async function getQuestions(subject?: string) {
    // 실제 DB 연결 대신 목 데이터를 반환하여 프런트엔드 먼저 확인
    await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 효과
    if (subject && subject !== "전체") {
        return MOCK_QUESTIONS.filter(q => q.subject === subject);
    }
    return MOCK_QUESTIONS;
}

export async function addQuestion(data: any) {
    console.log("질문 등록 (Mock):", data);
    return "mock_id";
}

export async function getQuestion(id: string) {
    return MOCK_QUESTIONS.find(q => q.id === id) || null;
}

export async function getAnswers(questionId: string) {
    return [
        {
            id: "a_01",
            authorId: "user_01",
            authorName: "테스트학생",
            content: "그 부분은 정적분의 정의를 먼저 살펴보시면 이해가 빠를 거예요!",
            helpfulCount: 2,
            createdAt: { toDate: () => new Date() }
        }
    ];
}

export async function addAnswer(questionId: string, data: any) {
    console.log("답변 등록 (Mock):", data);
    return "mock_ans_id";
}

export async function getNotices() {
    return MOCK_NOTICES;
}
