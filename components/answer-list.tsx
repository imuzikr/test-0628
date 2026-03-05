"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { Answer } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface AnswerListProps {
    answers: Answer[];
}

export default function AnswerList({ answers }: AnswerListProps) {
    if (answers.length === 0) {
        return (
            <div className="text-center py-10 text-slate-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                아직 답변이 없습니다. 첫 번째 답변을 작성해 보세요!
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-6">
            {answers.map((answer) => (
                <div key={answer.id} className="flex gap-4 group">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={answer.authorPhoto} />
                        <AvatarFallback>{answer.authorName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-200">{answer.authorName}</span>
                            <span className="text-[10px] text-slate-500">
                                {answer.createdAt?.toDate
                                    ? formatDistanceToNow(answer.createdAt.toDate(), { addSuffix: true, locale: ko })
                                    : "방금 전"}
                            </span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 text-slate-300 text-sm leading-relaxed">
                            {answer.content}
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="h-auto p-0 text-slate-500 hover:text-rose-400 gap-1.5 transition-colors">
                                <ThumbsUp className="w-3.5 h-3.5" />
                                <span className="text-xs">도움이 됐어요 {answer.helpfulCount > 0 && answer.helpfulCount}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
