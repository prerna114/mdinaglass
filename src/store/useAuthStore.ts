// stores/useAuthStore.ts
import { create } from "zustand";

type AuthStore = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  setLoginState: (state: boolean) => void;
  menu: [];
  setMenu: (state: []) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  menu: [],
  login: () => set({ isLogin: true }),
  logout: () => {
    localStorage.removeItem("token");
    set({ isLogin: false });
  },
  setLoginState: (state: boolean) => set({ isLogin: state }),
  setMenu: (data) => set({ menu: data }),
}));
