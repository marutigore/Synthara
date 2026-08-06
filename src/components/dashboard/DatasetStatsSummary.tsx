"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, TrendingUp } from "lucide-react";

interface DatasetStatsSummaryProps {
  data: Array<Record<string, any>>;
}

export function DatasetStatsSummary({ data }: DatasetStatsSummaryProps) {
  if (!data || data.length === 0) return null;

  const numericCols = Object.keys(data[0]).filter((key) =>
    data.every((row) => typeof row[key] === "number" || (!isNaN(Number(row[key])) && row[key] !== ""))
  );

  if (numericCols.length === 0) return null;

  const stats = numericCols.map((col) => {
    const vals = data.map((d) => Number(d[col])).filter((v) => !isNaN(v));
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const mean = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
    return { col, min: min.toFixed(2), max: max.toFixed(2), mean: mean.toFixed(2) };
  });

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Real-Time Numerical Distribution Summary
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Statistical min, max, and mean values for numerical columns.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.col} className="p-3 rounded-xl bg-secondary/15 border border-border/30 space-y-1">
              <span className="text-xs font-bold text-foreground font-mono">{s.col}</span>
              <div className="grid grid-cols-3 gap-1 text-[10px] text-muted-foreground pt-1">
                <div>Min: <span className="font-mono text-foreground font-semibold">{s.min}</span></div>
                <div>Mean: <span className="font-mono text-foreground font-semibold">{s.mean}</span></div>
                <div>Max: <span className="font-mono text-foreground font-semibold">{s.max}</span></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
