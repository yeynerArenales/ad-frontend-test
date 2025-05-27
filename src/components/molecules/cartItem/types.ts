import { Game } from "@/types/game";

export interface CartItemProps {
  game: Game;
  handleRemove: (game: Game) => void;
  className?: string;
  isLoading?: boolean;
}
