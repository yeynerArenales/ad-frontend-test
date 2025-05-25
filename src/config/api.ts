// API Configuration
export const API_CONFIG = {
  baseURL: process.env.API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
};

// API Client configuration
export const httpClient = {
  async get<T>(endpoint: string) {
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
      method: "GET",
      headers: API_CONFIG.headers,
    });
    return response.json() as Promise<T>;
  },
};
