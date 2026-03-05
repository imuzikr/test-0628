"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, ArrowRight } from "lucide-react";
import { Question } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface QuestionCardProps {
    question: Question;
    onClick: (id: string) => void;
}

const subjectColors: Record<string, string> = {
    "국어": "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "수학": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "과학": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "영어": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "사회": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    "전체": "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function QuestionCard({ question, onClick }: QuestionCardProps) {
    const timeAgo = question.createdAt?.toDate
        ? formatDistanceToNow(question.createdAt.toDate(), { addSuffix: true, locale: ko })
        : "방금 전";

    return (
        <Card
            className="glass-card hover:bg-white/[0.08] transition-all cursor-pointer group"
            onClick={() => onClick(question.id)}
        >
            <CardHeader className="p-4 pb-2 space-y-3">
                <div className="flex items-center justify-between">
                    <Badge className={`font-normal ${subjectColors[question.subject] || subjectColors["전체"]}`}>
                        {question.subject}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {timeAgo}
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-100 group-hover:text-white transition-colors line-clamp-1">
                    {question.title}
                </h3>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {question.content}
                </p>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 border border-white/10">
                        <AvatarImage src={question.authorPhoto} />
                        <AvatarFallback className="bg-slate-800 text-[10px]">{question.authorName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-slate-400">{question.authorName}</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{question.answerCount}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-rose-500 transition-colors transform group-hover:translate-x-1" />
                </div>
            </CardFooter>
        </Card>
    );
}
