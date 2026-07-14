"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Play, Power, RotateCcw, Terminal, Trash2, Cpu, CheckCircle } from "lucide-react";

export interface BackgroundJob {
  id: string;
  name: string;
  query: string;
  status: "queued" | "running" | "completed" | "failed";
  progress: number;
  startedAt: string;
  duration: string;
  engine: string;
}

interface JobStatusCardProps {
  job: BackgroundJob;
  onRetry: (id: string) => void;
  onStop: (id: string) => void;
  onDelete: (id: string) => void;
}

export function JobStatusCard({ job, onRetry, onStop, onDelete }: JobStatusCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "queued":
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Queued</Badge>;
      case "running":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse flex gap-1 items-center">
            <Loader2 className="h-3 w-3 animate-spin" /> Running
          </Badge>
        );
      case "completed":
        return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Completed</Badge>;
      case "failed":
        return <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="modern-card border-none shadow-sm hover:scale-[1.005] transition-all bg-card/60">
      <CardContent className="p-5 space-y-4">
        {/* Header line */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-sm text-foreground">{job.name}</h4>
              <Badge variant="outline" className="text-[10px] font-mono uppercase bg-secondary/50">
                {job.id}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground font-mono truncate max-w-md">{job.query}</p>
          </div>
          {getStatusBadge(job.status)}
        </div>

        {/* Info stats line */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/10 text-xs font-mono">
          <div>
            <span className="text-[10px] text-muted-foreground/60 block uppercase">Crawler Engine</span>
            <span className="font-semibold text-foreground flex items-center gap-1">
              <Cpu className="h-3 w-3 text-primary" /> {job.engine}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/60 block uppercase">Started At</span>
            <span className="font-semibold text-foreground">{job.startedAt}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/60 block uppercase">Elapsed Time</span>
            <span className="font-semibold text-foreground">{job.duration}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground/60 block uppercase">Status Status</span>
            <span className="font-semibold text-foreground capitalize">{job.status}</span>
          </div>
        </div>

        {/* Progress Bar (Only show if running/queued) */}
        {(job.status === "running" || job.progress < 100) && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>Task execution progress</span>
              <span>{job.progress}%</span>
            </div>
            <Progress value={job.progress} className="h-1.5 bg-secondary" />
          </div>
        )}

        {/* Control Actions line */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/10">
          <span className="text-[10px] text-muted-foreground/60 font-mono flex items-center gap-1">
            <Terminal className="h-3 w-3" /> system task identifier
          </span>

          <div className="flex items-center gap-2">
            {job.status === "running" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStop(job.id)}
                className="h-7 text-xs px-2.5 hover:bg-rose-500/10 hover:text-rose-500 border-border/40 gap-1 rounded-lg"
              >
                <Power className="h-3 w-3" /> Stop Job
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRetry(job.id)}
                className="h-7 text-xs px-2.5 hover:bg-primary/10 hover:text-primary border-border/40 gap-1 rounded-lg"
              >
                <RotateCcw className="h-3 w-3" /> Re-run Job
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(job.id)}
              className="h-7 w-7 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 rounded-lg"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
