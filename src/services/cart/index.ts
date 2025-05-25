import { Game } from "@/types/game";
import { API_CONFIG } from "@/config/api";

export const addToCart = async (game: Game) => {
  const res = await fetch(`${API_CONFIG.baseURL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  return res.json();
};

export const getCart = async () => {
  const res = await fetch(`${API_CONFIG.baseURL}/cart`);
  return res.json();
};

export const removeFromCart = async (game: Game) => {
  const res = await fetch(`${API_CONFIG.baseURL}/cart`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(game),
  });
  return res.json();
};