import { useState, useMemo, useEffect } from 'react';
import { Game } from '@/types/game';
import { getGames } from '@/services/games';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGames = useMemo(() => {
    return async (page?: number) => {
      setIsLoading(true);
      try {
        const {
          games: newGames,
          totalPages,
          currentPage,
        } = await getGames(page);
        setGames((prev) => (page === 1 ? newGames : [...prev, ...newGames]));
        setTotalPages(totalPages);
        setPage(currentPage);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  useEffect(() => {
    fetchGames(page);
  }, [page, fetchGames]);

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  return {
    games,
    totalPages,
    page,
    isLoading,
    handleSeeMore
  };
}; 