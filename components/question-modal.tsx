"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageCircle } from "lucide-react";
import { Question, User, Answer } from "@/lib/types";
import { addQuestion, getQuestion, getAnswers, addAnswer } from "@/lib/firestore";
import AnswerList from "./answer-list";

interface QuestionModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "write" | "view";
    questionId?: string;
    onSuccess?: () => void;
    user: User | null;
}

const subjects = ["국어", "수학", "과학", "영어", "사회"];

export default function QuestionModal({ isOpen, onClose, mode, questionId, onSuccess, user }: QuestionModalProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [subject, setSubject] = useState("수학");
    const [submitting, setSubmitting] = useState(false);

    const [question, setQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [newAnswer, setNewAnswer] = useState("");

    useEffect(() => {
        if (isOpen && mode === "view" && questionId) {
            loadQuestionDetail(questionId);
        } else if (isOpen && mode === "write") {
            setTitle("");
            setContent("");
            setSubject("수학");
        }
    }, [isOpen, mode, questionId]);

    const loadQuestionDetail = async (id: string) => {
        const q = await getQuestion(id);
        const a = await getAnswers(id);
        setQuestion(q);
        setAnswers(a);
    };

    const handleSubmitQuestion = async () => {
        if (!title || !content || !user) return;
        setSubmitting(true);
        try {
            await addQuestion({
                authorId: user.uid,
                authorName: user.displayName,
                authorPhoto: user.photoURL,
                title,
                content,
                subject
            });
            onSuccess?.();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitAnswer = async () => {
        if (!newAnswer || !questionId || !user) return;
        setSubmitting(true);
        try {
            await addAnswer(questionId, {
                authorId: user.uid,
                authorName: user.displayName,
                authorPhoto: user.photoURL,
                content: newAnswer
            });
            setNewAnswer("");
            loadQuestionDetail(questionId);
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="glass-card border-white/10 sm:max-w-[700px] h-[85vh] p-0 overflow-hidden flex flex-col">
                {mode === "write" ? (
                    <>
                        <DialogHeader className="p-6 pb-2">
                            <DialogTitle className="text-2xl font-bold text-white">새로운 질문 작성</DialogTitle>
                            <DialogDescription className="text-slate-400">배우고 싶은 내용을 자유롭게 물어보세요.</DialogDescription>
                        </DialogHeader>
                        <div className="flex-1 p-6 space-y-5 overflow-y-auto">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">과목 선택</label>
                                <div className="flex flex-wrap gap-2">
                                    {subjects.map((s) => (
                                        <Badge
                                            key={s}
                                            onClick={() => setSubject(s)}
                                            className={`cursor-pointer py-1.5 px-4 font-normal transition-all ${subject === s
                                                    ? "bg-rose-500 text-white"
                                                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                                                }`}
                                        >
                                            {s}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">질문 제목</label>
                                <Input
                                    placeholder="무엇이 궁금한지 한 줄로 요약해 주세요"
                                    className="bg-white/5 border-white/5 focus:border-rose-500/50"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">상세 내용</label>
                                <div className="min-h-[200px] relative">
                                    <Textarea
                                        placeholder="질문을 자세히 적어주세요. 예시나 직접 풀어본 흔적을 적어주면 더 좋은 답변을 받을 수 있습니다."
                                        className="bg-white/5 border-white/5 focus:border-rose-500/50 min-h-[200px]"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-6 pt-2 border-t border-white/5 bg-black/20 flex justify-end gap-3">
                            <Button variant="ghost" onClick={onClose} className="text-slate-400">취소</Button>
                            <Button
                                onClick={handleSubmitQuestion}
                                disabled={submitting || !title || !content}
                                className="bg-rose-600 hover:bg-rose-500 text-white min-w-[100px]"
                            >
                                {submitting ? "등록 중..." : "게시하기"}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        {question ? (
                            <>
                                <ScrollArea className="flex-1">
                                    <div className="p-8 space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20">{question.subject}</Badge>
                                                <span className="text-xs text-slate-500">
                                                    {question.createdAt?.toDate ? new Date(question.createdAt.toDate()).toLocaleString() : "방금 전"}
                                                </span>
                                            </div>
                                            <h2 className="text-3xl font-bold text-white leading-tight">{question.title}</h2>
                                            <div className="flex items-center gap-3 py-2 border-y border-white/5">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarImage src={question.authorPhoto} />
                                                    <AvatarFallback>{question.authorName[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-slate-200">{question.authorName}</span>
                                                    <span className="text-xs text-slate-500">작성자</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                                            {question.content}
                                        </div>

                                        <div className="pt-8 border-t border-white/10">
                                            <div className="flex items-center gap-2 mb-6">
                                                <MessageCircle className="w-5 h-5 text-rose-500" />
                                                <h3 className="text-lg font-semibold text-white">답변 {answers.length}개</h3>
                                            </div>
                                            <AnswerList answers={answers} />
                                        </div>
                                    </div>
                                </ScrollArea>

                                <div className="p-4 bg-black/40 border-t border-white/10">
                                    <div className="flex gap-2 max-w-4xl mx-auto">
                                        <Textarea
                                            placeholder="답변을 작성해 주세요..."
                                            className="bg-white/5 border-white/5 min-h-[44px] max-h-[120px]"
                                            value={newAnswer}
                                            onChange={(e) => setNewAnswer(e.target.value)}
                                        />
                                        <Button
                                            size="icon"
                                            className="bg-rose-600 hover:bg-rose-500 self-end"
                                            disabled={submitting || !newAnswer}
                                            onClick={handleSubmitAnswer}
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-500">데이터를 불러오는 중...</div>
                        )}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
