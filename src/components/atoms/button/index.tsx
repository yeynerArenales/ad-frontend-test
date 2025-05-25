import { Loader } from "../loader";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  className,
  onClick,
  disabled,
  type = "button",
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${
        variant === "primary"
          ? "bg-transparent text-secondary border border-secondary"
          : "bg-text-dark text-white"
      } cursor-pointer rounded-lg h-[56px] w-full font-bold text-base hover:opacity-80 transition-opacity ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {isLoading ? <Loader size="small" className="mr-2" /> : children}
    </button>
  );
};
