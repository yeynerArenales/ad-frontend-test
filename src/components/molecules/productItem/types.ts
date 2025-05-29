import { Game } from "@/types/game";

export interface ProductItemProps {
  game: Game;
  handleOnClick: () => void;
  isInCart: boolean;
  isLoading: boolean;
}