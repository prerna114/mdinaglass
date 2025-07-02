// store/useMenuStore.ts
import { create } from "zustand";

type MenuStore = {
  parentMap: any;
  expandedIds: number[];
  loading: boolean;
  setLoading: (value: boolean) => void;
  subCategoryMap: Record<number, any[]>;
  toggleExpanded: (id: number) => void;
  setExpanded: (ids: number[]) => void;
  setSubCategory: (id: number, items: any[]) => void;
  hydrateFromStorage: () => void;
};

const EXPANDED_IDS_KEY = "expandedIds";
const SUBCATEGORY_MAP_KEY = "subCategoryMap";

export const useMenuStore = create<MenuStore>((set) => ({
  expandedIds: [],
  subCategoryMap: {},
  parentMap: {},
  loading: true,

  setLoading: (value) => set({ loading: value }),
  toggleExpanded: (id) =>
    set((state) => {
      const newExpanded = state.expandedIds.includes(id)
        ? state.expandedIds.filter((i) => i !== id)
        : [...state.expandedIds, id];

      localStorage.setItem(EXPANDED_IDS_KEY, JSON.stringify(newExpanded));
      return { expandedIds: newExpanded };
    }),

  setExpanded: (ids) => {
    localStorage.setItem(EXPANDED_IDS_KEY, JSON.stringify(ids));
    set({ expandedIds: ids });
  },

  setSubCategory: (id, items) => {
    set((state) => {
      const updated = {
        ...state.subCategoryMap,
        [id]: items,
      };

      const parentEntries = items.reduce((acc, item) => {
        acc[item.id] = id;
        return acc;
      }, {} as Record<number, number>);

      localStorage.setItem(SUBCATEGORY_MAP_KEY, JSON.stringify(updated));

      return {
        subCategoryMap: updated,
        parentMap: { ...state.parentMap, ...parentEntries }, // <-- new
      };
    });
  },

  hydrateFromStorage: () => {
    const storedExpanded = localStorage.getItem(EXPANDED_IDS_KEY);
    const storedMap = localStorage.getItem(SUBCATEGORY_MAP_KEY);

    set({
      expandedIds: storedExpanded ? JSON.parse(storedExpanded) : [],
      subCategoryMap: storedMap ? JSON.parse(storedMap) : {},
    });
  },
}));
