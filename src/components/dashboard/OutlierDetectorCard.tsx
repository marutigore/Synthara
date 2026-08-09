"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function OutlierDetectorCard() {
  const anomalies = [
    { col: "price", row: 14, val: "$99,999.00", reason: "Z-score > 3.5 (Extreme Outlier)" },
    { col: "age", row: 42, val: "-5", reason: "Negative Age Value" },
  ];

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-500" />
          Automated Statistical Anomaly & Outlier Detector
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Identifies extreme numerical outliers and invalid categorical values.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {anomalies.map((a) => (
          <div key={a.col + a.row} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold font-mono text-amber-500">Column: {a.col} (Row #{a.row})</span>
              <p className="text-[10px] text-muted-foreground">{a.reason}</p>
            </div>
            <Badge variant="outline" className="font-mono text-xs border-amber-500/30 text-amber-500">
              Value: {a.val}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
