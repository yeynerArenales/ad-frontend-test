import { useState, useEffect, useCallback } from "react";
import { getGames } from "@/services/games";
import { GamesState, GamesResponse } from "./types";

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

  const { page, genre, games, totalPages, availableFilters, isLoading } = state;

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

  useEffect(() => {
    fetchGames(page, genre);
  }, [page, genre, fetchGames]);

  return {
    games,
    totalPages,
    page,
    isLoading,
    availableFilters,
    handleSeeMore,
    handleGenreChange,
    genre,
  };
};
