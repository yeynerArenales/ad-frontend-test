import React from "react";
import { renderHook, waitFor, act } from "@testing-library/react";
import { getGames } from "@/services/games";
import { useGames } from "./index";
import { GamesResponse } from "./types";
import { mockGames } from "@/test/mocks/games";

jest.mock("@/services/games", () => ({
  getGames: jest.fn(),
}));

const mockReplace = jest.fn();
const mockScrollBy = jest.fn();

Object.defineProperty(window, 'scrollBy', {
  value: mockScrollBy,
  writable: true,
});

Object.defineProperty(window, 'innerHeight', {
  value: 1000,
  writable: true,
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => "/",
}));

const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn().mockImplementation((...args: Parameters<typeof console.error>) => {
    const message = args[0];
    if (
      typeof message === 'string' && 
      (message.includes('Warning: An update to TestComponent inside a test was not wrapped in act') ||
       message.includes('act(...)'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  });
});

afterAll(() => {
  console.error = originalError;
});

const mockGamesResponse: GamesResponse = {
  games: mockGames,
  totalPages: 3,
  availableFilters: ["Action", "Adventure", "RPG"],
  currentPage: 1,
};

const mockGamesPageTwoResponse: GamesResponse = {
  games: [
    {
      id: "3",
      name: "Game 3",
      genre: "RPG",
      price: 49.99,
      image: "/game3.jpg",
      description: "Description 3",
      isNew: true,
    },
  ],
  totalPages: 3,
  availableFilters: ["Action", "Adventure", "RPG"],
  currentPage: 2,
};

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps): React.ReactElement =>
  React.createElement(React.Fragment, null, children);

describe("useGames", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getGames as jest.Mock).mockResolvedValue(mockGamesResponse);
    mockReplace.mockClear();
    mockScrollBy.mockClear();
  });

  describe("Initial state and mounting", () => {
    it("should mount hook and verify initial state", async () => {
      const { result } = renderHook(() => useGames(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current).toBeDefined();
      expect(result.current.games).toEqual(mockGames);
      expect(result.current.totalPages).toBe(3);
      expect(result.current.page).toBe(1);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.availableFilters).toEqual([
        "All",
        "Action",
        "Adventure",
        "RPG",
      ]);
      expect(result.current.genre).toBeUndefined();
      expect(result.current.handleSeeMore).toBeDefined();
      expect(result.current.handleGenreChange).toBeDefined();
      expect(getGames).toHaveBeenCalledWith(1, undefined);
    });

    it("should initialize with genre when provided", async () => {
      const { result } = renderHook(() => useGames("Action"), {
        wrapper: Wrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.genre).toBe("action");
      expect(getGames).toHaveBeenCalledWith(1, "action");
    });
  });

  describe("Pagination", () => {
    it("should handle see more functionality", async () => {
      (getGames as jest.Mock)
        .mockResolvedValueOnce(mockGamesResponse)
        .mockResolvedValueOnce(mockGamesPageTwoResponse);

      const { result } = renderHook(() => useGames(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.games).toHaveLength(2);
      expect(result.current.page).toBe(1);

      act(() => {
        result.current.handleSeeMore();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(2);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.games).toHaveLength(3);
      expect(result.current.games[2].name).toBe("Game 3");
      expect(getGames).toHaveBeenCalledTimes(2);
      expect(getGames).toHaveBeenNthCalledWith(2, 2, undefined);
    });
  });

  describe("Genre filtering", () => {
    it("should handle genre change and update URL", async () => {
      const genreFilterResponse: GamesResponse = {
        games: [mockGames[0]],
        totalPages: 1,
        availableFilters: ["Action"],
        currentPage: 1,
      };

      (getGames as jest.Mock)
        .mockResolvedValueOnce(mockGamesResponse)
        .mockResolvedValueOnce(genreFilterResponse);

      const { result } = renderHook(() => useGames(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.games).toHaveLength(2);
      expect(result.current.genre).toBeUndefined();

      act(() => {
        result.current.handleGenreChange("Action");
      });

      await waitFor(() => {
        expect(result.current.genre).toBe("Action");
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.games).toHaveLength(1);
      expect(result.current.page).toBe(1);
      expect(result.current.games[0].name).toBe("Game 1");
      expect(getGames).toHaveBeenCalledTimes(2);
      expect(getGames).toHaveBeenNthCalledWith(2, 1, "Action");
      expect(mockReplace).toHaveBeenCalledWith("/?genre=action");
    });

    it("should handle 'All' genre selection and remove URL param", async () => {
      (getGames as jest.Mock)
        .mockResolvedValueOnce(mockGamesResponse)
        .mockResolvedValueOnce(mockGamesResponse);

      const { result } = renderHook(() => useGames("Action"), {
        wrapper: Wrapper,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.handleGenreChange("All");
      });

      await waitFor(() => {
        expect(result.current.genre).toBe("");
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(getGames).toHaveBeenCalledTimes(2);
      expect(getGames).toHaveBeenNthCalledWith(2, 1, "");
      expect(mockReplace).toHaveBeenCalledWith("/");
    });

    it("should update URL with lowercase genre", async () => {
      const { result } = renderHook(() => useGames(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.handleGenreChange("ACTION");
      });

      await waitFor(() => {
        expect(result.current.genre).toBe("ACTION");
      });

      expect(mockReplace).toHaveBeenCalledWith("/?genre=action");
    });
  });

  describe("Error handling", () => {
    it("should handle fetch errors gracefully", async () => {
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      (getGames as jest.Mock).mockRejectedValue(new Error("Network error"));

      const { result } = renderHook(() => useGames(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.games).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching games:",
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe("Loading states", () => {
    it("should manage loading state correctly", async () => {
      let resolvePromise: (value: GamesResponse) => void;
      const gamePromise = new Promise<GamesResponse>((resolve) => {
        resolvePromise = resolve;
      });

      (getGames as jest.Mock).mockReturnValue(gamePromise);

      const { result } = renderHook(() => useGames(), { wrapper: Wrapper });

      expect(result.current.isLoading).toBe(true);

      resolvePromise!(mockGamesResponse);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.games).toEqual(mockGames);
    });
  });

  describe("Router functionality", () => {
    it("should call router.replace when genre changes", async () => {
      const { result } = renderHook(() => useGames(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.handleGenreChange("Action");
      });

      expect(mockReplace).toHaveBeenCalledWith("/?genre=action");
    });

    it("should remove genre param when selecting All", async () => {
      const { result } = renderHook(() => useGames(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.handleGenreChange("All");
      });

      expect(mockReplace).toHaveBeenCalledWith("/");
    });
  });

  describe("Auto-scroll functionality", () => {
    it("should NOT scroll on initial load (page 1)", async () => {
      renderHook(() => useGames(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(mockScrollBy).not.toHaveBeenCalled();
      });
    });

    it("should scroll when loading more content (page > 1)", async () => {
      (getGames as jest.Mock)
        .mockResolvedValueOnce(mockGamesResponse)
        .mockResolvedValueOnce(mockGamesPageTwoResponse);

      const { result } = renderHook(() => useGames(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      mockScrollBy.mockClear();

      act(() => {
        result.current.handleSeeMore();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockScrollBy).toHaveBeenCalledWith({
        top: 500,
        behavior: 'smooth'
      });
    });

    it("should NOT scroll when changing genre (resets to page 1)", async () => {
      const genreFilterResponse: GamesResponse = {
        games: [mockGames[0]],
        totalPages: 1,
        availableFilters: ["Action"],
        currentPage: 1,
      };

      (getGames as jest.Mock)
        .mockResolvedValueOnce(mockGamesResponse)
        .mockResolvedValueOnce(genreFilterResponse);

      const { result } = renderHook(() => useGames(), { wrapper: Wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      mockScrollBy.mockClear();

      act(() => {
        result.current.handleGenreChange("Action");
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockScrollBy).not.toHaveBeenCalled();
    });
  });
});
