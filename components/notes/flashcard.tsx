"use client";
import React from "react";

type FlashcardProps = {
  front: string;
  back: string;
  isFlipped?: boolean;
  onFlip?: () => void;
};

export const Flashcard: React.FC<FlashcardProps> = ({
  front,
  back,
  isFlipped = false,
  onFlip,
}) => {
  const scene = "w-full max-w-[600px] h-[400px] [perspective:1000px] cursor-pointer mx-auto";

  const cardBase =
    "w-full h-full relative transition-transform duration-[600ms] ease-in-out [transform-style:preserve-3d] rounded-[12px]";
  const cardFlipped = isFlipped ? "[transform:rotateY(180deg)]" : "";

  const faceBase =
    "absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[12px] flex flex-col items-center justify-center p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] border border-white/10";

  const frontFace =
    "bg-[rgba(30,41,59,0.8)] backdrop-blur-[10px] text-primary";
  const backFace =
    "bg-glass-bg text-primary [transform:rotateY(180deg)] border border-primary-accent shadow-[0_0_15px_rgba(139,92,246,0.2)]";

  return (
    <div className={scene} onClick={onFlip}>
      <div className={[cardBase, cardFlipped].filter(Boolean).join(" ")}>
        <div className={[faceBase, frontFace].join(" ")}>
          <div className="text-[1.5rem] text-center leading-[1.6]">{front}</div>
          <div className="absolute bottom-6 text-sm text-muted">Click to flip</div>
        </div>

        <div className={[faceBase, backFace].join(" ")}>
          <div className="text-[1.5rem] text-center leading-[1.6]">{back}</div>
        </div>
      </div>
    </div>
  );
};
