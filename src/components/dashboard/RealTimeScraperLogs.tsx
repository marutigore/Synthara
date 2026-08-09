"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Terminal, Pause, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RealTimeScraperLogs() {
  const [paused, setPaused] = useState(false);

  const logs = [
    "[SYSTEM] Initialize Crawl4AI Docker Node pool...",
    "[INFO] Dispatching headless Chrome browser instance (Viewport 1920x1080)",
    "[SUCCESS] DOM Sanitization completed. Extracted 42 structured nodes.",
    "[PROCESS] Executing PII anonymization & null value imputation heuristics...",
    "[COMPLETE] Job execution completed in 1.42s (Status: 200 OK)",
  ];

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Terminal className="h-5 w-5 text-primary" />
              Real-Time Scraper Terminal Logs Streamer
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Live Server-Sent Events (SSE) log output console.
            </CardDescription>
          </div>
          <Button onClick={() => setPaused(!paused)} size="sm" variant="outline" className="h-8 text-xs gap-1 font-mono">
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            {paused ? "Resume Stream" : "Pause Stream"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <pre className="p-4 rounded-xl bg-black/80 text-emerald-400 font-mono text-xs h-36 overflow-y-auto space-y-1">
          {logs.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </pre>
      </CardContent>
    </Card>
  );
}
