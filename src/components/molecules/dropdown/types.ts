export interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  className?: string;
  disabled?: boolean;
}
