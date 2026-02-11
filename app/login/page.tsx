"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { sendVerificationCode } from "@/api/auth";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<"password" | "code">("password");
  const [rememberMe, setRememberMe] = useState(false);
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<number | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("access_token", "mock_token");
      if (rememberMe) {
        localStorage.setItem("remember_me", "true");
      } else {
        localStorage.removeItem("remember_me");
      }
      router.push("/dashboard");
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const startCountdown = () => {
    setCountdown(60);
    timerRef.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendCode = async () => {
    if (!email || sending || countdown > 0) return;
    setSending(true);
    startCountdown();
    try {
      const res = await sendVerificationCode({ email });
      // if (res.status === 201) {
      //   if (res.data?.code) setCode(res.data.code);
      //   if (
      //     typeof res.data?.expires_in_minutes === "number" &&
      //     res.data.expires_in_minutes > 0
      //   ) {
      //     setCountdown(res.data.expires_in_minutes * 60);
      //   }
      // } else {
      //   setCountdown(0);
      //   if (timerRef.current) {
      //     window.clearInterval(timerRef.current);
      //     timerRef.current = null;
      //   }
      // }
    } catch {
      setCountdown(0);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-[480px]">
        <h1 className="text-2xl font-bold m-0 mb-2 text-primary">
          Welcome Back
        </h1>
        <p className="m-0 mb-6 text-secondary">
          Sign in to continue to Star Land AI
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {mode === "password" ? (
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          ) : (
            <div className="flex items-end gap-3">
              <Input
                label="Code"
                type="text"
                placeholder="请输入验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="flex-1"
              />
              <Button
                type="button"
                onClick={sendCode}
                disabled={!email || countdown > 0 || sending}
                className="px-4 py-2 text-sm bg-white/10 text-primary backdrop-blur-[10px] border border-white/10 hover:bg-white/15 rounded-[8px]"
              >
                {countdown > 0 ? `${countdown}s` : "发送验证码"}
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="text-secondary">
              <input
                type="checkbox"
                className="mr-2 align-middle"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              记住我
            </label>

            <button
              type="button"
              className="text-primary-accent hover:opacity-80 transition-opacity"
              onClick={() => setMode(mode === "password" ? "code" : "password")}
            >
              {mode === "password" ? "验证码登录" : "密码登录"}
            </button>
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="px-6 py-3 text-base bg-primary-gradient text-white shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] hover:translate-y-[-1px] hover:shadow-[0_6px_20px_0_rgba(139,92,246,0.23)] hover:opacity-90 rounded-[8px]"
          >
            Sign In
          </Button>

          <p className="m-0 text-secondary text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary-accent hover:opacity-80 transition-opacity"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
