import React, { Suspense } from "react";
import ShippingMethodPage from "./shippingMethodPage";
const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ShippingMethodPage />
      </Suspense>
    </>
  );
};

export default page;
