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
  paymentMethods: string;
  setPaymentMethods: (state: string) => void;
  cmsInfo: {};
  giftMessage: {};
  setMenu: (state: []) => void;
  setCmsInfo: (state: {}) => void;
  setGiftMessage: (state: string) => void;
};
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogin: false,
      menu: [],
      cmsInfo: "",
      login: () => set({ isLogin: true }),
      logout: () => {
        console.log("Logout function calling");
        localStorage.clear(); // remove actual token
        useCartStore.getState().clearCart();
        set({ isLogin: false });
      },
      paymentMethods: "",
      setPaymentMethods: (state: string) => set({ paymentMethods: state }),
      giftMessage: "",
      setLoginState: (state: boolean) => set({ isLogin: state }),
      setMenu: (data) => set({ menu: data }),
      setCmsInfo: (data) => set({ cmsInfo: data }),
      setGiftMessage: (data) => set({ giftMessage: data }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        isLogin: state.isLogin,
        paymentMethods: state.paymentMethods,
      }), // only persist relevant parts
    }
  )
);
