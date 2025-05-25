import { API_CONFIG } from "@/config/api";

export const getGames = async (currentPage: number = 1) => {
  const response = await fetch(
    `${API_CONFIG.baseURL}/games?page=${currentPage}`
  );
  return response.json();
};
