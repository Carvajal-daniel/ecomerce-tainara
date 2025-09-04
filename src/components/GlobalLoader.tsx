// components/GlobalLoader.tsx
"use client";

import { useState, useEffect } from "react";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Monitora navegação do Next.js
    window.addEventListener("next:navigation:start", handleStart);
    window.addEventListener("next:navigation:complete", handleComplete);

    return () => {
      window.removeEventListener("next:navigation:start", handleStart);
      window.removeEventListener("next:navigation:complete", handleComplete);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
      <div className="loader rounded-full border-4 border-t-4 border-gray-200 w-16 h-16 animate-spin"></div>
    </div>
  );
}
