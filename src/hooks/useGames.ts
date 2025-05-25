import { useState, useMemo, useEffect } from "react";
import { Game } from "@/types/game";
import { getGames } from "@/services/games";

export const useGames = (initialGenre?: string) => {
  const [games, setGames] = useState<Game[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [availableFilters, setAvailableFilters] = useState<string[]>([]);
  const [genre, setGenre] = useState<string | undefined>(initialGenre);

  const fetchGames = useMemo(() => {
    return async (page?: number, genre?: string) => {
      setIsLoading(true);
      try {
        const {
          games: newGames,
          totalPages,
          availableFilters,
          currentPage,
        } = await getGames(page, genre);
        setGames((prev) => (page === 1 ? newGames : [...prev, ...newGames]));
        console.log(totalPages);
        console.log(currentPage);
        setTotalPages(totalPages);
        setPage(currentPage);
        setAvailableFilters(["All", ...availableFilters]);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  useEffect(() => {
    fetchGames(page, genre);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, genre]);

  const handleSeeMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleGenreChange = (newGenre: string) => {
    if (newGenre === "All") {
      setGenre("");
    } else {
      setGenre(newGenre);
    }
    setPage(1);
    setGames([]);
  };

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
