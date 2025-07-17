function waitForSecureTrading(retries = 10) {
  if (typeof SecureTrading === "undefined") {
    if (retries > 0) {
      setTimeout(() => waitForSecureTrading(retries - 1), 300);
    }
    return;
  }

  const st = SecureTrading({
    jwt: "REPLACE_WITH_VALID_JWT_FROM_BACKEND",
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
