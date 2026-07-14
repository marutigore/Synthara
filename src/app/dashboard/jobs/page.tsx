"use client";

import React, { useState, useEffect } from "react";
import { JobStatusCard, type BackgroundJob } from "@/components/dashboard/JobStatusCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cpu, Loader2, Play, Sparkles, Server, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function JobsPage() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<BackgroundJob[]>([]);
  const [filter, setFilter] = useState<"all" | "running" | "completed" | "failed">("all");

  useEffect(() => {
    const saved = localStorage.getItem("synthara-background-jobs");
    if (saved) {
      setJobs(JSON.parse(saved));
    } else {
      const initial: BackgroundJob[] = [
        {
          id: "job-df12",
          name: "Deep Web Tech Scraping",
          query: "Extracting recent tech news articles from leading blogs",
          status: "running",
          progress: 68,
          startedAt: "17:42:00",
          duration: "2m 14s",
          engine: "Crawl4AI Engine"
        },
        {
          id: "job-3a45",
          name: "Shopify Product Scraping Pipeline",
          query: "Scrape pricing variations of e-commerce storefronts",
          status: "completed",
          progress: 100,
          startedAt: "16:20:00",
          duration: "5m 48s",
          engine: "Crawl4AI Engine"
        },
        {
          id: "job-fe89",
          name: "Wikipedia Academic Crawl",
          query: "Building dataset of Quantum mechanics theorems",
          status: "failed",
          progress: 42,
          startedAt: "15:00:00",
          duration: "1m 10s",
          engine: "Crawl4AI Engine"
        }
      ];
      setJobs(initial);
      localStorage.setItem("synthara-background-jobs", JSON.stringify(initial));
    }
  }, []);

  const saveJobs = (updated: BackgroundJob[]) => {
    setJobs(updated);
    localStorage.setItem("synthara-background-jobs", JSON.stringify(updated));
  };

  const handleRetry = (id: string) => {
    const updated = jobs.map((job) =>
      job.id === id
        ? {
            ...job,
            status: "running" as const,
            progress: 10,
            startedAt: new Date().toLocaleTimeString(),
            duration: "0s"
          }
        : job
    );
    saveJobs(updated);
    toast({
      title: "Job execution triggered",
      description: `Task '${id}' has been added back to the active queue.`
    });
  };

  const handleStop = (id: string) => {
    const updated = jobs.map((job) =>
      job.id === id ? { ...job, status: "failed" as const } : job
    );
    saveJobs(updated);
    toast({
      title: "Job stopped",
      description: `Background crawler process '${id}' was terminated by user.`
    });
  };

  const handleDelete = (id: string) => {
    const updated = jobs.filter((job) => job.id !== id);
    saveJobs(updated);
    toast({
      title: "Job trace deleted",
      description: `Job tracking parameters '${id}' purged from dashboard.`
    });
  };

  const activeRunningCount = jobs.filter((j) => j.status === "running").length;
  const completedCount = jobs.filter((j) => j.status === "completed").length;
  const failedCount = jobs.filter((j) => j.status === "failed").length;

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    return job.status === filter;
  });

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-semibold text-foreground flex items-center gap-2">
          <Server className="h-6 w-6 text-primary" />
          Background Jobs Pipeline
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor your active scraping crawlers, Docker tasks, and execution logs in real-time.
        </p>
      </div>

      {/* Analytics stats dashboard row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-none shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Active Crawlers</span>
              <p className="text-2xl font-black text-blue-500">{activeRunningCount}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 animate-pulse">
              <Cpu className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-none shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Successful Outputs</span>
              <p className="text-2xl font-black text-emerald-500">{completedCount}</p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-none shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Failed Queries</span>
              <p className="text-2xl font-black text-rose-500">{failedCount}</p>
            </div>
            <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500">
              <XCircle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter tab buttons list */}
      <div className="flex flex-wrap gap-2 border-b border-border/10 pb-3">
        <Button
          variant={filter === "all" ? "default" : "ghost"}
          onClick={() => setFilter("all")}
          size="sm"
          className="text-xs uppercase font-bold tracking-wider rounded-lg h-8"
        >
          All Tasks ({jobs.length})
        </Button>
        <Button
          variant={filter === "running" ? "default" : "ghost"}
          onClick={() => setFilter("running")}
          size="sm"
          className="text-xs uppercase font-bold tracking-wider rounded-lg h-8"
        >
          Running ({activeRunningCount})
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "ghost"}
          onClick={() => setFilter("completed")}
          size="sm"
          className="text-xs uppercase font-bold tracking-wider rounded-lg h-8"
        >
          Completed ({completedCount})
        </Button>
        <Button
          variant={filter === "failed" ? "default" : "ghost"}
          onClick={() => setFilter("failed")}
          size="sm"
          className="text-xs uppercase font-bold tracking-wider rounded-lg h-8"
        >
          Failed ({failedCount})
        </Button>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-border/40 bg-secondary/5">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No Jobs Match Filter</p>
            <p className="text-xs text-muted-foreground mt-1">There are no active crawler instances in this tab.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobStatusCard
              key={job.id}
              job={job}
              onRetry={handleRetry}
              onStop={handleStop}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
