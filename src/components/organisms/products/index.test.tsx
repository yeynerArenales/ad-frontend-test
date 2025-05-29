import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Products } from "./index";
import { useGames } from "@/hooks/useGames";
import { useCart } from "@/hooks/useCart";
import { mockGames } from "@/test/mocks/games";

// Mock the hooks
jest.mock("@/hooks/useGames");
jest.mock("@/hooks/useCart");

describe("Products", () => {
  const mockUseGames = {
    games: mockGames,
    loading: false,
    error: null,
    hasMore: true,
    selectedGenre: "",
    handleGenreChange: jest.fn(),
    loadMore: jest.fn(),
    totalPages: 2,
    page: 1,
    isLoading: false,
    handleSeeMore: jest.fn(),
    availableFilters: ["All", "Action", "RPG"],
    genre: "",
  };

  const mockUseCart = {
    products: [],
    loadingIds: new Set(),
    waitingIds: new Set(),
    handleCartAction: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useGames as jest.Mock).mockReturnValue(mockUseGames);
    (useCart as jest.Mock).mockReturnValue(mockUseCart);
  });

  it("renders products grid correctly", () => {
    render(<Products initialGenre="" />);

    expect(screen.getByText("Genre |")).toBeInTheDocument();

    mockGames.forEach((game) => {
      expect(screen.getByText(game.name)).toBeInTheDocument();
      expect(screen.getByText(`$${game.price}`)).toBeInTheDocument();
    });

    expect(screen.getByText("See more")).toBeInTheDocument();
  });

  it("handles genre change correctly", () => {
    render(<Products initialGenre="" />);

    const genreButton = screen.getByRole("button", { name: /All/i });
    fireEvent.click(genreButton);

    const actionGenre = screen
      .getAllByText("Action")
      .find((el) => el.tagName === "LI");
    expect(actionGenre).toBeDefined();
    fireEvent.click(actionGenre!);

    expect(mockUseGames.handleGenreChange).toHaveBeenCalledWith("Action");
  });

  it("handles cart actions correctly", async () => {
    mockUseCart.handleCartAction.mockResolvedValue(false);
    render(<Products initialGenre="" />);

    const addButtons = screen.getAllByRole("button", { name: /Add to cart/i });
    fireEvent.click(addButtons[0]);

    expect(mockUseCart.handleCartAction).toHaveBeenCalledWith(mockGames[0]);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Game added to cart");
    });
  });

  it("shows loading state correctly", () => {
    (useGames as jest.Mock).mockReturnValue({
      ...mockUseGames,
      isLoading: true,
    });

    render(<Products initialGenre="" />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("disables dropdown when loading", () => {
    (useGames as jest.Mock).mockReturnValue({
      ...mockUseGames,
      isLoading: true,
    });

    render(<Products initialGenre="" />);

    const genreButton = screen.getByRole("button", { name: /All/i });
    expect(genreButton).toBeDisabled();
  });

  it("handles error in cart action", async () => {
    mockUseCart.handleCartAction.mockRejectedValue(
      new Error("Failed to add to cart")
    );

    render(<Products initialGenre="" />);

    const addButtons = screen.getAllByRole("button", { name: /Add to cart/i });
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "An error occurred. Please try again."
      );
    });
  });

  it('hides "See more" button when genre is selected', () => {
    (useGames as jest.Mock).mockReturnValue({
      ...mockUseGames,
      genre: "Action",
    });

    render(<Products initialGenre="Action" />);

    expect(screen.queryByText("See more")).not.toBeInTheDocument();
  });
});
