// stores/useAuthStore.ts
import { create } from "zustand";

type AuthStore = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  setLoginState: (state: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  login: () => set({ isLogin: true }),
  logout: () => {
    localStorage.removeItem("token");
    set({ isLogin: false });
  },
  setLoginState: (state: boolean) => set({ isLogin: state }),
}));
