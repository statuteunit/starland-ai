"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  successText?: string;
}

export default function Input({
  label,
  error,
  className,
  success = false,
  successText = "操作成功",
  ...props
}: InputProps) {
  const baseInput = [
    "bg-[rgba(15,23,42,0.6)]",
    "border border-white/10",
    "rounded-[8px]",
    "px-4 py-3",
    "text-primary",
    "transition-all duration-200",
    "focus:outline-none",
    "focus:border-primary-accent",
    "focus:bg-[rgba(15,23,42,0.8)]",
    "focus:shadow-[0_0_0_2px_rgba(139,92,246,0.2)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = error
    ? [baseInput, "border-danger-accent"].join(" ")
    : baseInput;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium text-secondary">
          {label}
        </label>
      )}
      <input className={inputClasses} {...props} />
      {error && <span className="text-xs text-danger-accent">{error}</span>}

      {!error && success && (
        <div className="flex flex-col items-center gap-4">
          <svg
            className="text-secondary-accent"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          </svg>
          <p className="text-secondary">{successText}</p>
          <div className="w-10 h-10 border-[3px] border-white/10 border-t-primary-accent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
