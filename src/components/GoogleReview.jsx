"use client";

import { useEffect } from "react";

const GoogleReviewsWidget = () => {
  useEffect(() => {
    // Ensure the script is added only once
    if (!document.querySelector("#elfsight-platform-script")) {
      const script = document.createElement("script");
      script.id = "elfsight-platform-script";
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <div className="container text-center">
        <h3 className="mb-4">Loved by Our Customers</h3>
      </div>

      <div
        className="elfsight-app-0a600ab2-1ba0-45fd-a830-ac48db4462ad"
        data-elfsight-app-lazy
      />
    </div>
  );
};

export default GoogleReviewsWidget;
