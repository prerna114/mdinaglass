"use client";

import { useEffect, useState } from "react";
import { CustomToast } from "./CustomToast";
import ModalPayment from "./ModalPayment";
import { useNavigationStore } from "@/store/useNavigationstore";

export default function TrustPaymentForm() {
  const [token, setToken] = useState(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [show, setShow] = useState(false);
  const setShowModal = useNavigationStore((s) => s.setShowModal);

  // 1. Load SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.eu.trustpayments.com/js/latest/st.js";
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.head.appendChild(script);
  }, []);

  // 2. Fetch Token
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("/api/trust-jwt", {
          method: "POST", // 👈 must be POST
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // amount: Math.round(amount * 100), // convert to minor units (€10.50 → 1050)
            // orderId, // pass your order reference
            amount: "1",
          }),
        });
        const { token } = await res.json();

        setToken(token);
      } catch (err) {
        console.error("Failed to fetch JWT token:", err);
      }
    };

    fetchToken();
  }, []);

  // 3. Initialize when both SDK + Token are ready
  useEffect(() => {
    if (!sdkReady || !token) return;

    const st = SecureTrading({
      jwt: token,
      livestatus: 1,
      componentIds: {
        cardNumber: "st-card-number",
        expirationDate: "st-expiration-date",
        securityCode: "st-security-code",
        notificationFrame: "st-notification-frame",
      },
    });

    st.Components();

    // 🔹 Success
    st.on("paymentCompleted", (data) => {
      console.log("✅ Payment completed:", data);
      setShowModal(true);
      // alert("Payment Success!");
      // You can also redirect:
      // window.location.href = "/payment-success";
    });

    // 🔹 Failure
    st.on("paymentFailed", (error) => {
      console.error("❌ Payment failed:", error);
      setShowModal(false);

      // alert("Payment Failed: " + error);
      CustomToast("Payment Failed ", "top-center");
      // Redirect or show UI
      // window.location.href = "/payment-failure";
    });

    // 🔹 Cancelled
    st.on("paymentCanceled", () => {
      CustomToast("Payment cancelled by user", "top-center");
      setShowModal(false);
    });
  }, [sdkReady, token]);

  return (
    <div>
      <form
        id="st-form"
        className="trust-payment-form"
        // method="POST"
        // action="https://your-backend.com/handle-payment"
      >
        <div id="st-card-number"></div>
        <div id="st-expiration-date"></div>
        <div id="st-security-code"></div>
        <div id="st-notification-frame"></div>
        <button type="submit" className="trust-payment-gateway">
          Pay securely
        </button>
      </form>
    </div>
  );
}
