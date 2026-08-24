'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Radio, Play, Pause, ArrowRight, Server, CheckCircle2, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface PipelineStage {
  id: string;
  name: string;
  type: string;
  status: 'streaming' | 'completed' | 'queued';
  throughputRowsSec: number;
  processedRows: number;
  targetRows: number;
  latencyMs: number;
}

interface SseLogEvent {
  id: string;
  timestamp: string;
  stage: string;
  message: string;
  type: 'info' | 'success' | 'warn';
}

export function SsePipelineMonitor() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [stages, setStages] = useState<PipelineStage[]>([
    {
      id: 'stg-1',
      name: 'Crawl4AI Web Scraper',
      type: 'Headless Chromium Ingestion',
      status: 'completed',
      throughputRowsSec: 140,
      processedRows: 2500,
      targetRows: 2500,
      latencyMs: 12,
    },
    {
      id: 'stg-2',
      name: 'Gemini 2.5 Flash Synthesis',
      type: 'LLM Augmentation Pipeline',
      status: 'streaming',
      throughputRowsSec: 85,
      processedRows: 1840,
      targetRows: 2500,
      latencyMs: 240,
    },
    {
      id: 'stg-3',
      name: 'Zero-PII Anonymizer',
      type: 'Differential Privacy Engine',
      status: 'streaming',
      throughputRowsSec: 210,
      processedRows: 1720,
      targetRows: 2500,
      latencyMs: 8,
    },
    {
      id: 'stg-4',
      name: 'Iceberg Lakehouse Sync',
      type: 'S3 Parquet Partition Writer',
      status: 'queued',
      throughputRowsSec: 0,
      processedRows: 1200,
      targetRows: 2500,
      latencyMs: 0,
    },
  ]);

  const [logs, setLogs] = useState<SseLogEvent[]>([
    { id: '1', timestamp: '12:58:01', stage: 'Crawl4AI', message: 'SSE Connection handshake accepted (HTTP 200 OK)', type: 'info' },
    { id: '2', timestamp: '12:58:04', stage: 'Gemini', message: 'Batch #18 generated: 100 rows synthesized in 230ms', type: 'success' },
    { id: '3', timestamp: '12:58:07', stage: 'PII Mask', message: 'Scanned 100 records: 4 SSNs masked, 0 entropy leaks', type: 'info' },
  ]);

  // Simulate real-time SSE stream ticks
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setStages((prev) =>
        prev.map((s) => {
          if (s.id === 'stg-2' && s.processedRows < s.targetRows) {
            const next = Math.min(s.targetRows, s.processedRows + 25);
            return { ...s, processedRows: next };
          }
          if (s.id === 'stg-3' && s.processedRows < s.targetRows) {
            const next = Math.min(s.targetRows, s.processedRows + 25);
            return { ...s, processedRows: next };
          }
          return s;
        })
      );

      const now = new Date().toTimeString().split(' ')[0];
      const batchNum = Math.floor(Math.random() * 50 + 20);
      setLogs((prev) => [
        {
          id: Math.random().toString(),
          timestamp: now,
          stage: 'Gemini-SSE',
          message: `event: chunk_received | id: ${batchNum} | rows: +25 | lat: 215ms`,
          type: 'info',
        },
        ...prev.slice(0, 4),
      ]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const totalProcessed = stages[1].processedRows;
  const targetTotal = stages[1].targetRows;
  const overallProgress = Math.round((totalProcessed / targetTotal) * 100);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-sky-500/5 border-sky-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
            <Radio className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Server-Sent Events (SSE) Pipeline Monitor
              <Badge variant="outline" className="text-[10px] border-sky-500/30 text-sky-500 bg-sky-500/10">
                Live SSE Stream
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Real-time DAG telemetry and event stream monitoring across asynchronous generation workers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsStreaming(!isStreaming)}
            variant="outline"
            className="h-9 px-3.5 text-xs font-semibold rounded-xl border-sky-500/30 text-sky-500 hover:bg-sky-500/10"
          >
            {isStreaming ? <Pause className="size-3.5 mr-1.5" /> : <Play className="size-3.5 mr-1.5" />}
            {isStreaming ? 'Pause Stream' : 'Resume Stream'}
          </Button>
        </div>
      </div>

      {/* Aggregate Pipeline Progress */}
      <div className="p-4 bg-muted/40 rounded-2xl border border-border/40 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-foreground">End-to-End Pipeline Execution Progress</span>
          <span className="font-mono text-sky-500 font-bold">{overallProgress}% ({totalProcessed}/{targetTotal} rows)</span>
        </div>
        <Progress value={overallProgress} className="h-2 bg-muted" />
      </div>

      {/* Directed Acyclic Graph (DAG) Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {stages.map((stage, idx) => (
          <div
            key={stage.id}
            className={`p-4 rounded-2xl border transition-all space-y-3 relative overflow-hidden ${
              stage.status === 'streaming'
                ? 'bg-sky-500/10 border-sky-500/40 shadow-sm'
                : stage.status === 'completed'
                ? 'bg-emerald-500/5 border-emerald-500/20'
                : 'bg-muted/20 border-border/30 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">STAGE 0{idx + 1}</span>
              <Badge
                className={`text-[9px] font-bold ${
                  stage.status === 'streaming'
                    ? 'bg-sky-500/20 text-sky-500 border-sky-500/30 animate-pulse'
                    : stage.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {stage.status.toUpperCase()}
              </Badge>
            </div>

            <div>
              <div className="text-xs font-bold text-foreground">{stage.name}</div>
              <div className="text-[10px] text-muted-foreground truncate">{stage.type}</div>
            </div>

            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Throughput:</span>
                <span className="text-foreground font-bold">{stage.throughputRowsSec} r/s</span>
              </div>
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Latency:</span>
                <span className="text-sky-500">{stage.latencyMs}ms</span>
              </div>
            </div>

            <Progress
              value={(stage.processedRows / stage.targetRows) * 100}
              className="h-1 bg-background"
            />
          </div>
        ))}
      </div>

      {/* Live SSE Raw Event Stream Log */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="size-3.5 text-sky-500" />
          Live EventSource Stream Console
        </span>
        <div className="p-3 bg-background border border-border/60 rounded-xl font-mono text-xs space-y-1.5 max-h-36 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 text-[11px] leading-relaxed">
              <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
              <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-sky-500/30 text-sky-500">
                {log.stage}
              </Badge>
              <span className="text-foreground/90 break-all">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
