// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
type ProdutList = {
  products: [];
  category: [];
  allProduct: {};
  setProducts: (state: []) => void;
  setCategory: (state: []) => void;
  setAllProduct: (state: []) => void;
};

export const ProductLists = create<ProdutList>()(
  persist(
    (set, get) => ({
      products: [],
      category: [],
      allProduct: {},

      setProducts: (item) => {
        set({ products: item });
      },
      setCategory: (item) => {
        set({ category: item });
      },
      setAllProduct: (item) => {
        set({ allProduct: item });
      },
    }),
    {
      name: "productList", // name in localStorage
      partialize: (state) => ({ cart: state.products }), // only persist `cart`
    }
  )
);
