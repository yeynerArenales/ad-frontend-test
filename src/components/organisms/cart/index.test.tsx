import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Cart } from "./index";
import { useCart } from "@/hooks/useCart";
import { mockGames } from "@/test/mocks/games";

jest.mock("@/hooks/useCart");
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Cart", () => {
  const mockUseCart = {
    products: mockGames.slice(0, 2),
    loading: false,
    handleCartAction: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useCart as jest.Mock).mockReturnValue(mockUseCart);
  });

  it("renders cart items correctly", () => {
    render(<Cart />);
    expect(screen.getAllByText("2 Items").length).toBeGreaterThan(0);
    mockUseCart.products.forEach((game) => {
      expect(screen.getAllByText(game.name).length).toBeGreaterThan(0);
      expect(screen.getAllByText(`$${game.price}`).length).toBeGreaterThan(0);
    });
  });

  it("shows empty cart message when no items", () => {
    (useCart as jest.Mock).mockReturnValue({
      ...mockUseCart,
      products: [],
    });
    render(<Cart />);
    expect(screen.getByText("No items in cart")).toBeInTheDocument();
  });

  it("handles remove item correctly", async () => {
    mockUseCart.handleCartAction.mockResolvedValue(true);
    render(<Cart />);
    const removeButtons = screen.getAllByRole("button", { name: /Icon button/i });
    fireEvent.click(removeButtons[0]);
    expect(mockUseCart.handleCartAction).toHaveBeenCalledWith(mockUseCart.products[0]);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Game removed from cart");
    });
  });

  it("handles error when removing item", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockUseCart.handleCartAction.mockRejectedValue(new Error("Failed to remove"));
    render(<Cart />);
    const removeButtons = screen.getAllByRole("button", { name: /Icon button/i });
    fireEvent.click(removeButtons[0]);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("An error occurred. Please try again.");
    });
    errorSpy.mockRestore();
  });

  it("shows loading state correctly", () => {
    (useCart as jest.Mock).mockReturnValue({
      ...mockUseCart,
      loading: true,
    });
    render(<Cart />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("disables checkout button when cart is empty", () => {
    (useCart as jest.Mock).mockReturnValue({
      ...mockUseCart,
      products: [],
    });
    render(<Cart />);
    const checkoutButton = screen.getByRole("button", { name: /Checkout/i });
    expect(checkoutButton).toBeDisabled();
  });

  it("enables checkout button when cart has items", () => {
    render(<Cart />);
    const checkoutButton = screen.getByRole("button", { name: /Checkout/i });
    expect(checkoutButton).not.toBeDisabled();
  });
}); 