import Image from "next/image";
import { IconButtonProps } from "./types";

export const IconButton = ({
  icon,
  className = "",
  type = "button",
  ...props
}: IconButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center bg-transparent p-2 hover:opacity-80 ${className}`}
      {...props}
    >
      <Image
        src={icon}
        alt="Icon button"
        width={24}
        height={24}
        className="h-6 w-6"
      />
    </button>
  );
};
