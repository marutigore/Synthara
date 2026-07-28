"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MockApiGenerator() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const endpointUrl = typeof window !== "undefined" ? `${window.location.origin}/api/mock-api` : "http://localhost:3000/api/mock-api";

  const handleCopy = () => {
    navigator.clipboard.writeText(endpointUrl);
    setCopied(true);
    toast({
      title: "API URL Copied! 🌐",
      description: "Copied live REST JSON endpoint URL to clipboard."
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Export Webhook & Live Mock REST API Generator
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Serve your synthesized dataset directly via an HTTP REST endpoint for external frontend prototyping.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            readOnly
            value={endpointUrl}
            className="flex-1 w-full h-10 bg-background border border-border/50 rounded-xl px-3 text-xs font-mono text-primary outline-none"
          />
          <Button onClick={handleCopy} size="sm" className="w-full sm:w-auto h-10 px-4 text-xs font-bold uppercase tracking-wider bg-primary gap-1.5">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy Endpoint"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
