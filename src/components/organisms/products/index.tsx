"use client";

import { useState } from "react";
import { useGames } from "@/hooks/useGames";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/molecules/button";
import { ProductItem } from "@/components/molecules/productItem";
import { Dropdown } from "@/components/molecules/dropdown";
import { Spinner } from "@/components/atoms/spinner";
import { Toast } from "@/components/atoms/toast";
import { Game, ToastState } from "@/types";

export const Products = ({ initialGenre }: { initialGenre: string }) => {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
  });

  const {
    games,
    totalPages,
    page,
    isLoading,
    handleSeeMore,
    availableFilters,
    handleGenreChange,
    genre,
  } = useGames(initialGenre);

  const {
    products: productsCart,
    loadingIds,
    waitingIds,
    handleCartAction,
  } = useCart();

  const handleCartClick = async (game: Game) => {
    try {
      const wasInCart = await handleCartAction(game);
      setToast({
        show: true,
        message: wasInCart ? "Game removed from cart" : "Game added to cart",
      });
    } catch (error) {
      setToast({ show: true, message: "An error occurred. Please try again." });
    }
  };

  const handleToastClose = () => setToast((prev) => ({ ...prev, show: false }));

  return (
    <>
      <div className="grid grid-cols-[auto,1fr] items-center gap-2 text-secondary border-b border-lavenderMist pb-4 md:flex md:justify-end">
        <h4 className="text-xl font-bold">Genre |</h4>
        <Dropdown
          disabled={loadingIds.size > 0 || waitingIds.size > 0 || isLoading}
          options={availableFilters}
          selected={genre || "All"}
          onSelect={handleGenreChange}
          className="w-full md:w-48"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {games.map((game) => (
          <ProductItem
            key={game.id}
            game={game}
            handleOnClick={() => handleCartClick(game)}
            isInCart={productsCart.some((item) => item.id === game.id)}
            isLoading={loadingIds.has(game.id) || waitingIds.has(game.id)}
          />
        ))}
      </div>
      {isLoading && <Spinner size="large" className="my-8" />}
      {!isLoading && page < totalPages && !genre && (
        <Button
          className="mt-4 md:w-[137px]"
          variant="secondary"
          onClick={handleSeeMore}
        >
          See more
        </Button>
      )}
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={handleToastClose}
      />
    </>
  );
};
