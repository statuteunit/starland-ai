import { Layout } from "@/components/main/main";
import { NoteCard } from "@/components/notes/notecard";

const MOCK_NOTES = [
  { id: "1", title: "Introduction to Quantum Mechanics", summary: "Basic principles of wave-particle duality and Schrödinger equation.", date: "2023-11-24", tag: "Physics" },
  { id: "2", title: "History of Modern Art", summary: "Overview of Impressionism to Abstract Expressionism.", date: "2023-11-23", tag: "Art" },
  { id: "3", title: "React Hooks Deep Dive", summary: "Understanding useEffect, useMemo, and useCallback for performance.", date: "2023-11-22", tag: "Programming" },
  { id: "4", title: "Sustainable Agriculture", summary: "methods for farming that are environmentally friendly.", date: "2023-11-20", tag: "Biology" },
];

export default function NoteListPage() {
  return (
    <Layout>
      <div className="mb-8 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary">My Notes</h1>
        <p className="text-secondary mt-2 text-base lg:text-lg lg:mt-4">{MOCK_NOTES.length} notes in your knowledge base</p>
      </div>

      <div className="grid [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))] gap-6 lg:gap-12">
        {MOCK_NOTES.map((note) => (
          <NoteCard key={note.id} {...note} />
        ))}
      </div>
    </Layout>
  );
}