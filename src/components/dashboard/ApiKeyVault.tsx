"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, ShieldCheck, Lock, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function ApiKeyVault() {
  const { toast } = useToast();
  const [hasGemini, setHasGemini] = useState(false);
  const [hasSerp, setHasSerp] = useState(false);

  useEffect(() => {
    fetch("/api/keys")
      .then((res) => res.json())
      .then((data) => {
        setHasGemini(!!data.hasGeminiKey);
        setHasSerp(!!data.hasSerpapiKey);
      })
      .catch(() => {});
  }, []);

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          Interactive API Key Vault & Encryption Status
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          AES-256-GCM encrypted key storage for API integrations.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-foreground font-mono">Google Gemini API</span>
              <p className="text-[10px] text-muted-foreground">Encrypted in HTTPOnly Cookie</p>
            </div>
            <Badge className={hasGemini ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]" : "bg-muted text-muted-foreground text-[10px]"}>
              <ShieldCheck className="h-3 w-3 mr-1" /> {hasGemini ? "Encrypted Active" : "Default Fallback"}
            </Badge>
          </div>

          <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-foreground font-mono">SerpAPI Key</span>
              <p className="text-[10px] text-muted-foreground">Encrypted in HTTPOnly Cookie</p>
            </div>
            <Badge className={hasSerp ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]" : "bg-muted text-muted-foreground text-[10px]"}>
              <Lock className="h-3 w-3 mr-1" /> {hasSerp ? "Encrypted Active" : "Default Fallback"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
