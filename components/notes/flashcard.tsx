import { cn } from "@/utils/tools";
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
  const faceBase =
    "absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[12px] flex flex-col items-center justify-center p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] border border-white/10";

  return (
    <div className={"w-full max-w-[600px] h-[400px] lg:h-[500px] [perspective:1000px] cursor-pointer mx-auto"} onClick={onFlip}>
      <div className={`w-full h-full relative transition-transform duration-[600ms] ease-in-out [transform-style:preserve-3d] rounded-[12px] lg:rounded-[20px] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
        <div className={cn("bg-[rgba(30,41,59,0.8)] backdrop-blur-[10px] text-primary",faceBase)}>
          <div className="text-2xl lg:text-4xl text-center leading-[1.6]">{front}</div>
          <div className="absolute bottom-6 text-sm lg:text-base text-muted">Click to flip</div>
        </div>

        <div className={cn("bg-glass-bg text-primary [transform:rotateY(180deg)] border border-primary-accent shadow-[0_0_15px_rgba(139,92,246,0.2)]",faceBase)}>
          <div className="text-2xl lg:text-4xl text-center leading-[1.6]">{back}</div>
        </div>
      </div>
    </div>
  );
};
