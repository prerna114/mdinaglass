"use client";

import { useEffect, useState } from "react";
import { useNavigationStore } from "@/store/useNavigationstore";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function InstantLink({ href, children, className }) {
  const [isClient, setIsClient] = useState(false);
  const setNavigating = useNavigationStore((s) => s.setNavigating);
  const isNavigating = useNavigationStore((s) => s.isNavigating);
  const pathname = usePathname();
  // or return fallback link
  const handleClick = () => {
    if (href === pathname) {
      // same route clicked, don't show loader
      setNavigating(false);
    } else {
      setNavigating(true);
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        handleClick();
      }}
    >
      {children}
    </Link>
  );
}
