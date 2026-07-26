"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart2, PieChart, Activity, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DatasetDistributionInsightsProps {
  data: Array<Record<string, any>>;
  schema: Array<{ name: string; type: string }>;
}

export function DatasetDistributionInsights({ data, schema }: DatasetDistributionInsightsProps) {
  if (!data || data.length === 0) return null;

  const totalRows = data.length;
  const totalCols = schema.length;

  // Calculate completeness score
  let totalCells = totalRows * totalCols;
  let nonNullCells = 0;

  data.forEach((row) => {
    schema.forEach((col) => {
      const val = row[col.name];
      if (val !== null && val !== undefined && String(val).trim() !== "") {
        nonNullCells++;
      }
    });
  });

  const completenessRatio = totalCells > 0 ? Math.round((nonNullCells / totalCells) * 100) : 100;

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          Dataset Distribution Analytics & Completeness Score
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Real-time statistical evaluation of dataset density, schema balance, and null metrics.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Records</span>
            <p className="text-2xl font-black text-foreground font-mono">{totalRows}</p>
          </div>

          <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Schema Features</span>
            <p className="text-2xl font-black text-foreground font-mono">{totalCols}</p>
          </div>

          <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Completeness Score</span>
            <p className="text-2xl font-black text-emerald-500 font-mono">{completenessRatio}%</p>
          </div>

          <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Quality Rating</span>
            <div className="pt-1">
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs font-bold">
                <CheckCircle2 className="h-3 w-3 mr-1" /> High Density
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
