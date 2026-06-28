"use client";

import { useEffect, useState } from "react";
import KeywordPanel from "@/components/keyword-panel";
import QuestionBoard from "@/components/question-board";
import AuthModal from "@/components/auth-modal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { logout } from "@/lib/auth";
import { User } from "@/lib/types";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("전체");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Firebase Auth 상태 실시간 감지
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || "이름 없음",
          photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.uid}`,
          email: firebaseUser.email || "",
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="flex h-screen w-full overflow-hidden">
      {/* 1단: 키워드 사이드바 (왼쪽) */}
      <aside className="w-64 flex-shrink-0 glass-sidebar hidden md:block">
        <KeywordPanel
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
          user={user}
          onLoginClick={() => setIsAuthModalOpen(true)}
          onLogout={logout}
        />
      </aside>

      {/* 2단: 질문 게시판 (중앙) */}
      <section className="flex-1 flex flex-col min-w-0 bg-transparent">
        <QuestionBoard
          user={user}
          selectedSubject={selectedSubject}
          onLoginRequired={() => setIsAuthModalOpen(true)}
        />
      </section>

      {/* 로그인/회원가입 모달 */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </main>
  );
}
