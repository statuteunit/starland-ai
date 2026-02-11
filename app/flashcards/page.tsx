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
        <div className="flex flex-col items-center justify-center h-full gap-6 lg:gap-8">
          <h1 className="text-2xl lg:text-4xl font-bold">Session Complete!</h1>
          <p className="text-secondary text-base lg:text-lg">
            You have reviewed all due cards for today.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="px-6 lg:px-10 py-3 lg:py-4 text-base lg:text-lg rounded-[8px] lg:rounded-[12px] bg-primary-gradient text-white hover:translate-y-[-1px] hover:opacity-90"
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
      <div className="lg:mx-12 h-full">
        <div className="flex justify-between items-center mb-8 lg:mb-12">
          <h2 className="text-xl lg:text-3xl font-semibold">Review Session</h2>
          <span className="text-secondary font-mono text-xl lg:text-3xl">
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
          <div className="mt-12 lg:mt-16 flex flex-col items-center gap-4 lg:gap-6 animate-fade-in-up">
            <p className="text-secondary">How well did you know this?</p>

            <div className="flex gap-4 lg:gap-12 flex-wrap justify-center">
              {/* <Button
                onClick={() => handleRate(1)}
                className="min-w-[100px] bg-transparent text-inherit shadow-none border rounded-[8px] hover:bg-white/5"
                style={{ borderColor: "#ef4444", color: "#ef4444" }}
              >
                Again
              </Button> */}
              <Button
                onClick={() => handleRate(3)}
                className="text-inherit text-[#eab308] shadow-none border rounded-[8px] lg:rounded-[12px] hover:bg-white/5 bg-none border-[#eab308]"
              >
                Hard
              </Button>
              <Button
                onClick={() => handleRate(4)}
                className="text-inherit text-[#3b82f6] shadow-none border rounded-[8px] lg:rounded-[12px] hover:bg-white/5 bg-none border-[#3b82f6]"
              >
                Good
              </Button>
              <Button
                onClick={() => handleRate(5)}
                className="text-inherit text-[#10b981] shadow-none border rounded-[8px] lg:rounded-[12px] hover:bg-white/5 bg-none border-[#10b981]"
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
