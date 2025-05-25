"use client";

import { Button } from "@/components/atoms/button";
import { ProductItem } from "@/components/molecules/productItem";
import { getGames } from "@/services/games";
import { Game } from "@/types/game";
import { useEffect, useState, useMemo } from "react";

export const Products = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const fetchGames = useMemo(() => {
    return async (page?: number) => {
      const {games: newGames, totalPages, currentPage} = await getGames(page);
      setGames(prev => page === 1 ? newGames : [...prev, ...newGames]);
      setTotalPages(totalPages);
      setPage(currentPage);
    };
  }, []);

  useEffect(() => {
    fetchGames(page);
  }, [page, fetchGames]);

  const handleSeeMore = () => {
    setPage(page + 1);
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {games.length > 0 && games.map((game) => <ProductItem key={game.id} game={game} />)}
    </div>
     {page < totalPages && <Button className="mt-4 md:w-[137px]" variant="secondary" onClick={handleSeeMore}> See more</Button>}
    </>
  );
};