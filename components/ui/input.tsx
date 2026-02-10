"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
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
    </div>
  );
}
