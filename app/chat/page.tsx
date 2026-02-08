"use client";
import React, { useEffect, useRef, useState } from "react";
import { Layout } from "@/components/main/main";
import ChatBubble from "@/components/chat/chatBubble";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Send } from "lucide-react";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "assistant",
      timestamp: "Now",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: `I found some relevant info in your **Physics** notes related to "${userMsg.content}".\n\nWould you like me to create flashcards for this topic?`,
        role: "assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 flex flex-col bg-[rgba(15,23,42,0.5)] rounded-[var(--radius-md)] border border-[var(--glass-border)] overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto flex flex-col">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                content={msg.content}
                role={msg.role}
                timestamp={msg.timestamp}
              />
            ))}

            {loading && (
              <div className="text-[var(--text-muted)] text-sm ml-12 animate-pulse">
                AI is thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            className="p-4 sm:p-6 bg-[var(--glass-bg)] border-t border-[var(--glass-border)]"
            onSubmit={handleSend}
          >
            <div className="flex gap-4 items-start">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[rgba(0,0,0,0.2)]"
              />
              <Button
                type="submit"
                disabled={loading}
                className="p-3 mt-[2px] rounded-[var(--radius-sm)] [background:var(--primary-gradient)] text-white hover:translate-y-[-1px] hover:opacity-90"
              >
                <Send size={20} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}