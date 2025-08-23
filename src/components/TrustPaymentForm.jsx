"use client";

import { useEffect, useState } from "react";

export default function TrustPaymentForm() {
  const [token, setToken] = useState(null);
  const [sdkReady, setSdkReady] = useState(false);

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
        const res = await fetch("/api/trust-jwt");
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

    st.Components({
      callbacks: {
        onPaymentFormValidityChange(data) {
          console.log("Form valid:", data.isFormValid);
        },
      },
    });
  }, [sdkReady, token]);

  return (
    <form
      id="st-form" class="trust-payment-form"
      // method="POST"
      // action="https://your-backend.com/handle-payment"
    >
      <div id="st-card-number"></div>
      <div id="st-expiration-date"></div>
      <div id="st-security-code"></div>
      <div id="st-notification-frame"></div>
      <button type="submit" class="trust-payment-gateway">Pay securely</button>
    </form>
  );
}
