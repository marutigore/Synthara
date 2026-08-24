'use client';

import React, { useState } from 'react';
import { DollarSign, Zap, TrendingDown, Sparkles, PieChart, ArrowUpRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ModelSpend {
  model: string;
  provider: string;
  tokensTotal: number;
  costUsd: number;
  pct: number;
  color: string;
}

export function TokenCostAnalytics() {
  const [budgetMonthly] = useState(150.0);
  const [currentSpend, setCurrentSpend] = useState(84.2);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [promptSavedPct, setPromptSavedPct] = useState<number | null>(null);

  const [modelSpends] = useState<ModelSpend[]>([
    { model: 'Gemini 2.5 Flash', provider: 'Google', tokensTotal: 4820000, costUsd: 36.15, pct: 43, color: '#3b82f6' },
    { model: 'DeepSeek V3', provider: 'OpenRouter', tokensTotal: 3410000, costUsd: 28.98, pct: 34, color: '#10b981' },
    { model: 'GPT-4o Mini', provider: 'OpenAI', tokensTotal: 1250000, costUsd: 19.07, pct: 23, color: '#8b5cf6' },
  ]);

  const [samplePrompt, setSamplePrompt] = useState(
    'Please act as an expert dataset generator and create 500 rows of realistic healthcare patient records with realistic vitals, diagnosis codes, and patient names, formatted strictly as JSON.'
  );
  const [optimizedPrompt, setOptimizedPrompt] = useState<string | null>(null);

  const handleOptimizePrompt = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setOptimizedPrompt('Generate 500 JSON patient records with vitals, ICD-10 codes, and realistic names.');
      setPromptSavedPct(42);
      setIsOptimizing(false);
    }, 600);
  };

  const budgetPct = Math.round((currentSpend / budgetMonthly) * 100);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-emerald-500/5 border-emerald-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <DollarSign className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Token Usage & FinOps Cost Analytics
              <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10">
                Multi-Model FinOps
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Real-time API token consumption tracking, cost attribution, and prompt compression.
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-mono font-bold text-foreground">${currentSpend.toFixed(2)}</div>
          <div className="text-[10px] text-muted-foreground">Monthly Allocated: ${budgetMonthly.toFixed(2)}</div>
        </div>
      </div>

      {/* Monthly Budget & Unit Economics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-muted/40 rounded-2xl border border-border/40 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Budget Burn</span>
            <span className="font-mono font-bold text-emerald-500">{budgetPct}%</span>
          </div>
          <Progress value={budgetPct} className="h-2 bg-muted" />
          <div className="text-[10px] text-muted-foreground">
            ${(budgetMonthly - currentSpend).toFixed(2)} remaining this billing cycle
          </div>
        </div>

        <div className="p-4 bg-muted/40 rounded-2xl border border-border/40 space-y-1">
          <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Unit Economics</span>
          <div className="text-2xl font-mono font-bold text-foreground">$0.016</div>
          <div className="text-[10px] text-muted-foreground">Average cost per 1,000 synthetic rows</div>
        </div>

        <div className="p-4 bg-muted/40 rounded-2xl border border-border/40 space-y-1">
          <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Tokens Synthesized</span>
          <div className="text-2xl font-mono font-bold text-foreground">9.48M</div>
          <div className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
            <TrendingDown className="size-3" />
            14% efficiency gain via prompt caching
          </div>
        </div>
      </div>

      {/* Model Breakdown */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
          Model Cost Attribution
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {modelSpends.map((m) => (
            <div key={m.model} className="p-3.5 bg-muted/30 border border-border/40 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-foreground">{m.model}</span>
                <Badge variant="outline" className="text-[9px] font-mono">{m.provider}</Badge>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-muted-foreground">Spend:</span>
                <span className="font-bold text-foreground">${m.costUsd.toFixed(2)} ({m.pct}%)</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-muted-foreground">Tokens:</span>
                <span className="text-muted-foreground">{(m.tokensTotal / 1000000).toFixed(2)}M</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Compression Optimizer */}
      <div className="p-4 bg-background border border-border/60 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-emerald-500" />
            AI Prompt Token Reducer (Lossless Compression)
          </span>
          <Button
            size="sm"
            onClick={handleOptimizePrompt}
            disabled={isOptimizing}
            className="h-8 px-3 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
          >
            {isOptimizing ? 'Compressing...' : 'Compress Prompt'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-muted/30 rounded-xl border border-border/40 space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Raw Prompt (34 Tokens)</span>
            <p className="text-muted-foreground text-[11px] leading-relaxed">{samplePrompt}</p>
          </div>

          <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/30 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-emerald-500 uppercase font-bold">Optimized Prompt (19 Tokens)</span>
              {promptSavedPct && (
                <Badge className="bg-emerald-500/20 text-emerald-500 text-[9px]">
                  -{promptSavedPct}% TOKENS
                </Badge>
              )}
            </div>
            <p className="text-foreground text-[11px] leading-relaxed font-bold">
              {optimizedPrompt || 'Click Compress Prompt to remove boilerplate tokens while preserving semantic intent.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
