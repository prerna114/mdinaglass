import React, { Suspense } from "react";
import PaymentPage from "./PaymentPage";
const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentPage />
      </Suspense>
    </>
  );
};

export default page;
