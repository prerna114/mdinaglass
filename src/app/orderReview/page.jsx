"use client";

import { useCartStore } from "@/store";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import OrderReview from "./OrderReview";
import React, { Suspense, useEffect, useMemo, useState } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderReview />;
      </Suspense>
    </>
  );
};

export default page;
