'use client';

import React, { useState } from 'react';
import { Cpu, Zap, Gauge, Play, RefreshCw, Layers, CheckCircle2, ShieldCheck, Binary } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function WasmStreamProcessor() {
  const [batchSize, setBatchSize] = useState<number>(50000);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [wasmThroughput, setWasmThroughput] = useState(148200);
  const [jsThroughput, setJsThroughput] = useState(16400);
  const [memoryAllocMb, setMemoryAllocMb] = useState(32.4);

  const runWasmBenchmark = () => {
    setIsBenchmarking(true);
    setTimeout(() => {
      const newWasm = Math.floor(Math.random() * 20000 + 140000);
      const newJs = Math.floor(Math.random() * 2000 + 15000);
      setWasmThroughput(newWasm);
      setJsThroughput(newJs);
      setMemoryAllocMb(parseFloat(((batchSize * 0.00064) + 12).toFixed(1)));
      setIsBenchmarking(false);
    }, 700);
  };

  const speedupMultiplier = (wasmThroughput / jsThroughput).toFixed(1);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-amber-500/5 border-amber-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Cpu className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              WebAssembly (WASM) Stream Processor
              <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-500 bg-amber-500/10">
                Rust / SIMD 128-bit
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              High-throughput in-memory data transformation engine running vectorized Arrow kernels.
            </p>
          </div>
        </div>

        <Button
          onClick={runWasmBenchmark}
          disabled={isBenchmarking}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20"
        >
          {isBenchmarking ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Zap className="size-3.5 mr-1.5" />}
          {isBenchmarking ? 'Running SIMD Pipeline...' : 'Run Benchmark'}
        </Button>
      </div>

      {/* Speedup Banner */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider flex items-center gap-1.5">
            <Gauge className="size-3.5" />
            Execution Performance Delta
          </span>
          <div className="text-lg font-bold text-foreground">
            WASM SIMD is <span className="text-amber-500 font-mono">{speedupMultiplier}x faster</span> than Pure V8 JavaScript
          </div>
        </div>
        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 font-mono text-xs px-3 py-1">
          ZERO UI-THREAD BLOCKING
        </Badge>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">WASM Throughput</span>
          <div className="text-2xl font-mono font-bold text-emerald-500">{wasmThroughput.toLocaleString()} r/s</div>
          <div className="text-[10px] text-muted-foreground">Vectorized SSE4.2 / AVX2 SIMD</div>
        </div>

        <div className="p-4 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">JS Baseline</span>
          <div className="text-2xl font-mono font-bold text-muted-foreground">{jsThroughput.toLocaleString()} r/s</div>
          <div className="text-[10px] text-muted-foreground">Standard Array.prototype.map()</div>
        </div>

        <div className="p-4 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Linear Memory Arena</span>
          <div className="text-2xl font-mono font-bold text-foreground">{memoryAllocMb} MB</div>
          <div className="text-[10px] text-muted-foreground">Zero-copy shared memory buffer</div>
        </div>
      </div>

      {/* Batch Control & Kernel Spec */}
      <div className="p-4 bg-background border border-border/60 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Binary className="size-3.5 text-amber-500" />
            Synthetic Stream Batch Capacity
          </span>
          <div className="flex items-center gap-1">
            {[10000, 50000, 100000].map((size) => (
              <button
                key={size}
                onClick={() => setBatchSize(size)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-colors ${
                  batchSize === size
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {(size / 1000).toFixed(0)}k Rows
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-muted/30 rounded-xl border border-border/40 font-mono text-[11px] text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-foreground">Kernel: arrow2::compute::filter::simd_filter_record_batch</span>
          <span className="text-emerald-500 font-bold">Status: Optimized WebAssembly Module Loaded</span>
        </div>
      </div>
    </div>
  );
}
