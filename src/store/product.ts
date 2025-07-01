// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
type ProdutList = {
  products: [];
  category: [];
  setProducts: (state: []) => void;
  setCategory: (state: []) => void;
};

export const ProductLists = create<ProdutList>()(
  persist(
    (set, get) => ({
      products: [],
      category: [],

      setProducts: (item) => {
        set({ products: item });
      },
      setCategory: (item) => {
        set({ category: item });
      },
    }),
    {
      name: "productList", // name in localStorage
      partialize: (state) => ({ cart: state.products }), // only persist `cart`
    }
  )
);
