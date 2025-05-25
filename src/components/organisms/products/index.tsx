"use client";

import { Button } from "@/components/atoms/button";
import { ProductItem } from "@/components/molecules/productItem";
import { Loader } from "@/components/atoms/loader";
import { useGames } from "@/hooks/useGames";
import { Dropdown } from "@/components/molecules/dropdown";

export const Products = () => {
  const {
    games,
    totalPages,
    page,
    isLoading,
    handleSeeMore,
    availableFilters,
    handleGenreChange,
    genre,
  } = useGames();

  return (
    <>
      <div className="grid grid-cols-[auto,1fr] items-center gap-2 text-secondary border-b border-lavenderMist pb-4 md:flex md:justify-end">
        <h4 className="text-xl font-bold">Gender |</h4>
        <Dropdown
          options={availableFilters}
          selected={genre || "All"}
          onSelect={handleGenreChange}
          className="w-full md:w-48"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {games.length > 0 &&
          games.map((game) => <ProductItem key={game.id} game={game} />)}
      </div>
      {isLoading && <Loader size="large" className="my-8" />}
      {!isLoading && page < totalPages && !genre && (
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
