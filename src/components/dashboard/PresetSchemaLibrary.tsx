"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

const SCHEMAS = ["Healthcare EHR", "SaaS Subscriptions", "Fraud Detection Ledger", "IoT Telemetry", "User Behavior Log"];

export function PresetSchemaLibrary() {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/10">
      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
        <BookOpen className="h-3.5 w-3.5 text-primary" /> Preset Industry Schemas:
      </span>
      {SCHEMAS.map((s) => (
        <Badge key={s} variant="outline" className="cursor-pointer text-[10px] hover:bg-primary/10 hover:border-primary/30 transition-all font-mono">
          {s}
        </Badge>
      ))}
    </div>
  );
}
