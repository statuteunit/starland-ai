"use client";
import { Layout } from "@/components/main/main";
import Upload from "@/components/ui/upload";
import Card from "@/components/ui/card";
import { Clock, Book, Star } from "lucide-react";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-[2rem] font-bold m-0 bg-clip-text text-transparent [background:var(--primary-gradient)]">
          Hello, Learner
        </h1>
        <p className="text-[var(--text-secondary)] mt-2">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <section className="mb-12">
        <Upload />
      </section>

      <section className="mb-12">
        <h2 className="text-[1.25rem] mb-6 text-[var(--text-primary)]">Recent Activity</h2>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] gap-6">
          <Card className="flex items-center gap-6">
            <div
              className="w-12 h-12 rounded-[12px] flex items-center justify-center"
              style={{ background: "rgba(59, 130, 246, 0.2)", color: "#60a5fa" }}
            >
              <Clock size={24} />
            </div>
            <div>
              <p className="text-[var(--text-secondary)] text-sm m-0 mb-1">Pending Reviews</p>
              <p className="text-[1.5rem] font-bold m-0">12 Cards</p>
            </div>
          </Card>

          <Card className="flex items-center gap-6">
            <div
              className="w-12 h-12 rounded-[12px] flex items-center justify-center"
              style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34d399" }}
            >
              <Book size={24} />
            </div>
            <div>
              <p className="text-[var(--text-secondary)] text-sm m-0 mb-1">Notes Created</p>
              <p className="text-[1.5rem] font-bold m-0">5 Notes</p>
            </div>
          </Card>

          <Card className="flex items-center gap-6">
            <div
              className="w-12 h-12 rounded-[12px] flex items-center justify-center"
              style={{ background: "rgba(139, 92, 246, 0.2)", color: "#a78bfa" }}
            >
              <Star size={24} />
            </div>
            <div>
              <p className="text-[var(--text-secondary)] text-sm m-0 mb-1">Mastery Level</p>
              <p className="text-[1.5rem] font-bold m-0">Novice</p>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}