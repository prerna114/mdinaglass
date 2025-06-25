"use client";

import CategorySidebar from "@/components/CategorySidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductHeading from "@/components/ProductHeading";
import ProductListing from "@/components/ProductListing";
import MegaMenu from "@/components/Megamenu";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CustomToast, SuccessToast } from "@/components/CustomToast";
import Make from "@/components/Profile";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Login, registerCustomer } from "@/api/Customer";
import Link from "next/link";

const loginCheckoutPage = () => {
  const router = useRouter();

  const { login, isLogin, logout, setLoginState } = useAuthStore(
    (state) => state
  );

  // useEffect(() => {
  //   const isLogin = localStorage.getItem("token");
  //   if (isLogin) {
  //     setLoginState(true);
  //   } else {
  //     setLoginState(false);
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoginState(!!token); // ✅ hydrate Zustand with true
  }, []);

  console.log("login state njnjn", login, isLogin);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin, setUserLogin] = useState(false);
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
    // const data = await registerCustomer();
    console.log("userName", userName, password);
    const data = await Login(userName, password);
    console.log("data", data);
    if (data?.status == 200) {
      console.log("Login Success");
      SuccessToast("Login Successfull", "top-right");
      localStorage.setItem("token", JSON.stringify(data?.data));
      login();
      setUserLogin(true);
    } else {
      // console.error("Data", data?.response?.data?.message);
      CustomToast(data?.response?.data?.message, "top-right");
    }
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
                            Login
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
                        <input type="radio" name="checkoutType" /> Checkout As
                        Guest
                      </div>
                      <div className="check-register">
                        <input type="radio" name="checkoutType" /> Register
                      </div>

                      <a href="#" className="mt-1 mb-1">
                        Register & Save time!
                      </a>
                      <p className="pb-0 mb-0">– Fast and easy checkout</p>
                      <p>– Easy access to your history and status</p>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <Link href={"/register"}>
                          <button className="btn-cart">Continue</button>
                        </Link>
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
