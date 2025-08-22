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
  searchProduct: [];
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
    size: string;
  };
  setHeading: (state: string) => void;
  setDescription: (state: string) => void;
  setProducts: (state: []) => void;
  setSearchProduct: (state: []) => void;

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
    size: string;
  }) => void;
};

export const ProductLists = create<ProdutList>()(
  persist(
    (set, get) => ({
      products: [],
      category: [],
      searchProduct: [],
      allProduct: {},
      heading: "Products",
      allProductwithFilter: {},
      filterOption: {},
      paginationOption: {
        per_page: 15,
        page: 1,
        sort_by: "price",
        sort_dir: "asc",
        size: "",
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
      setSearchProduct: (item) => {
        set({ searchProduct: item });
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
        const current = get().paginationOption;
        set({
          paginationOption: {
            per_page: item.per_page ?? current.per_page,
            page: item.page ?? current.page,
            sort_by: item.sort_by ?? current.sort_by,
            sort_dir: item.sort_dir ?? current.sort_dir,
            size: item.size ?? current.size,
          },
        });
      },
    }),
    {
      name: "productList", // name in localStorage
      partialize: (state) => ({
        cart: state.products,
        heading: state.heading,
        paginationOption: state.paginationOption,
        description: state.description,
      }), // only persist `cart`
    }
  )
);
