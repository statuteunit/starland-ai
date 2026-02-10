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

  return (
    <div className={`flex gap-4 mb-6 w-full ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? "bg-dark-secondary text-secondary" : "bg-primary-accent text-white"}`}>{isUser ? <User size={20} /> : <Bot size={20} />}</div>

      <div className={`relative max-w-[70%] p-4 rounded-[20px] ${isUser ? "rounded-tr-[4px] bg-primary-gradient text-white" : "rounded-tl-[4px] bg-dark-secondary text-primary border border-[rgba(255,255,255,0.05)]"}`}>
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
          <span className={`absolute bottom-[-1.2rem] text-[0.7rem] text-muted ${isUser ? "right-2" : "left-2"}`}>{timestamp}</span>
        )}
      </div>
    </div>
  );
}