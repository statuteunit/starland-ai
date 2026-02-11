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
      timestamp: "now",
    },
    {
      id: "2",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "user",
      timestamp: "now",
    },
    {
      id: "3",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "assistant",
      timestamp: "now",
    },
    {
      id: "4",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "user",
      timestamp: "Now",
    },
    {
      id: "5",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "assistant",
      timestamp: "Now",
    },
    {
      id: "6",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "user",
      timestamp: "Now",
    },
    {
      id: "7",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "assistant",
      timestamp: "Now",
    },
    {
      id: "8",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "user",
      timestamp: "Now",
    },
    {
      id: "9",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "assistant",
      timestamp: "Now",
    },
    {
      id: "10",
      content:
        "Hello! I am your AI learning assistant. Ask me anything about your notes or upload a document to get started.",
      role: "user",
      timestamp: "Now",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const pendingScrollToBottomRef = useRef(true);
  const restoreScrollRef = useRef<{ prevScrollHeight: number } | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (restoreScrollRef.current) return;
    if (pendingScrollToBottomRef.current || isNearBottomRef.current) {
      scrollToBottom();
    }
    pendingScrollToBottomRef.current = false;
  }, [messages.length]);

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
    pendingScrollToBottomRef.current = true;
  };

  return (
    <Layout>
      <div className="w-fit lg:w-full">
        <div className="bg-[rgba(15,23,42,0.5)] rounded-[10px] lg:rounded-[20px] border border-glass-border overflow-hidden py-4 px-2 lg:p-6 h-[82vh] lg:h-[75vh] overflow-y-auto">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                content={msg.content}
                role={msg.role}
                timestamp={msg.timestamp}
              />
            ))}

            {loading && (
              <div className="text-muted text-sm lg:text-base ml-14 lg:ml-20 animate-pulse">
                AI is thinking...
              </div>
            )}

            <div ref={messagesEndRef} />

          <form
            className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-glass-bg border-t border-glass-border"
            onSubmit={handleSend}
          >
            <div className="flex gap-4 lg:gap-6 items-center">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-black/20"
              />
              <Button
                type="submit"
                disabled={loading}
                className="p-3 lg:p-4 rounded-[8px] lg:rounded-[12px] bg-primary-gradient text-white hover:translate-y-[-1px] hover:opacity-90"
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
