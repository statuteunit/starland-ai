import { cn } from "@/utils/tools";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function Card({ children, className, ...props }: CardProps) {

  return (
    <div className={cn('p-6 rounded-[10px] transition-transform duration-200 ease-[cubic-bezier(.25,.1,.25,1)] bg-glass-bg backdrop-blur-[12px] border border-glass-border shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]', className)} {...props}>
      {children}
    </div>
  );
}
