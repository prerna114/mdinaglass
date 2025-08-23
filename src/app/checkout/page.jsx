import React, { Suspense } from "react";
import Checkoutpage from "./checkoutpage";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Checkoutpage />
      </Suspense>
    </>
  );
};

export default page;
