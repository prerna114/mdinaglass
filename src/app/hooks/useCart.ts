import { getCartGuest, getCartListing } from "@/api/CartApi";
import { useCartStore } from "@/store";
import { useNavigationStore } from "@/store/useNavigationstore";

export const fetchCart = async () => {
  const { setCartTotal, setAllCart, addToCart, clearCart } =
    useCartStore.getState(); // ✅ directly access Zustand store
  console.log("User car hook calling");

  const { setNavigating } = useNavigationStore.getState();

  setNavigating(true);

  const tokenData = localStorage.getItem("token");
  const parsed = tokenData ? JSON.parse(tokenData) : null;
  const accessToken = parsed?.token;

  if (accessToken && accessToken !== "undefined") {
    const data = await getCartListing();
    if (data?.status === 200) {
      clearCart();
      setCartTotal(data?.data?.cart?.grand_total);
      setAllCart(data?.data);
      data.data.items.forEach((item: any) => addToCart(item));
    }
  } else {
    const guestToken = localStorage.getItem("guestToken");
    if (guestToken) {
      const response = await getCartGuest(guestToken);
      if (response?.status === 200) {
        clearCart();
        setCartTotal(response?.data?.cart?.grand_total);
        setAllCart(response?.data);
        response?.data?.cart?.items?.forEach((item: any) => addToCart(item));
      }
    }
  }

  setNavigating(false);
};
