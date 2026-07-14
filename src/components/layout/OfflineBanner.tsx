"use client";

import React, { useState, useEffect } from "react";
import { WifiOff, ShieldAlert } from "lucide-react";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-rose-600 text-white py-2 px-4 shadow-md flex items-center justify-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider animate-in slide-in-from-top duration-300">
      <WifiOff className="h-4 w-4 animate-bounce" />
      <span>You are currently offline. Certain features and scrapers may be unavailable.</span>
    </div>
  );
}
