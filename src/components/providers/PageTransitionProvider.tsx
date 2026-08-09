'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="w-full h-full transition-all duration-500 ease-out animate-in fade-in-0 slide-in-from-bottom-2 fill-mode-forwards"
    >
      {children}
    </div>
  );
}
