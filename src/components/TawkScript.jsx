"use client";

import { useEffect } from "react";

export default function TawkScript() {
  useEffect(() => {
    // Avoid loading multiple times
    if (document.getElementById("tawk-script")) return;

    const s1 = document.createElement("script");
    s1.id = "tawk-script";
    s1.async = true;
    s1.src = "https://embed.tawk.to/68ca72e59bf16519283204b9/1j5bd1l2j"; // Replace with your own property ID
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    document.body.appendChild(s1);

    return () => {
      // cleanup when component unmounts (optional)
      s1.remove();
    };
  }, []);

  return null; // No visible UI
}
