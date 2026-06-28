"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerWithEmail, loginWithEmail, loginWithGoogle } from "@/lib/auth";
import { Chrome } from "lucide-react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isLoginMode) {
                // 로그인
                await loginWithEmail(email, password);
            } else {
                // 회원가입
                if (!displayName.trim()) {
                    setError("이름(닉네임)을 입력해 주세요.");
                    setLoading(false);
                    return;
                }
                await registerWithEmail(email, password, displayName);
            }
            onClose(); // 성공 시 모달 닫기
        } catch (err: any) {
            console.error(err);
            // 한국어로 친절한 에러 설명
            if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
                setError("이메일 또는 비밀번호가 일치하지 않습니다.");
            } else if (err.code === "auth/email-already-in-use") {
                setError("이미 가입된 이메일 주소입니다.");
            } else if (err.code === "auth/weak-password") {
                setError("비밀번호는 최소 6자 이상이어야 합니다.");
            } else if (err.code === "auth/invalid-email") {
                setError("올바르지 않은 이메일 형식입니다.");
            } else {
                setError("오류가 발생했습니다. 다시 시도해 주세요.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await loginWithGoogle();
            onClose();
        } catch (err: any) {
            console.error(err);
            if (err.code !== "auth/popup-closed-by-user") {
                setError("구글 로그인 중 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="glass-card border-white/10 sm:max-w-[420px] p-6 text-white bg-slate-900/95">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-2xl font-bold text-center">
                        {isLoginMode ? "로그인" : "회원가입"}
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 text-center text-xs">
                        {isLoginMode ? "공부하며 막힐 땐 Q&A School에 질문해 보세요" : "계정을 만들고 학습 커뮤니티에 합류해 보세요"}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleEmailAuth} className="space-y-4 mt-4">
                    {!isLoginMode && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">이름 (닉네임)</label>
                            <Input
                                type="text"
                                placeholder="길동이"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-rose-500/50"
                                required
                            />
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">이메일 주소</label>
                        <Input
                            type="email"
                            placeholder="student@school.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-rose-500/50"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">비밀번호</label>
                        <Input
                            type="password"
                            placeholder="6자리 이상 비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-rose-500/50"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-rose-400 font-medium text-center">{error}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-rose-600 hover:bg-rose-500 text-white font-medium py-2 rounded-lg mt-2"
                    >
                        {loading ? "처리 중..." : isLoginMode ? "로그인하기" : "회원가입하기"}
                    </Button>
                </form>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-900 px-2 text-slate-400">또는</span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white flex gap-2 justify-center items-center py-2"
                >
                    <Chrome className="w-4 h-4 text-rose-400" />
                    구글 계정으로 계속하기
                </Button>

                <p className="text-center text-xs text-slate-400 mt-6">
                    {isLoginMode ? "아직 계정이 없으신가요?" : "이미 계정이 있으신가요?"}{" "}
                    <button
                        type="button"
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setError("");
                        }}
                        className="text-rose-400 hover:underline font-semibold ml-1"
                    >
                        {isLoginMode ? "회원가입" : "로그인"}
                    </button>
                </p>
            </DialogContent>
        </Dialog>
    );
}
