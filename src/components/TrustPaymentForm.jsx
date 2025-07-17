import { useEffect } from "react";

export default function TrustPaymentForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.eu.trustpayments.com/js/latest/st.js";
    script.onload = () => {
      waitForSecureTrading(); // call below-defined function
    };
    document.head.appendChild(script);
  }, []);
  function waitForSecureTrading(retries = 10) {
    if (typeof SecureTrading === "undefined") {
      if (retries > 0) {
        setTimeout(() => waitForSecureTrading(retries - 1), 300);
      }
      return;
    }

    const st = SecureTrading({
      jwt: "56-ed450fa5fd8ab541bbe65933c3bc68453798e707fe43d12d94ebc8e42305dee9",
      livestatus: 0,
      components: {
        callbacks: {
          onPaymentFormValidityChange(data) {
            console.log("Form valid:", data.isFormValid);
          },
        },
      },
    });

    st.Components({
      componentIds: {
        cardNumber: "st-card-number",
        expirationDate: "st-expiration-date",
        securityCode: "st-security-code",
        notificationFrame: "st-notification-frame",
      },
    });
  }

  return (
    <form
      id="st-form"
      method="POST"
      action="https://your-backend.com/handle-payment"
    >
      <div id="st-card-number"></div>
      <div id="st-expiration-date"></div>
      <div id="st-security-code"></div>
      <div id="st-notification-frame"></div>
      <button type="submit" id="pay-btn">
        Pay securely
      </button>
    </form>
  );
}
