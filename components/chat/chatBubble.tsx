"use client";

import { Bot, User } from "lucide-react";
import Markdown from "react-markdown";

type ChatBubbleProps = {
  content: string;
  role: "user" | "assistant";
  timestamp?: string;
};

export default function ChatBubble({ content, role, timestamp }: ChatBubbleProps) {
  const isUser = role === "user";

  const wrapper = [
    "flex gap-4 mb-6 w-full",
    isUser ? "flex-row-reverse" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const avatar = [
    "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
    isUser
      ? "bg-[var(--bg-dark-secondary)] text-[var(--text-secondary)]"
      : "bg-[var(--primary-accent)] text-white",
  ].join(" ");

  const bubble = [
    "relative max-w-[70%] p-4 rounded-[20px]",
    isUser
      ? "rounded-tr-[4px] [background:var(--primary-gradient)] text-white"
      : "rounded-tl-[4px] bg-[var(--bg-dark-secondary)] text-[var(--text-primary)] border border-[rgba(255,255,255,0.05)]",
  ].join(" ");

  const timestampBase = "absolute bottom-[-1.2rem] text-[0.7rem] text-[var(--text-muted)]";
  const timestampPos = isUser ? "right-2" : "left-2";

  return (
    <div className={wrapper}>
      <div className={avatar}>{isUser ? <User size={20} /> : <Bot size={20} />}</div>

      <div className={bubble}>
        {isUser ? (
          <p className="m-0 text-[0.95rem] leading-[1.5]">{content}</p>
        ) : (
          <div className="text-[0.95rem] leading-[1.6] space-y-2">
            <Markdown
              components={{
                p: ({ node, ...props }) => <p className="m-0" {...props} />,
              }}
            >
              {content}
            </Markdown>
          </div>
        )}

        {timestamp && (
          <span className={[timestampBase, timestampPos].join(" ")}>{timestamp}</span>
        )}
      </div>
    </div>
  );
}