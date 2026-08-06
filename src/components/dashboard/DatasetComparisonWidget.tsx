"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Columns, Scale } from "lucide-react";

interface DatasetComparisonWidgetProps {
  dsA: { name: string; rows: number; cols: number };
  dsB: { name: string; rows: number; cols: number };
}

export function DatasetComparisonWidget({ dsA, dsB }: DatasetComparisonWidgetProps) {
  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          Dual Dataset Side-by-Side Comparator
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Compare row volume and column dimensions across dataset pairs.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 space-y-1 text-center">
          <span className="text-xs font-bold text-foreground font-mono">{dsA.name}</span>
          <div className="text-lg font-black text-primary font-mono">{dsA.rows} Rows</div>
          <div className="text-[10px] text-muted-foreground">{dsA.cols} Columns</div>
        </div>

        <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 space-y-1 text-center">
          <span className="text-xs font-bold text-foreground font-mono">{dsB.name}</span>
          <div className="text-lg font-black text-primary font-mono">{dsB.rows} Rows</div>
          <div className="text-[10px] text-muted-foreground">{dsB.cols} Columns</div>
        </div>
      </CardContent>
    </Card>
  );
}
