import { httpClient } from "@/config/api";
import { GetGamesResponse } from "@/../types";

export const getGames = async () => {
  const response = await httpClient.get<GetGamesResponse>(`/games`);
  return response;
};
