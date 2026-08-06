"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Clock, PlayCircle, Activity } from "lucide-react";

export function JobExecutionTimeline() {
  const steps = [
    { title: "Initialization", status: "completed", time: "0.2s" },
    { title: "Headless Crawl4AI Dispatch", status: "completed", time: "1.4s" },
    { title: "DOM Extraction & Sanitization", status: "completed", time: "0.8s" },
    { title: "Synthetic Augmentation & PII Masking", status: "active", time: "In Progress" },
  ];

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Job Step Execution Timeline
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Real-time step-by-step pipeline execution breakdown.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {steps.map((s, idx) => (
          <div key={s.title} className="flex items-center justify-between p-3 rounded-xl bg-secondary/15 border border-border/30 text-xs">
            <div className="flex items-center gap-2 font-medium">
              {s.status === "completed" ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <PlayCircle className="h-4 w-4 text-primary animate-pulse" />
              )}
              <span>Step {idx + 1}: {s.title}</span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">{s.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
