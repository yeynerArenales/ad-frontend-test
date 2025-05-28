export interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}
