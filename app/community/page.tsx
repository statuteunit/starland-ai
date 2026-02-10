"use client";
import React, { useState } from "react";
import { Layout } from "@/components/main/main";
import { NoteCard } from "@/components/notes/notecard";
import Input from "@/components/ui/input";
import { Search } from "lucide-react";

const COMMUNITY_NOTES = [
  { id: "c1", title: "Machine Learning Basics", summary: "Supervised vs Unsupervised learning, regression, classification.", date: "2023-11-25", tag: "AI" },
  { id: "c2", title: "World History: WWII", summary: "Major events, battles, and geopolitical consequences.", date: "2023-11-24", tag: "History" },
  { id: "c3", title: "Calculus I Cheat Sheet", summary: "Derivatives, integrals, limits, and common rules.", date: "2023-11-22", tag: "Math" },
  { id: "c4", title: "Vegan Recipes Collection", summary: "Easy to make vegan meals for beginners.", date: "2023-11-21", tag: "Cooking" },
  { id: "c5", title: "Introduction to Psychology", summary: "Behaviorism, cognitive psychology, and neuroscience basics.", date: "2023-11-20", tag: "Psychology" },
];

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredNotes = COMMUNITY_NOTES.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tag?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="mb-10 flex flex-col items-center text-center">
        <h1 className="text-[2.5rem] font-bold m-0 text-primary">Community Library</h1>
        <p className="text-secondary mt-2 mb-8 text-[1.1rem]">
          Discover and fork knowledge from others
        </p>

        <div className="relative w-full max-w-[500px]">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted z-10 pointer-events-none -mt-3"
          />
          <Input
            placeholder="Search by title or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>
      </div>

      <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="h-full">
              <NoteCard {...note} />
            </div>
          ))
        ) : (
          <p className="col-[1/-1] text-center text-muted mt-8">
            No results found for "{searchTerm}"
          </p>
        )}
      </div>
    </Layout>
  );
}
