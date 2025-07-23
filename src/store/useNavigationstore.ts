// store/useNavigationStore.ts
import { create } from "zustand";

export const useNavigationStore = create((set) => ({
  isNavigating: false,
  setNavigating: (val: boolean) => set({ isNavigating: val }),
}));
