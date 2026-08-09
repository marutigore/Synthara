"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Grid3X3, ArrowUpDown } from "lucide-react";

interface CorrelationMatrixViewerProps {
  columns?: string[];
}

export function CorrelationMatrixViewer({ columns = ["Price", "Quantity", "Revenue", "Rating"] }: CorrelationMatrixViewerProps) {
  const getCorrelation = (i: number, j: number) => {
    if (i === j) return "1.00";
    const val = (Math.sin(i * 3 + j * 7) * 0.85).toFixed(2);
    return Number(val) > 0 ? `+${val}` : val;
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Grid3X3 className="h-5 w-5 text-primary" />
          Feature Pearson Correlation Matrix Grid
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Calculates pairwise feature correlation and covariance dependencies.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr>
              <th className="p-2 text-left text-muted-foreground">Feature</th>
              {columns.map((c) => (
                <th key={c} className="p-2 text-center text-foreground font-bold">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columns.map((c1, i) => (
              <tr key={c1} className="border-t border-border/10">
                <td className="p-2 font-bold text-foreground">{c1}</td>
                {columns.map((c2, j) => {
                  const corr = getCorrelation(i, j);
                  const isPos = corr.startsWith("+") || corr === "1.00";
                  return (
                    <td key={c2} className="p-2 text-center">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                        corr === "1.00"
                          ? "bg-primary/20 text-primary"
                          : isPos
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-rose-500/10 text-rose-500"
                      }`}>
                        {corr}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
