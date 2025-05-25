import { useState, useCallback, useEffect } from "react";
import { Game } from "@/types/game";
import { getCart, addToCart, removeFromCart } from "@/services/cart";

export const useCart = () => {
  const [cart, setCart] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const items = await getCart();
      setCart(items);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddToCart = useCallback(async (game: Game) => {
    setLoading(true);
    try {
      await addToCart(game);
      await fetchCart();
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  const handleRemoveFromCart = useCallback(async (game: Game) => {
    setLoading(true);
    try {
      await removeFromCart(game);
      await fetchCart();
    } finally {
      setLoading(false);
    }
  }, [fetchCart]);

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    cart,
    loading,
    fetchCart,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
  };
};
