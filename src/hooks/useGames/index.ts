import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
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

const useSearchParamsUpdate = () => {
  const router = useRouter();
  const pathname = usePathname();

  const updateSearchParams = useCallback((key: string, value: string | null) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
      router.replace(`${pathname}${url.search}`);
    }
  }, [router, pathname]);

  return { updateSearchParams };
};

export const useGames = (initialGenre?: string) => {
  const { updateSearchParams } = useSearchParamsUpdate();
  
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
      const finalGenre = newGenre === "All" ? "" : newGenre;
      
      updateState({
        genre: finalGenre,
        page: 1,
        games: [],
      });

      updateSearchParams("genre", finalGenre ? finalGenre.toLowerCase() : null);
    },
    [updateState, updateSearchParams]
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
