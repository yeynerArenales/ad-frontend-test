import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { DropdownProps } from "./types";

export const Dropdown = ({
  options,
  selected,
  onSelect,
  className = "",
  disabled = false,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative w-48 ${className}`}>
      <button
        type="button"
        className={cn(
          "w-full flex items-center justify-between px-4 py-2 text-xl text-secondary",
          disabled && "opacity-50 cursor-not-allowed" || ""
        )}
        disabled={disabled}
        onClick={() => {
          if (options.length > 0) {
            setOpen((prev) => !prev);
          }
        }}
      >
        <span className="capitalize">{selected}</span>
        <Image
          src="/icons/arrow.svg"
          alt="Arrow"
          width={24}
          height={24}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800 ${
                option.toLowerCase() === selected.toLowerCase()
                  ? "font-semibold"
                  : ""
              }`}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
