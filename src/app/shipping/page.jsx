"use client";

import { Suspense } from "react";
import Shipping from "./Shipping";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Shipping />
      </Suspense>
    </>
  );
};

export default page;
