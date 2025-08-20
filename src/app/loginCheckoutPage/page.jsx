"use client";

import React, { useEffect, useState } from "react";
import { CustomToast, SuccessToast } from "@/components/CustomToast";

import Make from "@/components/Profile";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import InstantLink from "../../components/InstantClick";
import { Login, registerCustomer, testLogin } from "@/api/Customer";
import Link from "next/link";
import { useCartStore } from "@/store";
import { getCartListing, getOrderList } from "@/api/CartApi";
import { useMenuStore } from "@/store/useCategoryStore";

const loginCheckoutPage = () => {
  const { clearCart, addToCart } = useCartStore((state) => state);
  const loading = useMenuStore((state) => state.loading);
  const setLoading = useMenuStore((state) => state.setLoading);

  const router = useRouter();
  const [checkoutType, setCheckoutType] = useState("");

  const { login, isLogin, logout, setLoginState } = useAuthStore(
    (state) => state
  );

  console.log("checkoutType", checkoutType);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoginState(!!token); // ✅ hydrate Zustand with true
  }, []);

  console.log("login state njnjn", login, isLogin);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin, setUserLogin] = useState(false);
  const [loadingScroll, setLoadingScroll] = useState(false);
  const handleLogin = () => {
    if (!userName) {
      CustomToast("User Name required!", "top-right");
      console.log("Handle login");
    } else if (!password) {
      CustomToast("Password required!", "top-right");
      console.log("Handle login");
    } else {
      LoginUser();
    }
  };

  const LoginUser = async () => {
    setLoadingScroll(true);
    // const data = await registerCustomer();
    console.log("userName", userName, password);
    const data = await Login(userName, password);
    console.log("data", data);
    if (data?.status == 200) {
      localStorage.removeItem("guestToken");
      console.log("Login Success");
      SuccessToast("Login Successfull", "top-right");
      localStorage.setItem("token", JSON.stringify(data?.data));
      login();
      clearCart();

      setUserLogin(true);
      setLoadingScroll(false);
      setTimeout(() => {
        getCart();
      }, 1000);
    } else {
      setLoadingScroll(false);

      // console.error("Data", data?.response?.data?.message);
      CustomToast(data?.response?.data?.message, "top-right");
    }
  };
  const getCart = async () => {
    setLoading(true);
    console.log("Cart listing caal");
    const token = localStorage.getItem("token");
    if (token) {
      const data = await getCartListing();
      if (data?.status == 200) {
        clearCart();
        console.log("getCart", data.data.items);
        // addToCart(data.result.items);
        data.data.items.forEach((item) => {
          addToCart(item);
        });
        setLoading(false);
      } else if (data?.status == 401) {
        // logout;
      }
    }

    // console.log("getCart", data);
  };

  // console.log("username", userName);
  return (
    <>
      {/* <Header /> */}
      {/* <MegaMenu /> */}
      {!isLogin && (
        <div
          style={{
            background: "#f1f1f1",
          }}
        >
          <div className="header-product bg-white">
            <h1>Login or Checkout as a Guest</h1>
          </div>

          <div className="container">
            <div className="login-signup">
              <div className="row">
                <div className="col-md-6">
                  <div className="login-sec">
                    <h2>Login</h2>
                    <p>If you have an account, please log in.</p>

                    <div className="col-md-12">
                      <input
                        type="text"
                        placeholder="Email*"
                        onChange={(e) => setUserName(e.target.value)}
                      ></input>
                    </div>

                    <div className="col-md-12">
                      <input
                        type="password"
                        placeholder="Password*"
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <a href="#">Forgot your password?</a>
                      </div>
                      <div className="col-md-6">
                        <div className="float-right">
                          <button className="btn-cart" onClick={handleLogin}>
                            {loadingScroll ? (
                              <div
                                className="spinner-border text-light"
                                role="status"
                              ></div>
                            ) : (
                              "Login"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="login-sec register">
                    <h2>Checkout as a Guest or Register</h2>
                    <p>Register with us for future convenience:</p>

                    <div className="col-md-12">
                      <div className="check-register">
                        <input
                          type="radio"
                          name="checkoutType"
                          value="guest"
                          checked={checkoutType === "guest"}
                          onChange={(e) => {
                            console.log("Er", e);
                            setCheckoutType(e.target.value);
                          }}
                        />{" "}
                        Checkout As Guest
                      </div>
                      <div className="check-register">
                        <input
                          type="radio"
                          name="checkoutType"
                          checked={checkoutType === "register"}
                          onChange={(e) => {
                            console.log("Er", e);
                            setCheckoutType(e.target.value);
                          }}
                          value="register"
                        />{" "}
                        Register
                      </div>

                      <a href="#" className="mt-1 mb-1">
                        Register & Save time!
                      </a>
                      <p className="pb-0 mb-0">– Fast and easy checkout</p>
                      <p>– Easy access to your history and status</p>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <InstantLink
                          href={
                            checkoutType == "register"
                              ? "/register"
                              : "/checkout"
                          }
                        >
                          <button className="btn-cart">Continue</button>
                        </InstantLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLogin && (
        <div className="mb-5">
          <Make />
        </div>
      )}

      {/* <Footer /> */}
    </>
  );
};

export default loginCheckoutPage;
