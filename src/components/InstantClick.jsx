import { useNavigationStore } from "@/store/useNavigationstore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function InstantLink({ href, children, className, onClick }) {
  const [isClient, setIsClient] = useState(false);
  const setNavigating = useNavigationStore((s) => s.setNavigating);
  const isNavigating = useNavigationStore((s) => s.isNavigating);
  const pathname = usePathname();

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
      onClick={(e) => {
        handleClick();
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </Link>
  );
}
