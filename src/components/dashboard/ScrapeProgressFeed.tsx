"use client";

import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, AlertTriangle, Terminal } from "lucide-react";

interface ScrapeProgressFeedProps {
  isActive: boolean;
  taskName: string;
  onComplete?: () => void;
}

export function ScrapeProgressFeed({ isActive, taskName, onComplete }: ScrapeProgressFeedProps) {
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("Awaiting start...");
  const [detail, setDetail] = useState("Standing by for task execution");
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");

  useEffect(() => {
    if (!isActive) {
      setStatus("idle");
      setProgress(0);
      setLogs([]);
      return;
    }

    setStatus("running");
    setLogs(["[SYSTEM] Initiating SSE feed connection..."]);

    const eventSource = new EventSource(`/api/scrape-progress?task=${encodeURIComponent(taskName)}`);

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setProgress(parsed.progress);
        setLabel(parsed.label);
        setDetail(parsed.detail);
        setLogs((prev) => [...prev, `[${new Date(parsed.timestamp).toLocaleTimeString()}] ${parsed.label} - ${parsed.detail}`]);
      } catch (err) {
        console.error("Failed to parse event progress stream data:", err);
      }
    };

    eventSource.addEventListener("complete", () => {
      setStatus("success");
      setProgress(100);
      setLabel("Task complete");
      setDetail("All scraping and parsing procedures finished.");
      setLogs((prev) => [...prev, "[SYSTEM] Scrape session finalized. Stream closed."]);
      eventSource.close();
      if (onComplete) {
        onComplete();
      }
    });

    eventSource.onerror = (err) => {
      console.error("SSE stream encountered connection failure:", err);
      setStatus("error");
      setLabel("Connection lost");
      setDetail("Unable to read streaming update status. Retrying...");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [isActive, taskName, onComplete]);

  if (!isActive && status === "idle") return null;

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          <h4 className="font-semibold text-foreground text-sm md:text-base">Real-time Crawler Log</h4>
        </div>
        <div className="flex items-center gap-1.5">
          {status === "running" && (
            <Badge variant="secondary" className="animate-pulse flex gap-1 items-center bg-primary/10 text-primary border-primary/20">
              <Loader2 className="h-3 w-3 animate-spin" /> Live Syncing
            </Badge>
          )}
          {status === "success" && (
            <Badge variant="default" className="flex gap-1 items-center bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              <CheckCircle2 className="h-3 w-3" /> Scraped
            </Badge>
          )}
          {status === "error" && (
            <Badge variant="destructive" className="flex gap-1 items-center bg-rose-500/10 text-rose-500 border-rose-500/20">
              <AlertTriangle className="h-3 w-3" /> Error
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground font-mono">
          <span>{label}</span>
          <span className="font-semibold text-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-muted transition-all duration-300" />
      </div>

      <div className="rounded-lg bg-black/80 dark:bg-black/90 p-4 border border-white/10">
        <div className="font-mono text-xs text-zinc-400 space-y-1.5 max-h-40 overflow-y-auto scrollbar-thin">
          {logs.map((log, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              <span className="text-zinc-500">&gt;&nbsp;</span>
              {log}
            </div>
          ))}
          <div className="text-zinc-500 text-[10px] italic mt-1 font-sans">{detail}</div>
        </div>
      </div>
    </div>
  );
}
