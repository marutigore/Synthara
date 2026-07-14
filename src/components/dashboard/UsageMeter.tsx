"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Zap, Sparkles } from "lucide-react";
import { getScraperUsage, type UsageQuota } from "@/lib/utils/rate-limiter";

export function UsageMeter() {
  const [quota, setQuota] = useState<UsageQuota>({ used: 3, limit: 10, resetDate: "" });

  useEffect(() => {
    setQuota(getScraperUsage());

    // Sync state on localstorage change
    const handleStorage = () => {
      setQuota(getScraperUsage());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const percentage = Math.min(100, Math.round((quota.used / quota.limit) * 100));
  const isCritical = quota.used >= quota.limit;
  const isWarning = quota.used >= quota.limit * 0.8;

  return (
    <Card className="modern-card border-none shadow-sm overflow-hidden bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-1.5 text-foreground">
            <Zap className="h-4 w-4 text-primary animate-pulse" />
            API Scraper Usage Quota
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`text-[10px] uppercase font-mono py-0.5 px-2 ${
              isCritical 
                ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' 
                : isWarning 
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                  : 'bg-primary/10 text-primary border-primary/20'
            }`}
          >
            {isCritical ? 'Limit Exceeded' : `${percentage}% Used`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>Runs: {quota.used} / {quota.limit}</span>
            <span>Reset: {quota.resetDate}</span>
          </div>
          <Progress 
            value={percentage} 
            className={`h-2 bg-secondary rounded-full overflow-hidden ${
              isCritical 
                ? 'bg-rose-500' 
                : isWarning 
                  ? 'bg-amber-500' 
                  : 'bg-primary'
            }`} 
          />
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Each data generation or scraping crawl request counts towards your weekly rate limits. 
          To unlock infinite scrapers and multi-threaded crawls, upgrade to Enterprise.
        </p>
      </CardContent>
    </Card>
  );
}
