"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Pin, ChevronRight, Lightbulb } from "lucide-react";
import { Notice } from "@/lib/types";
import { getNotices } from "@/lib/firestore";

export default function NoticePanel() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNotices();
    }, []);

    const loadNotices = async () => {
        const data = await getNotices();
        setNotices(data);
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-full p-6">
            <div className="flex items-center gap-2 mb-8">
                <Megaphone className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">공지사항</h2>
            </div>

            <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="space-y-6">
                    {/* 중요 공지 (Pinned) */}
                    <section className="space-y-3">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <Pin className="w-3 h-3" />
                            중요 안내
                        </h3>
                        {loading ? (
                            <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
                        ) : (
                            notices.filter(n => n.pinned).map(notice => (
                                <Card key={notice.id} className="bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/15 transition-colors cursor-pointer group">
                                    <CardContent className="p-4">
                                        <h4 className="text-sm font-semibold text-amber-200 mb-1 group-hover:text-amber-100">{notice.title}</h4>
                                        <p className="text-xs text-amber-200/60 line-clamp-2">{notice.content}</p>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </section>

                    {/* 일반 공지 */}
                    <section className="space-y-3">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">최신 공지</h3>
                        <div className="space-y-2">
                            {loading ? (
                                [1, 2].map(i => <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />)
                            ) : (
                                notices.filter(n => !n.pinned).map(notice => (
                                    <div key={notice.id} className="p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-between group">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{notice.title}</h4>
                                            <span className="text-[10px] text-slate-600">
                                                {notice.createdAt?.toDate ? new Date(notice.createdAt.toDate()).toLocaleDateString() : "방금 전"}
                                            </span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transform group-hover:translate-x-1" />
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    {/* 학습 팁 */}
                    <section className="pt-6 border-t border-white/5 space-y-4">
                        <Card className="bg-indigo-500/10 border-indigo-500/20">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-indigo-400" />
                                    <span className="text-sm font-semibold text-indigo-300">오늘의 학습 팁</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    질문할 때 문제 사진과 함께 자신이 어디까지 풀어봤는지 적어주면 훨씬 정확한 답변을 받을 수 있어요!
                                </p>
                                <Badge variant="outline" className="text-[10px] border-indigo-500/30 text-indigo-400">#팁공유</Badge>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </ScrollArea>
        </div>
    );
}
