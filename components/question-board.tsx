"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import QuestionCard from "./question-card";
import QuestionModal from "./question-modal";
import { Question, User } from "@/lib/types";
import { getQuestions } from "@/lib/firestore";

interface QuestionBoardProps {
    user: User | null;
    selectedSubject: string;
    onLoginRequired: () => void;
}

export default function QuestionBoard({ user, selectedSubject, onLoginRequired }: QuestionBoardProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuestions();
    }, [selectedSubject]);

    const loadQuestions = async () => {
        setLoading(true);
        const data = await getQuestions(selectedSubject);
        setQuestions(data);
        setLoading(false);
    };

    const filteredQuestions = questions.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-slate-950/20">
            {/* 바 상단: 검색 및 작성 */}
            <div className="p-6 pb-2 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        {selectedSubject} 게시판
                        {selectedSubject !== "전체" && <span className="text-sm font-normal text-slate-500">{filteredQuestions.length}개의 질문</span>}
                    </h2>
                    <Button
                        onClick={() => {
                            if (!user) {
                                onLoginRequired();
                            } else {
                                setIsWriteModalOpen(true);
                            }
                        }}
                        className="bg-rose-600 hover:bg-rose-500 text-white rounded-full px-5 gap-2 shadow-lg shadow-rose-900/20"
                    >
                        <Plus className="w-4 h-4" />
                        질문하기
                    </Button>
                </div>

                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                            placeholder="궁금한 내용을 검색해 보세요"
                            className="pl-10 bg-white/5 border-white/5 focus:border-rose-500/50 transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="border-white/5 bg-white/5 text-slate-400 hover:text-white">
                        <SlidersHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* 리스트 영역 */}
            <ScrollArea className="flex-1 px-6 py-4">
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 w-full rounded-xl bg-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : filteredQuestions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 max-w-3xl pb-10 mx-auto">
                        {filteredQuestions.map((question) => (
                            <QuestionCard
                                key={question.id}
                                question={question}
                                onClick={setSelectedQuestionId}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p>질문을 찾을 수 없습니다.</p>
                    </div>
                )}
            </ScrollArea>

            {/* 질문 작성 모달 */}
            <QuestionModal
                isOpen={isWriteModalOpen}
                onClose={() => setIsWriteModalOpen(false)}
                mode="write"
                onSuccess={loadQuestions}
                user={user}
            />

            {/* 질문 상세 모달 */}
            {selectedQuestionId && (
                <QuestionModal
                    isOpen={!!selectedQuestionId}
                    onClose={() => setSelectedQuestionId(null)}
                    mode="view"
                    questionId={selectedQuestionId}
                    user={user}
                />
            )}
        </div>
    );
}
