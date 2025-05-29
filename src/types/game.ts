export interface Game {
  id: string;
  name: string;
  genre: string;
  price: number;
  image: string;
  description: string;
  isNew: boolean;
}

export interface GetGamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}
