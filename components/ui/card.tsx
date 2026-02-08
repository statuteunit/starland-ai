"use client";
import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function Card({ children, className, ...props }: CardProps) {
  const classes = [
    "p-6",
    "rounded-[var(--radius-md)]",
    "transition-transform duration-200 ease-[cubic-bezier(.25,.1,.25,1)]",
    "bg-[var(--glass-bg)]",
    "backdrop-blur-[var(--blur-intensity)]",
    "border border-[var(--glass-border)]",
    "shadow-[var(--glass-shadow)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}