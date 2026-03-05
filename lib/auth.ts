import { User } from "./types";

/**
 * 현재 로그인된 사용자를 반환하는 헬퍼 함수입니다.
 * 개발 초기 단계에서는 테스트 유저(user_01)를 반환하도록 설정되어 있습니다.
 * 나중에 실제 Firebase Auth를 연동할 때 이 부분만 수정하면 됩니다.
 */
export function getCurrentUser(): User {
    return {
        uid: "user_01",
        displayName: "테스트학생",
        photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=user_01",
        email: "test@school.edu",
    };
}
