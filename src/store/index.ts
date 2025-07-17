import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const currentCart = get().cart;

        if (Array.isArray(item)) {
          const newItems = item.map((newItem) => {
            const existing = currentCart.find((i) => i.id === newItem.id);
            if (existing) {
              return {
                ...existing,
                quantity: existing.quantity + newItem.quantity,
              };
            }
            return newItem;
          });
          set({ cart: [...currentCart, ...newItems] });
        } else {
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
    }),
    {
      name: "cart-storage", // key in localStorage
      // skipHydration: true, // optional: to avoid hydration mismatch in SSR apps
    }
  )
);
