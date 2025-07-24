"use client";
import { useState } from "react";

export default function PayByLinkForm() {
  const [link, setLink] = useState();

  const createLink = async () => {
    const res = await fetch("/api/paybylink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 10.99,
        currency: "EUR",
        orderRef: "ORDER123",
        billingEmail: "customer@example.com",
        locale: "en_GB",
      }),
    });
    setLink((await res.json()).link);
  };

  return (
    <div>
      <button onClick={createLink}>Generate Pay‑by‑Link</button>
      {link && (
        <div>
          <p>✅ Here is your payment link:</p>
          <a href={link} target="_blank">
            {link}
          </a>
        </div>
      )}
    </div>
  );
}
