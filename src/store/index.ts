import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  [key: string]: any;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, sku: string) => void;
  updateQuantity: (id: string, quantity: number, qty?: number) => void;
  clearCart: () => void;
  insurance: {};
  setInsurance: (state: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      insurance: "15.00",
      setInsurance: (data) => set({ insurance: data }),
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
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            });
          } else {
            set({ cart: [...currentCart, item] });
          }
        }
      },

      removeFromCart: (id, sku) => {
        if (id) {
          const updatedCart = get().cart.filter((item) => item.id !== id);
          set({ cart: updatedCart }); // important for persist
        } else if (sku) {
          const updatedCart = get().cart.filter((item) => item.sku !== sku);
          set({ cart: updatedCart });
        }
      },

      updateQuantity: (id, quantity, qty) =>
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? { ...item, quantity: quantity !== undefined ? quantity : qty }
              : item
          ),
        }),

      clearCart: () => {
        console.log("Cart cleared");
        set({ cart: [] });
      },
    }),
    {
      name: "the-cart-storage", // key in localStorage
      partialize: (state) => ({
        cart: state.cart,
        insurance: state.insurance,
      }),
      // skipHydration: true,
      // skipHydration: true, // optional: to avoid hydration mismatch in SSR apps
    }
  )
);
