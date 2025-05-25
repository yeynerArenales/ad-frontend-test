"use client";

import { useState } from "react";
import { useGames } from "@/hooks/useGames";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/atoms/button";
import { ProductItem } from "@/components/molecules/productItem";
import { Loader } from "@/components/atoms/loader";
import { Dropdown } from "@/components/molecules/dropdown";
import { Toast } from "@/components/molecules/toast";
import { Game } from "@/types/game";

export const Products = () => {
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });
  const [loadingId, setLoadingId] = useState<string | null>(null);

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

  const { cart, addToCart, removeFromCart } = useCart();

  const handleCartAction = async (game: Game) => {
    setLoadingId(game.id);
    try {
      if (cart.some((item) => item.id === game.id)) {
        await removeFromCart(game);
        setToast({ show: true, message: "Game removed from cart" });
      } else {
        await addToCart(game);
        setToast({ show: true, message: "Game added to cart" });
      }
    } catch (error) {
      setToast({ show: true, message: "An error occurred. Please try again." });
    } finally {
      setLoadingId(null);
    }
  };

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
        {games.map((game) => (
          <ProductItem
            key={game.id}
            game={game}
            handleOnClick={() => handleCartAction(game)}
            isInCart={cart.some((item) => item.id === game.id)}
            isLoading={loadingId === game.id}
          />
        ))}
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
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};
