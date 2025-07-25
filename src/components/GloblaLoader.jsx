"use client";
import { useNavigationStore } from "@/store/useNavigationstore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function GloblaLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const isNavigating = useNavigationStore((s) => s.isNavigating);
  const setNavigating = useNavigationStore((s) => s.setNavigating);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
      setNavigating(false);
    }, 700); // simulate page transition

    return () => clearTimeout(timeout);
  }, [pathname]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      setNavigating(false);
    }, 700); // simulate page transition

    return () => clearTimeout(timeout);
  }, []);

  if (!isNavigating) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // dimmed background
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          border: "6px solid #f3f3f3",
          borderTop: "6px solid #007bff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
