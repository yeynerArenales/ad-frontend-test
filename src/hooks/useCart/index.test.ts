import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { getCart, addToCart, removeFromCart } from "@/services/cart";
import { useCart } from "./index";

jest.mock("@/services/cart", () => ({
  getCart: jest.fn(),
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
}));

let cartState: any[] = [];
const Wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);

describe("useCart", () => {
  beforeEach(() => {
    cartState = [];
    jest.clearAllMocks();
    (getCart as jest.Mock).mockImplementation(() => {
      return Promise.resolve(cartState);
    });
    (addToCart as jest.Mock).mockImplementation((game) => {
      cartState = [game];
      return Promise.resolve();
    });
    (removeFromCart as jest.Mock).mockImplementation((game) => {
      cartState = [];
      return Promise.resolve();
    });
  });

  it("should mount hook and verify initial state", async () => {
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current).toBeDefined();
    expect(result.current.products).toBeDefined();
    expect(result.current.loading).toBeDefined();
    expect(result.current.handleCartAction).toBeDefined();
    expect(result.current.loadingIds).toBeDefined();
    expect(result.current.waitingIds).toBeDefined();

    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(getCart).toHaveBeenCalledTimes(1);
  }, 5000);
});
