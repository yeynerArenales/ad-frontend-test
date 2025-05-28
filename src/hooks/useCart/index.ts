import { useState, useCallback, useEffect } from "react";
import { Game } from "@/types/game";
import { getCart, addToCart, removeFromCart } from "@/services/cart";
import { CartState, CartAction } from "./types";

export const useCart = () => {
  const [state, setState] = useState<CartState>({
    products: [],
    loading: false,
    loadingIds: new Set(),
    waitingIds: new Set(),
    actionQueue: [],
    isProcessing: false,
  });

  const {
    products,
    loading,
    loadingIds,
    waitingIds,
    actionQueue,
    isProcessing,
  } = state;

  const updateState = useCallback(
    (
      updates: Partial<CartState> | ((prev: CartState) => Partial<CartState>)
    ) => {
      setState((prev) => {
        const newState =
          typeof updates === "function" ? updates(prev) : updates;
        return { ...prev, ...newState };
      });
    },
    []
  );

  const fetchCart = useCallback(async () => {
    updateState({ loading: true });
    try {
      const items = await getCart();
      updateState({ products: items });
    } finally {
      updateState({ loading: false });
    }
  }, [updateState]);

  const processNextAction = useCallback(async () => {
    if (isProcessing || actionQueue.length === 0) return;

    updateState({ isProcessing: true });
    const nextAction = actionQueue[0];

    try {
      await nextAction();
    } finally {
      updateState((prev) => ({
        actionQueue: prev.actionQueue.slice(1),
        isProcessing: false,
      }));
    }
  }, [isProcessing, actionQueue, updateState]);

  const handleCartAction = useCallback(
    async (game: Game): Promise<boolean> => {
      updateState({ loading: true });

      if (isProcessing) {
        updateState((prev) => ({
          waitingIds: new Set([...Array.from(prev.waitingIds), game.id]),
        }));
      }

      updateState((prev) => ({
        loadingIds: new Set([...Array.from(prev.loadingIds), game.id]),
      }));

      return new Promise((resolve) => {
        const cartAction: CartAction = async () => {
          try {
            const isInCart = products.some((item) => item.id === game.id);

            if (isInCart) {
              await removeFromCart(game);
            } else {
              await addToCart(game);
            }
            await fetchCart();
            resolve(isInCart);
            return isInCart;
          } catch (error) {
            throw error;
          } finally {
            updateState((prev) => ({
              loadingIds: new Set(
                [...Array.from(prev.loadingIds)].filter((id) => id !== game.id)
              ),
              waitingIds: new Set(
                [...Array.from(prev.waitingIds)].filter((id) => id !== game.id)
              ),
              loading: false,
            }));
          }
        };

        updateState((prev) => ({
          actionQueue: [...prev.actionQueue, cartAction],
        }));
      });
    },
    [products, isProcessing, fetchCart, updateState]
  );

  useEffect(() => {
    if (!isProcessing && actionQueue.length > 0) {
      processNextAction();
    }
  }, [isProcessing, actionQueue, processNextAction]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    products,
    loading,
    loadingIds,
    waitingIds,
    handleCartAction,
  };
};
