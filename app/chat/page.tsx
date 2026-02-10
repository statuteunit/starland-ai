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
      timestamp: "1741896723895",
    },
    {
      id: "2",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "user",
      timestamp: "1741896723895",
    },
    {
      id: "3",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "assistant",
      timestamp: "1741896723999",
    },
    {
      id: "4",
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
      <div className="flex flex-col">
        <div className="flex flex-col bg-[rgba(15,23,42,0.5)] rounded-[10px] border border-glass-border overflow-hidden">
          <div className="p-6 overflow-y-auto flex flex-col">
            {messages.map((msg) => ( 
              <ChatBubble
                key={msg.id}
                content={msg.content}
                role={msg.role}
                timestamp={msg.timestamp}
              />
            ))}

            {loading && (
              <div className="text-muted text-sm ml-12 animate-pulse">
                AI is thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div
            className="mt-[200px] p-4 lg:p-6 bg-glass-bg border-t border-glass-border"
            onSubmit={handleSend}
          >
            <div className="flex gap-4 items-start">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-black/20"
              />
              <Button
                type="submit"
                disabled={loading}
                className="p-3 mt-[2px] rounded-[8px] bg-primary-gradient text-white hover:translate-y-[-1px] hover:opacity-90"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
