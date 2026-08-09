'use client';

import React, { useState, useEffect } from 'react';
import { Database, Play, Pause, RefreshCw, CheckCircle2, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeneratedRow {
  id: number;
  fullName: string;
  email: string;
  accountTier: string;
  status: string;
}

export function LiveGenerationPreview() {
  const [rows, setRows] = useState<GeneratedRow[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);

  const sampleNames = ['Aarav Sharma', 'Maya Lin', 'Carlos Silva', 'Elena Rostova', 'Kenji Sato', 'Amara Okafor'];
  const sampleTiers = ['Enterprise', 'Pro', 'Free', 'Scale'];

  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setRows((prev) => {
        if (prev.length >= 15) {
          setIsStreaming(false);
          return prev;
        }
        const nextId = prev.length + 1;
        const name = sampleNames[Math.floor(Math.random() * sampleNames.length)];
        const email = `${name.toLowerCase().replace(' ', '.')}@synthara-ai.dev`;
        const tier = sampleTiers[Math.floor(Math.random() * sampleTiers.length)];

        return [
          ...prev,
          {
            id: nextId,
            fullName: name,
            email,
            accountTier: tier,
            status: 'Verified',
          },
        ];
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const restartStream = () => {
    setRows([]);
    setIsStreaming(true);
  };

  return (
    <div className="modern-card p-6 space-y-4 bg-gradient-to-br from-card to-secondary/30 border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Table className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Live Generation Stream
              {isStreaming && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
            </h4>
            <p className="text-xs text-muted-foreground">
              Synthesizing rows in real-time via Web Worker stream.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsStreaming(!isStreaming)}
            className="h-8 px-3 text-xs font-bold rounded-xl border-border/50"
          >
            {isStreaming ? <Pause className="size-3.5 mr-1" /> : <Play className="size-3.5 mr-1" />}
            {isStreaming ? 'Pause' : 'Resume'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={restartStream}
            className="h-8 px-2 text-xs font-bold text-muted-foreground hover:text-foreground"
            title="Restart Stream"
          >
            <RefreshCw className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Streaming Preview Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Email Address</th>
              <th className="p-3">Tier</th>
              <th className="p-3">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-muted-foreground italic text-xs">
                  Initializing stream pipeline...
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="animate-in fade-in-0 duration-300 hover:bg-muted/30">
                  <td className="p-3 font-bold text-primary">{row.id}</td>
                  <td className="p-3 font-semibold text-foreground">{row.fullName}</td>
                  <td className="p-3 text-muted-foreground">{row.email}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary/10 text-primary border border-primary/20">
                      {row.accountTier}
                    </span>
                  </td>
                  <td className="p-3 text-emerald-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> {row.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold px-1">
        <span>Rows Synthesized: {rows.length} / 15</span>
        <span className="text-emerald-500 font-bold">Latency: 12ms / batch</span>
      </div>
    </div>
  );
}
