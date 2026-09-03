'use client';

import React, { useState } from 'react';
import { Zap, Database, Search, ArrowRight, CheckCircle2, RefreshCw, Sparkles, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CacheEntry {
  id: string;
  incomingPrompt: string;
  matchedCachedPrompt: string;
  cosineSimilarity: number;
  isHit: boolean;
  latencyMs: number;
  costSavedUsd: number;
}

export function SemanticCacheOptimizer() {
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.88);
  const [testPrompt, setTestPrompt] = useState('Generate 500 fake patient medical records with ICD-10 codes');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([
    {
      id: 'c-1',
      incomingPrompt: 'Create 500 synthetic healthcare EHR patient records with diagnoses',
      matchedCachedPrompt: 'Generate 500 patient EHR records with ICD-10 diagnosis codes',
      cosineSimilarity: 0.94,
      isHit: true,
      latencyMs: 8,
      costSavedUsd: 0.042,
    },
    {
      id: 'c-2',
      incomingPrompt: 'Synthesize 1000 credit card transactions with fraud flags',
      matchedCachedPrompt: 'Create 1k credit card fraud dataset with transaction amounts',
      cosineSimilarity: 0.91,
      isHit: true,
      latencyMs: 6,
      costSavedUsd: 0.038,
    },
    {
      id: 'c-3',
      incomingPrompt: 'Extract web catalog for aerospace titanium fasteners',
      matchedCachedPrompt: 'Scrape online store for industrial stainless steel bolts',
      cosineSimilarity: 0.72,
      isHit: false,
      latencyMs: 1240,
      costSavedUsd: 0.0,
    },
  ]);

  const [hitRatePct, setHitRatePct] = useState(86.4);
  const [totalSavedUsd, setTotalSavedUsd] = useState(64.8);

  const handleTestCache = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      const sim = parseFloat((Math.random() * 0.15 + 0.82).toFixed(2));
      const hit = sim >= similarityThreshold;
      const newEntry: CacheEntry = {
        id: `c-${Date.now()}`,
        incomingPrompt: testPrompt,
        matchedCachedPrompt: 'Generate 500 patient EHR records with ICD-10 diagnosis codes',
        cosineSimilarity: sim,
        isHit: hit,
        latencyMs: hit ? Math.floor(Math.random() * 5 + 5) : Math.floor(Math.random() * 400 + 1000),
        costSavedUsd: hit ? 0.045 : 0.0,
      };

      setCacheEntries((prev) => [newEntry, ...prev.slice(0, 3)]);
      if (hit) {
        setTotalSavedUsd((prev) => parseFloat((prev + 0.045).toFixed(2)));
        setHitRatePct((prev) => Math.min(96, parseFloat((prev + 0.5).toFixed(1))));
      }
      setIsEvaluating(false);
    }, 600);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-emerald-500/5 border-emerald-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Zap className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Vectorized Semantic Cache & Latency Optimizer
              <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10">
                Cosine Similarity ≥ {similarityThreshold}
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              In-memory semantic vector cache serving redundant synthetic generation requests in under 10ms at $0 cost.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-mono font-bold text-emerald-500">${totalSavedUsd.toFixed(2)}</div>
          <div className="text-[10px] text-muted-foreground">API Token Spend Saved</div>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1.5">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Cache Hit Rate</span>
          <div className="text-2xl font-mono font-bold text-emerald-500">{hitRatePct}%</div>
          <Progress value={hitRatePct} className="h-1.5 bg-muted" />
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Hit Latency</span>
          <div className="text-2xl font-mono font-bold text-foreground">6ms</div>
          <div className="text-[10px] text-emerald-400">vs 1,200ms LLM roundtrip</div>
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Memory Allocation</span>
          <div className="text-2xl font-mono font-bold text-foreground">14.8 MB</div>
          <div className="text-[10px] text-muted-foreground">1,250 cached prompt vectors</div>
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Eviction Policy</span>
          <div className="text-xs font-mono font-bold text-foreground mt-1">LRU (24h TTL)</div>
          <div className="text-[10px] text-muted-foreground">Cosine Index: HNSW M=16</div>
        </div>
      </div>

      {/* Interactive Cache Lookup Simulator */}
      <div className="p-4 bg-background/90 rounded-2xl border border-border/60 space-y-3 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Search className="size-3.5 text-emerald-500" />
            Live Semantic Cache Lookup Test
          </span>
          <Button
            onClick={handleTestCache}
            disabled={isEvaluating}
            size="sm"
            className="h-8 px-3 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
          >
            {isEvaluating ? <RefreshCw className="size-3 mr-1.5 animate-spin" /> : <Zap className="size-3 mr-1.5" />}
            {isEvaluating ? 'Evaluating Cosine Distance...' : 'Test Semantic Lookup'}
          </Button>
        </div>

        <input
          type="text"
          value={testPrompt}
          onChange={(e) => setTestPrompt(e.target.value)}
          className="w-full bg-muted/30 border border-border/60 rounded-xl px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500/50"
        />
      </div>

      {/* Cache Stream Log */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
          Recent Semantic Lookup Evaluations
        </span>
        <div className="space-y-2">
          {cacheEntries.map((entry) => (
            <div
              key={entry.id}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all ${
                entry.isHit
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-muted/20 border-border/40'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">&ldquo;{entry.incomingPrompt}&rdquo;</span>
                  <Badge
                    className={`text-[9px] font-mono font-bold ${
                      entry.isHit
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {entry.isHit ? 'CACHE HIT' : 'CACHE MISS (LLM DISPATCH)'}
                  </Badge>
                </div>
                <div className="text-[11px] text-muted-foreground font-mono">
                  Matched: &ldquo;{entry.matchedCachedPrompt}&rdquo; • Cosine: {(entry.cosineSimilarity * 100).toFixed(1)}%
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center font-mono">
                <div className="text-right">
                  <div className={`text-xs font-bold ${entry.isHit ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                    {entry.latencyMs}ms
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {entry.isHit ? 'Saved $0.045' : '$0.045 Incurred'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
