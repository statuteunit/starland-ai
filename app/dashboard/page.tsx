import { Layout } from "@/components/main/main";
import Upload from "@/components/ui/upload";
import Card from "@/components/ui/card";
import { Clock, Book, Star } from "lucide-react";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-[2rem] font-bold m-0 bg-clip-text text-transparent bg-primary-gradient">
          Hello, Learner
        </h1>
        <p className="text-secondary mt-2">
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
        <h2 className="text-[1.25rem] mb-6 text-primary">Recent Activity</h2>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] gap-6">
          <Card className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center bg-blue-500/20 text-blue-400">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-secondary text-sm m-0 mb-1">Pending Reviews</p>
              <p className="text-[1.5rem] font-bold m-0">12 Cards</p>
            </div>
          </Card>

          <Card className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center bg-emerald-500/20 text-emerald-400">
              <Book size={24} />
            </div>
            <div>
              <p className="text-secondary text-sm m-0 mb-1">Notes Created</p>
              <p className="text-[1.5rem] font-bold m-0">5 Notes</p>
            </div>
          </Card>

          <Card className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center bg-violet-500/20 text-violet-400">
              <Star size={24} />
            </div>
            <div>
              <p className="text-secondary text-sm m-0 mb-1">Mastery Level</p>
              <p className="text-[1.5rem] font-bold m-0">Novice</p>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
