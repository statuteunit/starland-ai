"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Layout } from "@/components/main/main";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { ArrowLeft, Share2, Network } from "lucide-react";

const MOCK_CONTENT = `
# Introduction to Quantum Mechanics

## Wave-Particle Duality
The concept that every particle or quantum entity may be partly described in terms not only of particles, but also of waves.

### Key Experiments
- Double-slit experiment
- Photoelectric effect

## The Schrödinger Equation
It is a linear partial differential equation that governs the wave function of a quantum-mechanical system.

$$
i\\hbar\\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r},t) = [\\frac{-\\hbar^2}{2m}\\nabla^2 + V(\\mathbf{r},t)] \\Psi(\\mathbf{r},t)
$$

## Quantum Entanglement
A physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle of the group cannot be described independently of the state of the others.
`;

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  void id;

  const [viewMode, setViewMode] = useState<"text" | "mindmap">("text");

  const isText = viewMode === "text";
  const tabBtnBase =
    "px-3 py-2 text-sm rounded-[9999px] transition-all duration-200";
  const tabActive =
    "bg-primary-gradient text-white shadow-[0_4px_14px_0_rgba(139,92,246,0.25)]";
  const tabInactive =
    "bg-white/10 text-primary backdrop-blur-[10px] border border-white/10 hover:bg-white/15";

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <Button
          onClick={() => router.back()}
          className="flex items-center gap-2 pl-0 text-secondary hover:text-primary hover:bg-white/5"
        >
          <ArrowLeft size={20} />
          Back
        </Button>

        <div className="flex gap-4">
          <Button
            onClick={() => setViewMode("text")}
            className={[tabBtnBase, isText ? tabActive : tabInactive].join(" ")}
          >
            Text
          </Button>
          <Button
            onClick={() => setViewMode("mindmap")}
            className={[
              tabBtnBase,
              !isText ? tabActive : tabInactive,
              "flex items-center",
            ].join(" ")}
          >
            <Network size={16} className="mr-2" />
            Mind Map
          </Button>
          <Button className="px-3 py-2 text-sm rounded-[9999px] bg-transparent text-secondary hover:text-primary hover:bg-white/5">
            <Share2 size={20} />
          </Button>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto">
        {isText ? (
          <article className="text-primary leading-[1.7]">
            <ReactMarkdown
              components={{
                h1: (props) => (
                  <h1
                    className="text-[2.5rem] mb-6 bg-clip-text text-transparent bg-primary-gradient"
                    {...props}
                  />
                ),
                h2: (props) => (
                  <h2
                    className="text-[1.75rem] mt-10 mb-4 text-primary"
                    {...props}
                  />
                ),
                p: (props) => (
                  <p className="mb-6 text-secondary" {...props} />
                ),
                ul: (props) => (
                  <ul className="mb-6 pl-6 list-disc" {...props} />
                ),
                li: (props) => (
                  <li className="mb-2 text-secondary" {...props} />
                ),
              }}
            >
              {MOCK_CONTENT}
            </ReactMarkdown>
          </article>
        ) : (
          <Card className="h-[500px] flex flex-col items-center justify-center gap-4 text-secondary">
            <Network size={64} className="text-primary-accent opacity-50" />
            <h3 className="text-xl font-semibold m-0">Mind Map Visualization</h3>
            <p className="m-0">Interactive graph view coming soon.</p>
          </Card>
        )}
      </div>
    </Layout>
  );
}
