'use client';

import React, { useEffect, useState } from 'react';
import { Download, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('SW registration failed:', err);
      });
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  if (!showInstallBanner) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 p-4 rounded-2xl bg-card border border-primary/30 shadow-2xl flex items-center gap-4 max-w-sm animate-in slide-in-from-bottom-4 duration-300">
      <div className="p-3 rounded-xl bg-primary/10 text-primary">
        <Sparkles className="size-5" />
      </div>
      <div className="flex-1">
        <h5 className="text-xs font-bold text-foreground">Install Synthara Desktop App</h5>
        <p className="text-[10px] text-muted-foreground">Run offline with native OS windowing.</p>
      </div>
      <Button onClick={handleInstallClick} size="sm" className="h-8 px-3 text-xs font-bold bg-primary text-primary-foreground">
        <Download className="size-3.5 mr-1" /> Install
      </Button>
      <button onClick={() => setShowInstallBanner(false)} className="text-muted-foreground hover:text-foreground">
        <X className="size-4" />
      </button>
    </div>
  );
}
