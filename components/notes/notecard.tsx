"use client"
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

  return (
    <div className={"cursor-pointer overflow-hidden transition-all duration-200 bg-glass-bg backdrop-blur-[10px] border border-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-[10px] lg:rounded-[15px] hover:translate-y-[-4px] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:[background:rgba(255,255,255,0.08)]"}>
      <div
        className="h-full p-6 lg:p-8 flex flex-col justify-between gap-4 lg:gap-6"
        onClick={() => router.push(`/notes/${id}`)}
      >
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-[10px] bg-[rgba(59,130,246,0.1)] text-[#60a5fa] flex items-center justify-center">
            <FileText size={20} />
          </div>
          {tag && (
            <span className="text-xs text-secondary bg-[rgba(255,255,255,0.05)] px-2 lg:px-4 py-1 lg:py-2 rounded-[4px] lg:rounded-[6px]">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-lg lg:text-2xl font-semibold text-primary leading-[1.4]">
          {title}
        </h3>

        <p className="text-sm lg:text-base text-secondary leading-[1.6] [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden">
          {summary}
        </p>

        <div className="flex items-center gap-2 lg:gap-3 text-muted text-xs lg:text-sm">
          <Calendar size={14} className="text-muted" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};
