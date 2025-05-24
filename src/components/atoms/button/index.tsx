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
          ? "bg-transparent text-neutralDark border border-neutralDark"
          : "bg-neutral text-white"
      } cursor-pointer rounded-lg h-[56px] w-full font-bold text-base hover:opacity-80 transition-opacity ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
