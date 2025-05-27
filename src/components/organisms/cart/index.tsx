"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { Spinner } from "@/components/atoms/spinner";
import { CartItem } from "@/components/molecules/cartItem";
import { CartSummary } from "@/components/molecules/cartSummary";
import { Toast } from "@/components/molecules/toast";
import { Button } from "@/components/molecules/button";
import { Game, ToastState } from "@/types";

export const Cart = () => {
  const router = useRouter();
  const { products, loading, handleCartAction } = useCart();
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
  });

  const handleRemove = async (game: Game) => {
    try {
      await handleCartAction(game);
      setToast({
        show: true,
        message: "Game removed from cart",
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setToast({ show: true, message: "An error occurred. Please try again." });
    }
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
          <Button
            variant="secondary"
            className="mt-8"
            onClick={() => router.push("/")}
            disabled={products.length === 0}
          >
            Checkout
          </Button>
        </section>
      </div>
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};
