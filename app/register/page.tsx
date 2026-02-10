"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("access_token", "mock_token");
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-[400px] flex flex-col items-center">
        <h1 className="m-0 mb-2 text-[1.75rem] font-bold bg-clip-text text-transparent bg-primary-gradient">
          Create Account
        </h1>
        <p className="m-0 mb-8 text-secondary text-center">
          Join the Star Land AI community
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input label="Full Name" type="text" placeholder="John Doe" required />
          <Input label="Email" type="email" placeholder="you@example.com" required />
          <Input label="Password" type="password" placeholder="••••••••" required />
          <Input label="Confirm Password" type="password" placeholder="••••••••" required />

          <Button
            type="submit"
            isLoading={loading}
            className="mt-4 w-full px-6 py-3 text-base bg-primary-gradient text-white shadow-[0_4px_14px_0_rgba(139,92,246,0.39)] hover:translate-y-[-1px] hover:shadow-[0_6px_20px_0_rgba(139,92,246,0.23)] hover:opacity-90 rounded-[8px]"
          >
            Sign Up
          </Button>

          <p className="mt-6 text-center text-sm text-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-accent font-semibold hover:opacity-80 transition-opacity"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
