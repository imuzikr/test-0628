"use client";

import { useEffect, useState } from "react";
import KeywordPanel from "@/components/keyword-panel";
import QuestionBoard from "@/components/question-board";
import { getCurrentUser } from "@/lib/auth";
import { User } from "@/lib/types";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("전체");

  useEffect(() => {
    // 임시 테스트 유저 로드
    setUser(getCurrentUser());
  }, []);

  return (
    <main className="flex h-screen w-full overflow-hidden">
      {/* 1단: 키워드 사이드바 (왼쪽) */}
      <aside className="w-64 flex-shrink-0 glass-sidebar hidden md:block">
        <KeywordPanel
          selectedSubject={selectedSubject}
          onSelectSubject={setSelectedSubject}
        />
      </aside>

      {/* 2단: 질문 게시판 (중앙) */}
      <section className="flex-1 flex flex-col min-w-0 bg-transparent">
        <QuestionBoard
          user={user}
          selectedSubject={selectedSubject}
        />
      </section>

    </main>
  );
}
