import { useEffect } from "react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number; // in ms
}

export const Toast = ({ message, show, onClose, duration = 2000 }: ToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-auto md:left-1/2 md:-translate-x-1/2 bg-primary text-white px-6 py-3 rounded shadow-lg z-50 transition-all animate-fade-in">
      {message}
    </div>
  );`§`
}; 