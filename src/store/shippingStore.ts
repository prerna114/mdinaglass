import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useShippingStore = create(
  persist(
    (set) => ({
      shippingStore: {} as any,
      shippingMethod: {} as {},
      grandTotal: {} as {},
      insurance: {} as {},
      shiipingCost: {} as {},

      setShippingStore: (state: any) => set({ shippingStore: state }),
      setShippingMethod: (state: any) => set({ shippingMethod: state }),
      setGrandTotal: (state: any) => set({ grandTotal: state }),
      setInsuranceCost: (state: any) => set({ insurance: state }),
      setshiipingCost: (state: any) => set({ shiipingCost: state }),
    }),
    {
      name: "shipping-store", // key for localStorage
      partialize: (state: {
        shippingStore: any;
        shippingMethod: any;
        grandTotal: any;
        insurance: any;
        shiipingCost: any;
      }) => ({
        shippingStore: state.shippingStore,
        shippingMethod: state.shippingMethod,
        grandTotal: state.grandTotal,
        insurance: state.insurance,
        shiipingCost: state.shiipingCost,
      }), //
    }
  )
);
