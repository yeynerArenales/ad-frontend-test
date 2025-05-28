import { Game } from "@/types/game";

export type CartAction = () => Promise<boolean>;

export interface CartState {
  products: Game[];
  loading: boolean;
  loadingIds: Set<string>;
  waitingIds: Set<string>;
  actionQueue: CartAction[];
  isProcessing: boolean;
}
