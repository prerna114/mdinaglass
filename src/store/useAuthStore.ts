// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "./index"; // <-- import cart store

type AuthStore = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  setLoginState: (state: boolean) => void;
  menu: [];
  cmsInfo: {};
  setMenu: (state: []) => void;
  setCmsInfo: (state: {}) => void;
};
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogin: false,
      menu: [],
      cmsInfo: "",
      login: () => set({ isLogin: true }),
      logout: () => {
        localStorage.clear(); // remove actual token
        useCartStore.getState().clearCart();
        set({ isLogin: false });
      },
      setLoginState: (state: boolean) => set({ isLogin: state }),
      setMenu: (data) => set({ menu: data }),
      setCmsInfo: (data) => set({ cmsInfo: data }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({ isLogin: state.isLogin, menu: state.menu }), // only persist relevant parts
    }
  )
);
