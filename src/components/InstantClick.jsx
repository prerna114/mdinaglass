"use client";

import { useEffect, useState } from "react";
import { useNavigationStore } from "@/store/useNavigationstore";
import Link from "next/link";

export default function InstantLink({ href, children, className }) {
  const [isClient, setIsClient] = useState(false);
  const setNavigating = useNavigationStore((s) => s.setNavigating);
  const isNavigating = useNavigationStore((s) => s.isNavigating);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // or return fallback link

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        setNavigating(true);
        console.log("ISNAVGIATION", isNavigating);
      }}
    >
      {children}
    </Link>
  );
}
