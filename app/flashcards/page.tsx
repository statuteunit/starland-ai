"use client";
import { useState } from "react";
import { Layout } from "@/components/main/main";
import { Flashcard } from "@/components/notes/flashcard";
import Button from "@/components/ui/button";

const MOCK_CARDS = [
  {
    id: "1",
    front: "What is the Heisenberg Uncertainty Principle?",
    back:
      "It states that the position and momentum of a particle cannot be simultaneously measured with arbitrarily high precision.",
  },
  { id: "2", front: 'Who painted "The Starry Night"?', back: "Vincent van Gogh" },
  {
    id: "3",
    front: "What does the useEffect hook do in React?",
    back: "It lets you perform side effects in function components.",
  },
];

export default function FlashcardReviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleRate = (quality: number) => {
    void quality;
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < MOCK_CARDS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCompleted(true);
      }
    }, 200);
  };

  if (completed) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <h1 className="text-2xl font-bold">Session Complete!</h1>
          <p className="text-secondary">
            You have reviewed all due cards for today.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="px-6 py-3 text-base rounded-[8px] bg-primary-gradient text-white hover:translate-y-[-1px] hover:opacity-90"
          >
            Review Again (Mock)
          </Button>
        </div>
      </Layout>
    );
  }

  const currentCard = MOCK_CARDS[currentIndex];

  return (
    <Layout>
      <div className="max-w-[800px] mx-auto flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Review Session</h2>
          <span className="text-secondary font-mono text-[1.25rem]">
            {currentIndex + 1} / {MOCK_CARDS.length}
          </span>
        </div>

        <Flashcard
          front={currentCard.front}
          back={currentCard.back}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />

        {isFlipped && (
          <div className="mt-12 flex flex-col items-center gap-4 animate-fade-in-up">
            <p className="text-secondary">How well did you know this?</p>

            <div className="flex gap-4 flex-wrap justify-center">
              <Button
                onClick={() => handleRate(1)}
                className="min-w-[100px] bg-transparent text-inherit shadow-none border rounded-[8px] hover:bg-white/5"
                style={{ borderColor: "#ef4444", color: "#ef4444" }}
              >
                Again
              </Button>
              <Button
                onClick={() => handleRate(3)}
                className="min-w-[100px] bg-transparent text-inherit shadow-none border rounded-[8px] hover:bg-white/5"
                style={{ borderColor: "#eab308", color: "#eab308" }}
              >
                Hard
              </Button>
              <Button
                onClick={() => handleRate(4)}
                className="min-w-[100px] bg-transparent text-inherit shadow-none border rounded-[8px] hover:bg-white/5"
                style={{ borderColor: "#3b82f6", color: "#3b82f6" }}
              >
                Good
              </Button>
              <Button
                onClick={() => handleRate(5)}
                className="min-w-[100px] bg-transparent text-inherit shadow-none border rounded-[8px] hover:bg-white/5"
                style={{ borderColor: "#10b981", color: "#10b981" }}
              >
                Easy
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
