// components/CustomToast.js
import { toast } from "react-toastify";

export const CustomToast = (message = "Wow so easy!", place = "top-right") => {
  console.log("CUstomer Toast");
  return toast.error(message, {
    position: place,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    // transition: Bounce,
  });
};

export const SuccessToast = (message = "Wow so easy!", place = "top-right") => {
  return toast.success(message, {
    position: place,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    // transition: Bounce,
  });
};