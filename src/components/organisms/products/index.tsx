"use client";

import { Button } from "@/components/atoms/button";
import { ProductItem } from "@/components/molecules/productItem";
import { Loader } from "@/components/atoms/loader";
import { useGames } from "@/hooks/useGames";

export const Products = () => {
  const { games, totalPages, page, isLoading, handleSeeMore } = useGames();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {games.length > 0 &&
          games.map((game) => <ProductItem key={game.id} game={game} />)}
      </div>
      {isLoading && <Loader size="large" className="my-8" />}
      {!isLoading && page < totalPages && (
        <Button
          className="mt-4 md:w-[137px]"
          variant="secondary"
          onClick={handleSeeMore}
        >
          See more
        </Button>
      )}
    </>
  );
};
