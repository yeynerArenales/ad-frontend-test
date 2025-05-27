"use client";

import { Spinner } from "@/components/atoms/spinner";
import { CartItem } from "@/components/molecules/cartItem";
import { CartSummary } from "@/components/molecules/cartSummary";
import { useCart } from "@/hooks/useCart";
import { Game } from "@/types/game";

export const Cart = () => {
  const { products, loading, removeFromCart } = useCart();

  const handleRemove = (game: Game) => {
    removeFromCart(game);
  };

  return (
    <>
      <h2 className="text-xl text-secondary">
        {products.length > 0
          ? `${products.length} ${products.length === 1 ? "Item" : "Items"}`
          : "No items in cart"}
      </h2>
      <div className="relative mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
            <Spinner size="large" />
          </div>
        )}
        <section className="col-span-1">
          {products.map((game, index) => (
            <CartItem
              key={game.id}
              game={game}
              handleRemove={handleRemove}
              className={index === products.length - 1 ? "border-b-0" : ""}
            />
          ))}
        </section>
        <section className="col-span-1">
          <CartSummary products={products} />
        </section>
      </div>
    </>
  );
};
