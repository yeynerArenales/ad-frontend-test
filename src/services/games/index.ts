import { API_CONFIG } from "@/config/api";

export const getGames = async (currentPage: number = 1, genre: string = "") => {
  const response = await fetch(
    `${API_CONFIG.baseURL}/games?page=${currentPage}&genre=${genre}`
  );
  return response.json();
};
