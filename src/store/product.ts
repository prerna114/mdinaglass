// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FilterItem = {
  id: number;
  label: string;
};

type ProdutList = {
  products: [];
  category: [];
  allProduct: {};
  heading: string;
  filterOption: {
    colors?: FilterItem[];
    variations?: FilterItem[];
  };
  setHeading: (state: string) => void;
  setProducts: (state: []) => void;
  setCategory: (state: []) => void;
  setAllProduct: (state: []) => void;
  setFilterOption: (state: {
    colors?: FilterItem[];
    variations?: FilterItem[];
  }) => void;
};

export const ProductLists = create<ProdutList>()(
  persist(
    (set, get) => ({
      products: [],
      category: [],
      allProduct: {},
      heading: "Products",
      filterOption: {},

      setProducts: (item) => {
        set({ products: item });
      },
      setCategory: (item) => {
        set({ category: item });
      },
      setAllProduct: (item) => {
        set({ allProduct: item });
      },
      setHeading: (item) => {
        set({ heading: item });
      },
      setFilterOption: (item) => {
        set((state) => ({
          filterOption: {
            ...state.filterOption,
            ...item,
          },
        }));
      },
    }),
    {
      name: "productList", // name in localStorage
      partialize: (state) => ({ cart: state.products, heading: state.heading }), // only persist `cart`
    }
  )
);
