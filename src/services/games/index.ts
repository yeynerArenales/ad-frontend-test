import { httpClient } from "@/config/api";
import { GetGamesResponse } from "@/../types";

export const getGames = async (currentPage: number = 1) => {
  const response = await httpClient.get<GetGamesResponse>(`/games?page=${currentPage}`);
  return response;
};
