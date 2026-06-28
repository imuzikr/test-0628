import { Question, Answer, Notice } from "./types";

// --- Mock Data ---
const MOCK_QUESTIONS: Question[] = [
    {
        id: "q_01",
        authorId: "user_02",
        authorName: "화학마스터",
        authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky",
        title: "아보가드로 수와 몰 개념이 헷갈려요",
        content: "1몰이 탄소 12g에 들어있는 원자 수인 건 알겠는데, 기체 1몰의 부피가 22.4L가 되는 이유가 아보가드로 법칙과 어떻게 연결되는지 잘 이해가 안 갑니다. 설명 부탁드려요!",
        subject: "화학의 첫걸음",
        answerCount: 1,
        createdAt: { toDate: () => new Date(Date.now() - 1000 * 60 * 60 * 2) }
    },
    {
        id: "q_02",
        authorId: "user_03",
        authorName: "원자러버",
        authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bear",
        title: "훈트 규칙과 쌓음 원리 질문",
        content: "붕소(B)의 전자 배치를 할 때 훈트 규칙과 쌓음 원리, 파울리 배타 원리 중에서 무엇이 먼저 고려되어야 하나요? 전자 배치 순서가 헷갈려 질문 올립니다.",
        subject: "원자의 구조",
        answerCount: 0,
        createdAt: { toDate: () => new Date(Date.now() - 1000 * 60 * 60 * 5) }
    }
];

const MOCK_NOTICES: Notice[] = [
    {
        id: "n_01",
        title: "화학 Q&A 게시판 오픈!",
        content: "고등학교 화학 I 공부 중 헷갈리거나 어려운 개념을 자유롭게 질문하고 답변을 달아주세요.",
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
