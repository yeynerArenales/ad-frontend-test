import { Spinner } from "@/components/atoms/spinner";
import { cn } from "@/utils/cn";
import { ButtonProps } from "./types";

export const Button = ({
  children,
  variant = "secondary",
  className,
  onClick,
  disabled,
  type = "button",
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "cursor-pointer rounded-lg h-[56px] w-full font-bold text-base hover:opacity-80 transition-opacity",
        variant === "primary"
          ? "bg-transparent text-secondary border border-secondary"
          : "bg-text-dark text-white",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {isLoading ? <Spinner size="small" className="mr-2" /> : children}
    </button>
  );
};
