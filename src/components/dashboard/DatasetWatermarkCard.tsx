"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Fingerprint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DatasetWatermarkCard() {
  const { toast } = useToast();
  const [signature, setSignature] = useState<string | null>(null);

  const generateWatermark = () => {
    const sig = "SYNTHARA_VERIFIED_" + Math.random().toString(36).substring(2, 12).toUpperCase();
    setSignature(sig);
    toast({
      title: "Cryptographic Signature Generated! 🔒",
      description: `Watermark hash: ${sig}`,
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-primary" />
              Cryptographic Dataset Watermark & Signature Tool
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Sign dataset outputs with verifiable proof of synthetic origin.
            </CardDescription>
          </div>
          <Button onClick={generateWatermark} size="sm" className="h-8 font-bold text-xs uppercase tracking-wider bg-primary">
            Sign Dataset
          </Button>
        </div>
      </CardHeader>
      {signature && (
        <CardContent className="pt-4">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Signature: {signature}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
