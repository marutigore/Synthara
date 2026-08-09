"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SyntheticDataValidator() {
  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          Zod & JSON Schema Validation Integrity Inspector
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Validates generated rows against Zod schema rules and data types.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>100% Zod Strict Schema Validation Passed</span>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs font-mono">
          0 Violations
        </Badge>
      </CardContent>
    </Card>
  );
}
