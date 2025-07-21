// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FilterItem = {
  id: number;
  label: string;
};
type Pagination = {
  per_page: number;
  page: number;
  sort_by: string;
  sort_dir: string;
};
type ProdutList = {
  products: [];
  category: [];
  allProduct: {};
  heading: string;
  description: string;
  allProductwithFilter: {};
  filterOption: {
    colors?: FilterItem[];
    variations?: FilterItem[];
  };
  paginationOption: {
    per_page: number;
    page: number;
    sort_by: string;
    sort_dir: string;
  };
  setHeading: (state: string) => void;
  setDescription: (state: string) => void;
  setProducts: (state: []) => void;
  setCategory: (state: []) => void;
  setAllProduct: (state: []) => void;
  setAllProductwithFilter: (state: {}) => void;
  setFilterOption: (state: {
    colors?: FilterItem[];
    variations?: FilterItem[];
  }) => void;

  setPagination: (state: {
    per_page: number;
    page: number;
    sort_by: string;
    sort_dir: string;
  }) => void;
};

export const ProductLists = create<ProdutList>()(
  persist(
    (set, get) => ({
      products: [],
      category: [],
      allProduct: {},
      heading: "Products",
      allProductwithFilter: {},
      filterOption: {},
      paginationOption: {
        per_page: 15,
        page: 1,
        sort_by: "price",
        sort_dir: "asc",
      },
      description: "",
      setDescription: (item) => {
        set({ description: item });
      },
      setAllProductwithFilter: (item) => {
        set({ allProductwithFilter: item });
      },
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
      setPagination: (item) => {
        set({ paginationOption: item });
      },
    }),
    {
      name: "productList", // name in localStorage
      partialize: (state) => ({ cart: state.products, heading: state.heading }), // only persist `cart`
    }
  )
);
