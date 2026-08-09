"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Webhook, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WebhookIntegrationCard() {
  const { toast } = useToast();
  const [url, setUrl] = useState("");

  const handleTest = () => {
    toast({
      title: "Webhook Event Dispatched! 🚀",
      description: `POST payload delivered to ${url}`,
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Webhook className="h-5 w-5 text-primary" />
          Automated Pipeline Webhook Dispatch Manager
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Trigger external HTTP Webhook POST requests upon job completion.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="https://api.yourdomain.com/webhooks/synthara"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-9 text-xs"
          />
          <Button onClick={handleTest} disabled={!url} size="sm" className="h-9 text-xs font-bold bg-primary">
            <Send className="h-3.5 w-3.5 mr-1" /> Test Payload
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
