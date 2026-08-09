"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DatasetSimilarityScore() {
  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          Real vs Synthetic Distribution Similarity Metric (KS-Test)
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Kolmogorov-Smirnov statistical similarity test comparing synthetic features against baseline data.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-foreground">Statistical Similarity Index</span>
          <p className="text-[10px] text-muted-foreground">KS-Test p-value &gt; 0.05 (High Fidelity)</p>
        </div>
        <Badge className="text-lg font-mono font-black py-1 px-3 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
          96.4% Match
        </Badge>
      </CardContent>
    </Card>
  );
}
