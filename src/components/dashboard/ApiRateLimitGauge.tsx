"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gauge, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ApiRateLimitGauge() {
  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" />
          Live API Scraper Quota & Rate Limit Gauge
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Track active hourly requests and endpoint concurrency limits.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span>Hourly Request Usage</span>
            <span className="font-mono text-primary">384 / 1,000 reqs</span>
          </div>
          <Progress value={38.4} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
