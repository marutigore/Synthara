"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coins, Zap } from "lucide-react";

interface TokenCostEstimatorProps {
  promptLength?: number;
  expectedRows?: number;
}

export function TokenCostEstimator({ promptLength = 120, expectedRows = 50 }: TokenCostEstimatorProps) {
  const estTokens = Math.round(promptLength * 1.5 + expectedRows * 35);
  const estCost = (estTokens * 0.000002).toFixed(4);

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          AI Generation Token & API Cost Estimator
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Calculated token volume and API usage cost projection.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-secondary/15 border border-border/30 text-center">
          <span className="text-xs text-muted-foreground font-medium">Estimated Tokens</span>
          <div className="text-lg font-black text-foreground font-mono mt-1">~{estTokens} tokens</div>
        </div>

        <div className="p-3 rounded-xl bg-secondary/15 border border-border/30 text-center">
          <span className="text-xs text-muted-foreground font-medium">Estimated API Cost</span>
          <div className="text-lg font-black text-emerald-500 font-mono mt-1">${estCost} USD</div>
        </div>
      </CardContent>
    </Card>
  );
}
