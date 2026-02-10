"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FileText, Calendar } from "lucide-react";

type NoteCardProps = {
  id: string;
  title: string;
  summary: string;
  date: string;
  tag?: string;
};

export const NoteCard: React.FC<NoteCardProps> = ({ id, title, summary, date, tag }) => {
  const router = useRouter();

  const outer = [
    "h-full flex flex-col cursor-pointer p-0 overflow-hidden",
    "transition-all duration-200",
    "bg-glass-bg backdrop-blur-[10px] border border-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-[10px]",
    "hover:translate-y-[-4px] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:[background:rgba(255,255,255,0.08)]",
  ].join(" ");

  return (
    <div className={outer}>
      <div
        className="p-6 flex flex-col h-full"
        onClick={() => router.push(`/notes/${id}`)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-[10px] bg-[rgba(59,130,246,0.1)] text-[#60a5fa] flex items-center justify-center">
            <FileText size={20} />
          </div>
          {tag && (
            <span className="text-xs text-secondary bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded-[4px]">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-[1.125rem] font-semibold m-0 mb-2 text-primary leading-[1.4]">
          {title}
        </h3>

        <p className="text-sm text-secondary m-0 mb-6 leading-[1.6] flex-1 [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden">
          {summary}
        </p>

        <div className="flex items-center gap-2 text-muted text-xs mt-auto">
          <Calendar size={14} className="text-muted" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};
