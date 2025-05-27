import { useState, useEffect, useCallback } from "react";
import { Game } from "@/types/game";
import { getGames } from "@/services/games";

interface GamesState {
  games: Game[];
  totalPages: number;
  page: number;
  isLoading: boolean;
  availableFilters: string[];
  genre: string | undefined;
}

interface GamesResponse {
  games: Game[];
  totalPages: number;
  availableFilters: string[];
  currentPage: number;
}

const initialState: GamesState = {
  games: [],
  totalPages: 0,
  page: 1,
  isLoading: false,
  availableFilters: [],
  genre: undefined,
};

export const useGames = (initialGenre?: string) => {
  const [state, setState] = useState<GamesState>(() => ({
    ...initialState,
    genre: initialGenre?.toLowerCase(),
  }));

  const updateState = useCallback(
    (
      updates: Partial<GamesState> | ((prev: GamesState) => Partial<GamesState>)
    ) => {
      setState((prev) => {
        const newState =
          typeof updates === "function" ? updates(prev) : updates;
        return { ...prev, ...newState };
      });
    },
    []
  );

  const fetchGames = useCallback(async (page: number, genre?: string) => {
    updateState({ isLoading: true });
    try {
      const {
        games: newGames,
        totalPages,
        availableFilters,
        currentPage,
      }: GamesResponse = await getGames(page, genre);

      updateState((prev) => ({
        games: page === 1 ? newGames : [...prev.games, ...newGames],
        totalPages,
        page: currentPage,
        availableFilters: ["All", ...availableFilters],
      }));
    } catch (error) {
      console.error("Error fetching games:", error);
      updateState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    } finally {
      updateState({ isLoading: false });
    }
  }, []);

  useEffect(() => {
    fetchGames(state.page, state.genre);
  }, [state.page, state.genre, fetchGames]);

  const handleSeeMore = useCallback(() => {
    updateState((prev) => ({ page: prev.page + 1 }));
  }, [updateState]);

  const handleGenreChange = useCallback(
    (newGenre: string) => {
      updateState({
        genre: newGenre === "All" ? "" : newGenre,
        page: 1,
        games: [],
      });
    },
    [updateState]
  );

  return {
    games: state.games,
    totalPages: state.totalPages,
    page: state.page,
    isLoading: state.isLoading,
    availableFilters: state.availableFilters,
    handleSeeMore,
    handleGenreChange,
    genre: state.genre,
  };
};
