import { create } from "zustand";

type CartItem = {
  [key: string]: any;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number, qty?: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (item) => {
    const currentCart = get().cart;

    if (Array.isArray(item)) {
      // if adding multiple items
      const newItems = item.map((newItem) => {
        const existing = currentCart.find((i) => i.id === newItem.id);
        if (existing) {
          return {
            ...existing,
            qty: existing.qty + newItem.qty,
          };
        }
        return newItem;
      });

      set({ cart: [...currentCart, ...newItems] });
    } else {
      // single item
      const existing = currentCart.find((i) => i.id === item.id);
      if (existing) {
        set({
          cart: currentCart.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
          ),
        });
      } else {
        set({ cart: [...currentCart, item] });
      }
    }
  },
  removeFromCart: (id) =>
    set({
      cart: get().cart.filter((item) => item.id !== id),
    }),

  updateQuantity: (id, quantity, qty) =>
    set({
      cart: get().cart.map((item) =>
        item.id === id
          ? { ...item, qty: quantity !== undefined ? quantity : qty }
          : item
      ),
    }),

  clearCart: () => set({ cart: [] }),
}));
