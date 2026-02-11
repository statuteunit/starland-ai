type ButtonHTMLProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export default function Button({
  children,
  isLoading,
  disabled,
  className,
  ...props
}: ButtonHTMLProps) {
  const isDisabled = disabled || isLoading;

  const classes = [
    "inline-flex items-center justify-center",
    "font-semibold",
    "transition-all duration-200",
    "rounded-[8px]",
    "outline-none",
    "bg-primary-gradient text-white shadow-[0_4px_14px_0_rgba(139,92,246,0.39)]",
    !isDisabled
      ? "hover:translate-y-[-1px] hover:shadow-[0_6px_20px_0_rgba(139,92,246,0.23)] hover:opacity-90"
      : "",
    isDisabled ? "opacity-60 cursor-not-allowed [transform:none]" : "cursor-pointer",
    "px-6 py-3 text-base",
    "sm:px-4 sm:py-2 sm:text-sm",
    "lg:px-8 lg:py-4 lg:text-lg",
    "3xl:px-10 3xl:py-5 3xl:text-[1.125rem]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={isDisabled} {...props}>
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white/30 rounded-full border-t-white animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
}
