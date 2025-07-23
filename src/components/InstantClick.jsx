import { useNavigationStore } from "@/store/useNavigationstore";
import Link from "next/link";
import { useState } from "react";

export function InstantLink({ href, children, className }) {
  const setNavigating = useNavigationStore((s) => s.setNavigating);
  const isNavigating = useNavigationStore((s) => s.isNavigating);

  console.log("INstant click", isNavigating);

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        setNavigating(true); // trigger loader
        console.log("ISNAVGIATION", isNavigating);
      }}
    >
      {children}
    </Link>
  );
}
