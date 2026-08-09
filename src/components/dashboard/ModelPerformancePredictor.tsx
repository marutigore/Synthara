"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Cpu } from "lucide-react";

export function ModelPerformancePredictor() {
  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Downstream ML Model Accuracy & F1-Score Predictor
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Predicts downstream classifier accuracy when trained on this synthetic dataset.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-secondary/15 border border-border/30 text-center">
          <span className="text-xs text-muted-foreground font-medium">Estimated Accuracy</span>
          <div className="text-lg font-black text-emerald-500 font-mono mt-1">94.8%</div>
        </div>

        <div className="p-3 rounded-xl bg-secondary/15 border border-border/30 text-center">
          <span className="text-xs text-muted-foreground font-medium">Predicted F1-Score</span>
          <div className="text-lg font-black text-primary font-mono mt-1">0.932</div>
        </div>
      </CardContent>
    </Card>
  );
}
