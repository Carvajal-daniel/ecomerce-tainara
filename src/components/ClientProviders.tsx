"use client";

import { ReactNode, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [toastPosition, setToastPosition] = useState<"bottom-center" | "bottom-right">("bottom-right");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setToastPosition("bottom-center");
      } else {
        setToastPosition("bottom-right");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Toaster position={toastPosition} />
      {children}
    </>
  );
}
