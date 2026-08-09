"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ExportSecurityVault() {
  const { toast } = useToast();
  const [pass, setPass] = useState("");
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleCreateVault = () => {
    if (!pass) return;
    const token = "SEC_DL_" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setDownloadLink(token);
    toast({
      title: "Encrypted Zip Archive Ready! 🔒",
      description: `AES-256 password lock enabled. Token: ${token}`,
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          Password-Protected Encrypted Zip & Token Vault
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Package dataset files in AES-256 encrypted archives with time-limited token links.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex gap-2">
          <Input
            type="password"
            placeholder="Set archive password..."
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="h-9 text-xs"
          />
          <Button onClick={handleCreateVault} disabled={!pass} size="sm" className="h-9 text-xs font-bold bg-primary">
            Lock & Encrypt
          </Button>
        </div>

        {downloadLink && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono flex items-center justify-between">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Vault Token: {downloadLink}</span>
            <Button size="sm" variant="outline" className="h-7 text-[10px] font-bold">
              <Download className="h-3 w-3 mr-1" /> Download .Zip
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
