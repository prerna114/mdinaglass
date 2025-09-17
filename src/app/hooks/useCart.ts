import { getCartGuest, getCartListing } from "@/api/CartApi";
import { CustomToast } from "@/components/CustomToast";
import { useCartStore } from "@/store";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigationStore } from "@/store/useNavigationstore";

export const fetchCart = async () => {
  const { setCartTotal, setAllCart, addToCart, clearCart } =
    useCartStore.getState(); // ✅ directly access Zustand store
  console.log("User car hook calling");
  // const { logout } = useAuthStore(
  //   (state) => state
  // );
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
      console.log("Cart datadatadata", data?.data);
      if (data?.data?.cart?.is_voucher == "1") {
        localStorage.setItem("is_voucher", JSON.stringify(1));
      } else {
        localStorage.setItem("is_voucher", JSON.stringify(0));
      }
      data.data.items.forEach((item: any) => addToCart(item));
    }
    // else if(data?.status == 401){
    //   clearCart();
    //   logout()
    //   CustomToast("Session Expire Please login")

    // }
    // else{
    //   CustomToast("")
    // }
  } else {
    const guestToken = localStorage.getItem("guestToken");
    if (guestToken) {
      const response = await getCartGuest(guestToken);
      if (response?.status === 200) {
        console.log("Cart datadatadata guest", response?.data);
        clearCart();
        setCartTotal(response?.data?.cart?.grand_total);
        if (response?.data?.cart?.is_voucher == "1") {
          localStorage.setItem("is_voucher", JSON.stringify(1));
        } else {
          localStorage.setItem("is_voucher", JSON.stringify(0));
        }
        setAllCart(response?.data);
        response?.data?.cart?.items?.forEach((item: any) => addToCart(item));
      }
    }
  }

  setNavigating(false);
};
