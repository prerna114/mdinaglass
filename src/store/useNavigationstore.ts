// store/useNavigationStore.ts
import { create } from "zustand";

export const useNavigationStore = create((set) => ({
  isNavigating: false,
  showModal: false,
  setNavigating: (val: boolean) => set({ isNavigating: val }),
  setShowModal: (val: boolean) => set({ showModal: val }),
}));
