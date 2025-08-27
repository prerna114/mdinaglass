import { create } from "zustand";

type NavigationState = {
  isNavigating: boolean;
  showModal: boolean;
  setNavigating: (val: boolean) => void;
  setShowModal: (val: boolean) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  isNavigating: false,
  showModal: false,
  setNavigating: (val) => set({ isNavigating: val }),
  setShowModal: (val) => set({ showModal: val }),
}));
