import { Game } from "@/types/game";

export interface GamesState {
  games: Game[];
  totalPages: number;
  page: number;
  isLoading: boolean;
  availableFilters: string[];
  genre: string | undefined;
}

export interface GamesResponse {
  games: Game[];
  totalPages: number;
  availableFilters: string[];
  currentPage: number;
}
