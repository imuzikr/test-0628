"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Flame, Atom, Link2, Activity, Hash } from "lucide-react";

interface KeywordPanelProps {
    selectedSubject: string;
    onSelectSubject: (subject: string) => void;
}

const subjects = [
    { name: "전체", icon: Hash, color: "text-slate-400" },
    { name: "화학의 첫걸음", icon: Flame, color: "text-rose-400" },
    { name: "원자의 구조", icon: Atom, color: "text-blue-400" },
    { name: "화학 결합과 분자의 세계", icon: Link2, color: "text-emerald-400" },
    { name: "역동적인 반응", icon: Activity, color: "text-amber-400" },
];

const popularTags = ["몰개념", "전자배치", "공유결합", "오비탈", "중화반응", "산화수"];

export default function KeywordPanel({ selectedSubject, onSelectSubject }: KeywordPanelProps) {
    return (
        <div className="flex flex-col h-full p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold bg-gradient-to-r from-rose-400 to-violet-400 bg-clip-text text-transparent">
                    Q&A School
                </h1>
                <p className="text-xs text-slate-500 mt-1">지식을 공유하는 공간</p>
            </div>

            <ScrollArea className="flex-1 -mx-4 px-4">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-semibold text-slate-400 mb-3 px-2">과목 카테고리</h2>
                        <div className="space-y-1">
                            {subjects.map((subject) => (
                                <button
                                    key={subject.name}
                                    onClick={() => onSelectSubject(subject.name)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${selectedSubject === subject.name
                                            ? "bg-white/10 text-white shadow-lg"
                                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                        }`}
                                >
                                    <subject.icon className={`w-4 h-4 ${subject.color}`} />
                                    <span className="text-sm font-medium">{subject.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-slate-400 mb-3 px-2">실시간 인기 태그</h2>
                        <div className="flex flex-wrap gap-2 px-2">
                            {popularTags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer border-none py-1"
                                >
                                    # {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>

            <div className="mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-slate-400">124명의 학생이 공부 중</span>
                </div>
            </div>
        </div>
    );
}
