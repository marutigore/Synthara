"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldAlert, CheckCircle2, AlertTriangle } from "lucide-react";

interface ColumnHealth {
  name: string;
  type: string;
  fillRate: number; // 0 to 100
  uniqueRate: number; // 0 to 100
  status: "optimal" | "warning" | "critical";
}

interface QualityHeatmapProps {
  data: Array<Record<string, any>>;
  schema: Array<{ name: string; type: string }>;
}

export function QualityHeatmap({ data, schema }: QualityHeatmapProps) {
  if (!data || data.length === 0 || !schema || schema.length === 0) return null;

  const totalRows = data.length;

  const healthMetrics: ColumnHealth[] = schema.map((col) => {
    let nonNull = 0;
    const values = new Set<string>();

    data.forEach((row) => {
      const v = row[col.name];
      if (v !== null && v !== undefined && String(v).trim() !== "") {
        nonNull++;
        values.add(String(v));
      }
    });

    const fillRate = Math.round((nonNull / totalRows) * 100);
    const uniqueRate = Math.round((values.size / (nonNull || 1)) * 100);

    let status: "optimal" | "warning" | "critical" = "optimal";
    if (fillRate < 50) status = "critical";
    else if (fillRate < 85 || uniqueRate < 10) status = "warning";

    return { name: col.name, type: col.type, fillRate, uniqueRate, status };
  });

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Dataset Quality & Anomaly Heatmap Matrix
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Column-by-column diagnostic health matrix evaluating fill rates, cardinality, and anomaly risks.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {healthMetrics.map((col) => {
            const colorClass =
              col.status === "optimal"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                : col.status === "warning"
                ? "border-amber-500/30 bg-amber-500/10 text-amber-500"
                : "border-rose-500/30 bg-rose-500/10 text-rose-500";

            const Icon =
              col.status === "optimal"
                ? CheckCircle2
                : col.status === "warning"
                ? AlertTriangle
                : ShieldAlert;

            return (
              <div key={col.name} className={`p-3.5 rounded-xl border ${colorClass} space-y-2 transition-all`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold truncate max-w-[120px] text-foreground">{col.name}</span>
                  <Icon className="h-4 w-4 shrink-0" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono opacity-80">
                    <span>Fill Rate</span>
                    <span className="font-bold">{col.fillRate}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        col.status === "optimal" ? "bg-emerald-500" : col.status === "warning" ? "bg-amber-500" : "bg-rose-500"
                      }`}
                      style={{ width: `${col.fillRate}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                  <span>Type: {col.type}</span>
                  <span>Uniq: {col.uniqueRate}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
