"use client"
import { useState } from "react";
import { Layout } from "@/components/main/main";
import Card from "@/components/ui/card";
import { Clock, Book, Star } from "lucide-react";
import { FileGallery } from "@/components/upload/fileGallery";
import { FileUpload } from "@/components/upload/fileUpload";

type UploadedItem = {
  id: string;
  name: string;
  size: number;
  mime: string;
  kind: "image" | "pdf" | "doc";
  url: string;
  createdAt: string;
};

const PENDING_CHAT_FILES_KEY = "starland:pending-chat-files";
export default function DashboardPage() {
  const [lastUploaded, setLastUploaded] = useState<UploadedItem | null>(null);
  
  const handleUploaded = (item: UploadedItem) => {
      setLastUploaded(item);
      const raw = sessionStorage.getItem(PENDING_CHAT_FILES_KEY);
      const prev: UploadedItem[] = raw ? JSON.parse(raw) : [];
      sessionStorage.setItem(PENDING_CHAT_FILES_KEY, JSON.stringify([item, ...prev]));
    };

  return (
    <Layout>
      <div className="mb-8 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-primary-gradient">
          Hello, Learner
        </h1>
        <p className="text-secondary mt-2 lg:mt-4">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="w-full mb-12 lg:mb-16">
        <div className="rounded-[8px] lg:rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.6)] overflow-hidden transition-all duration-200 focus-within:border-primary-accent focus-within:bg-[rgba(15,23,42,0.8)] focus-within:shadow-[0_0_0_2px_rgba(139,92,246,0.2)]">
          <div className="p-3 lg:p-4 border-b border-white/10">
            <FileGallery appended={lastUploaded} variant="compact" />
          </div>
          <div className="px-4 lg:px-6 py-2 lg:py-4">
            <FileUpload onUploaded={handleUploaded} />
          </div>
        </div>
      </div>

      <section className="mb-12 lg:mb-16">
        <h2 className="text-xl lg:text-3xl mb-6 lg:mb-10 text-primary">Recent Activity</h2>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] gap-6 lg:gap-10">
          <Card className="flex items-center gap-6 lg:gap-10">
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center bg-blue-500/20 text-blue-400">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-secondary text-sm lg:text-base mb-1 lg:mb-2">Pending Reviews</p>
              <p className="text-2xl lg:text-3xl font-bold">12 Cards</p>
            </div>
          </Card>

          <Card className="flex items-center gap-6 lg:gap-10">
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center bg-emerald-500/20 text-emerald-400">
              <Book size={24} />
            </div>
            <div>
              <p className="text-secondary text-sm lg:text-base mb-1 lg:mb-2">Notes Created</p>
              <p className="text-2xl lg:text-3xl font-bold">5 Notes</p>
            </div>
          </Card>

          <Card className="flex items-center gap-6 lg:gap-10">
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center bg-violet-500/20 text-violet-400">
              <Star size={24} />
            </div>
            <div>
              <p className="text-secondary text-sm lg:text-base mb-1 lg:mb-2">Mastery Level</p>
              <p className="text-2xl lg:text-3xl font-bold">Novice</p>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
