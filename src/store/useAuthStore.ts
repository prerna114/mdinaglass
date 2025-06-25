// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  setLoginState: (state: boolean) => void;
  menu: [];
  setMenu: (state: []) => void;
};
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogin: false,
      menu: [],
      login: () => set({ isLogin: true }),
      logout: () => {
        localStorage.removeItem("token"); // remove actual token
        set({ isLogin: false });
      },
      setLoginState: (state: boolean) => set({ isLogin: state }),
      setMenu: (data) => set({ menu: data }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({ isLogin: state.isLogin, menu: state.menu }), // only persist relevant parts
    }
  )
);
