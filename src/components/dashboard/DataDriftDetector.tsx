"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface DataDriftDetectorProps {
  driftPercentage?: number;
}

export function DataDriftDetector({ driftPercentage = 4.2 }: DataDriftDetectorProps) {
  const isHighDrift = driftPercentage > 10;

  return (
    <Alert variant={isHighDrift ? "destructive" : "default"} className="bg-card/60 border-border/40">
      {isHighDrift ? <AlertTriangle className="h-4 w-4 text-rose-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
      <AlertTitle className="text-xs font-bold">
        {isHighDrift ? "High Data Drift Detected" : "Data Distribution Stable"}
      </AlertTitle>
      <AlertDescription className="text-[11px] text-muted-foreground">
        Current dataset drift variance is <span className="font-mono font-bold text-foreground">{driftPercentage}%</span> relative to historical baseline models.
      </AlertDescription>
    </Alert>
  );
}
