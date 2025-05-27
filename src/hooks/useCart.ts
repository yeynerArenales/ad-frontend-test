import { useState, useCallback, useEffect } from "react";
import { Game } from "@/types/game";
import { getCart, addToCart, removeFromCart } from "@/services/cart";

type CartAction = () => Promise<boolean>;

interface CartState {
  products: Game[];
  loading: boolean;
  loadingIds: Set<string>;
  waitingIds: Set<string>;
  actionQueue: CartAction[];
  isProcessing: boolean;
}

export const useCart = () => {
  const [state, setState] = useState<CartState>({
    products: [],
    loading: false,
    loadingIds: new Set(),
    waitingIds: new Set(),
    actionQueue: [],
    isProcessing: false,
  });

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
    if (state.isProcessing || state.actionQueue.length === 0) return;

    updateState({ isProcessing: true });
    const nextAction = state.actionQueue[0];

    try {
      await nextAction();
    } finally {
      updateState((prev) => ({
        actionQueue: prev.actionQueue.slice(1),
        isProcessing: false,
      }));
    }
  }, [state.isProcessing, state.actionQueue, updateState]);

  useEffect(() => {
    if (!state.isProcessing && state.actionQueue.length > 0) {
      processNextAction();
    }
  }, [state.isProcessing, state.actionQueue, processNextAction]);

  const handleCartAction = useCallback(
    async (game: Game): Promise<boolean> => {
      updateState({ loading: true });

      if (state.isProcessing) {
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
            const isInCart = state.products.some((item) => item.id === game.id);

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
    [state.products, state.isProcessing, fetchCart, updateState]
  );

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    products: state.products,
    loading: state.loading,
    loadingIds: state.loadingIds,
    waitingIds: state.waitingIds,
    handleCartAction,
  };
};
