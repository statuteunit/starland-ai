"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    router.replace(token ? "/dashboard" : "/login");
  }, [router]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-dark)] text-[var(--text-primary)]">
      <span className="text-sm text-[var(--text-muted)]">Redirecting...</span>
    </div>
  );
}
