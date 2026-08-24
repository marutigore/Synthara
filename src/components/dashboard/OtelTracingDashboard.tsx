'use client';

import React, { useState } from 'react';
import { Activity, Clock, Layers, RefreshCw, CheckCircle2, AlertCircle, ArrowRight, Tag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TraceSpan {
  id: string;
  name: string;
  service: string;
  durationMs: number;
  offsetMs: number;
  status: 'ok' | 'error';
  attributes: Record<string, string | number>;
}

export function OtelTracingDashboard() {
  const [traceId, setTraceId] = useState('trace_8f29d10e4a7c0019');
  const [selectedSpan, setSelectedSpan] = useState<TraceSpan | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [spans, setSpans] = useState<TraceSpan[]>([
    {
      id: 'span-root',
      name: 'POST /api/generate-stream',
      service: 'synthara-gateway',
      durationMs: 780,
      offsetMs: 0,
      status: 'ok',
      attributes: { 'http.method': 'POST', 'http.status_code': 200, 'user.id': 'usr_4921' },
    },
    {
      id: 'span-auth',
      name: 'supabase.auth.getUser()',
      service: 'auth-service',
      durationMs: 42,
      offsetMs: 12,
      status: 'ok',
      attributes: { 'db.system': 'supabase_jwt', 'auth.cached': 'true' },
    },
    {
      id: 'span-crawl',
      name: 'crawl4ai.extract_dom()',
      service: 'crawler-worker-pod',
      durationMs: 310,
      offsetMs: 65,
      status: 'ok',
      attributes: { 'crawl.engine': 'chromium_headless', 'dom.bytes': 148200 },
    },
    {
      id: 'span-gemini',
      name: 'gemini.generateContentStream()',
      service: 'ai-synthesizer',
      durationMs: 380,
      offsetMs: 385,
      status: 'ok',
      attributes: { 'ai.model': 'gemini-2.5-flash', 'ai.tokens.completion': 840 },
    },
    {
      id: 'span-pii',
      name: 'pii.mask_envelope()',
      service: 'privacy-guard',
      durationMs: 18,
      offsetMs: 750,
      status: 'ok',
      attributes: { 'pii.detected_ssn': 0, 'pii.sanitized': 'true' },
    },
  ]);

  const totalDuration = 780;

  const handleGenerateNewTrace = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setTraceId(`trace_${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`);
      setSpans((prev) =>
        prev.map((s) => ({
          ...s,
          durationMs: Math.max(10, Math.floor(s.durationMs + (Math.random() - 0.5) * 40)),
        }))
      );
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-indigo-500/5 border-indigo-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Activity className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              OpenTelemetry (OTel) Distributed Tracing
              <Badge variant="outline" className="text-[10px] border-indigo-500/30 text-indigo-500 bg-indigo-500/10">
                W3C TraceContext
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              End-to-end distributed latency waterfalls across gateway, crawler pods, and Gemini APIs.
            </p>
          </div>
        </div>

        <Button
          onClick={handleGenerateNewTrace}
          disabled={isRefreshing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
        >
          {isRefreshing ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <RefreshCw className="size-3.5 mr-1.5" />}
          {isRefreshing ? 'Sampling Traces...' : 'Capture New Trace'}
        </Button>
      </div>

      {/* Trace Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/40 rounded-xl border border-border/40 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Trace ID:</span>
          <span className="font-mono font-bold text-foreground bg-background px-2 py-0.5 rounded border border-border/60">
            {traceId}
          </span>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground font-mono">
          <div>Spans: <span className="text-foreground font-bold">{spans.length}</span></div>
          <div>Total Latency: <span className="text-emerald-500 font-bold">{totalDuration}ms</span></div>
          <div>Status: <span className="text-emerald-500 font-bold">HTTP 200 OK</span></div>
        </div>
      </div>

      {/* Jaeger-Style Waterfall Timeline */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
          Distributed Span Waterfall
        </span>

        <div className="space-y-2 bg-background/80 p-4 rounded-2xl border border-border/60 shadow-inner">
          {spans.map((span) => {
            const leftPct = (span.offsetMs / totalDuration) * 100;
            const widthPct = Math.max(4, (span.durationMs / totalDuration) * 100);

            return (
              <div
                key={span.id}
                onClick={() => setSelectedSpan(span)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                  selectedSpan?.id === span.id
                    ? 'bg-indigo-500/15 border-indigo-500'
                    : 'bg-muted/20 border-border/30 hover:bg-muted/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{span.name}</span>
                    <Badge variant="outline" className="text-[9px] py-0 border-indigo-500/30 text-indigo-400">
                      {span.service}
                    </Badge>
                  </div>
                  <span className="text-muted-foreground text-[11px] font-bold">{span.durationMs}ms</span>
                </div>

                {/* Timeline Bar */}
                <div className="relative h-2 w-full bg-muted/40 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-indigo-500 rounded-full shadow-sm"
                    style={{
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Span Details Drawer */}
      {selectedSpan && (
        <div className="p-4 bg-indigo-500/5 border border-indigo-500/30 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-foreground flex items-center gap-1.5">
              <Tag className="size-3.5 text-indigo-500" />
              Span Attributes: {selectedSpan.name}
            </span>
            <span className="font-mono text-muted-foreground text-[10px]">{selectedSpan.id}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 font-mono text-[11px]">
            {Object.entries(selectedSpan.attributes).map(([k, v]) => (
              <div key={k} className="p-2 bg-background rounded-lg border border-border/40">
                <div className="text-muted-foreground text-[10px] truncate">{k}</div>
                <div className="text-foreground font-bold truncate">{String(v)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
