interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${
        variant === "primary"
          ? "bg-transparent text-secondary border border-secondary"
          : "bg-text-light text-white"
      } cursor-pointer rounded-lg h-[56px] w-full font-bold text-base hover:opacity-80 transition-opacity ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
