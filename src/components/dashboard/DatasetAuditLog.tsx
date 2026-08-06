"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History, ShieldCheck } from "lucide-react";

export function DatasetAuditLog() {
  const logs = [
    { action: "Dataset Created", user: "Maruti Gore", time: "Just Now" },
    { action: "PII Masking Applied", user: "System Auto-Engine", time: "2m ago" },
    { action: "Exported to CSV", user: "Maruti Gore", time: "10m ago" },
  ];

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Dataset Activity & Compliance Audit Log
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Immutable event audit trail for compliance and data lineage tracking.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {logs.map((l) => (
          <div key={l.action + l.time} className="flex items-center justify-between p-3 rounded-xl bg-secondary/15 border border-border/30 text-xs">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>{l.action}</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
              <span>{l.user}</span>
              <span>{l.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
