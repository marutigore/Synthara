'use client';

import React, { useState } from 'react';
import { Swords, Trophy, Sparkles, RefreshCw, CheckCircle2, Star, ThumbsUp, Scale, Flame, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ModelCompetitor {
  name: string;
  provider: string;
  eloRating: number;
  winRatePct: number;
  matchesPlayed: number;
  color: string;
}

interface EvaluationRound {
  prompt: string;
  modelA: { name: string; output: string; score: number };
  modelB: { name: string; output: string; score: number };
  judgeVerdict: 'Model A' | 'Model B' | 'Tie';
  judgeReasoning: string;
  criteria: { name: string; scoreA: number; scoreB: number }[];
}

export function GenAiEvaluationArena() {
  const [isJudging, setIsJudging] = useState(false);

  const [leaderboard, setLeaderboard] = useState<ModelCompetitor[]>([
    { name: 'Gemini 2.5 Flash', provider: 'Google AI', eloRating: 1248, winRatePct: 68, matchesPlayed: 142, color: '#3b82f6' },
    { name: 'DeepSeek V3', provider: 'OpenRouter', eloRating: 1215, winRatePct: 62, matchesPlayed: 138, color: '#10b981' },
    { name: 'GPT-4o Mini', provider: 'OpenAI', eloRating: 1190, winRatePct: 55, matchesPlayed: 124, color: '#8b5cf6' },
    { name: 'Claude 3.5 Haiku', provider: 'Anthropic', eloRating: 1182, winRatePct: 54, matchesPlayed: 110, color: '#f59e0b' },
  ]);

  const [currentBattle, setCurrentBattle] = useState<EvaluationRound>({
    prompt: 'Generate a high-cardinality synthetic JSON payload for multi-tenant B2B SaaS telemetry events.',
    modelA: {
      name: 'Gemini 2.5 Flash',
      output: '{\n  "event_id": "evt_99812_f4",\n  "org_id": "org_enterprise_acme",\n  "actor": { "id": "usr_481", "role": "BillingAdmin" },\n  "action": "subscription.plan_upgraded",\n  "metrics": { "mrr_delta_usd": 1200.0, "seats": 45 },\n  "timestamp_epoch_ms": 1725184920000\n}',
      score: 9.4,
    },
    modelB: {
      name: 'DeepSeek V3',
      output: '{\n  "event": "upgrade",\n  "organization": "Acme Corp",\n  "user": "admin@acme.com",\n  "details": "User changed plan to enterprise tier with 45 seats",\n  "price": 1200\n}',
      score: 7.8,
    },
    judgeVerdict: 'Model A',
    judgeReasoning: 'Gemini 2.5 Flash produced higher-cardinality strict schema structure with nested actor objects, granular MRR delta floats, and RFC-compliant epoch timestamps suitable for OLAP ingestion.',
    criteria: [
      { name: 'Schema Rigidity', scoreA: 9.6, scoreB: 7.5 },
      { name: 'Cardinality Diversity', scoreA: 9.2, scoreB: 8.0 },
      { name: 'Downstream Parseability', scoreA: 9.5, scoreB: 8.0 },
    ],
  });

  const handleRunNewBattle = () => {
    setIsJudging(true);
    setTimeout(() => {
      setLeaderboard((prev) =>
        prev.map((m, idx) => ({
          ...m,
          eloRating: idx === 0 ? m.eloRating + Math.floor(Math.random() * 8 + 4) : m.eloRating + Math.floor((Math.random() - 0.4) * 6),
          matchesPlayed: m.matchesPlayed + 1,
        }))
      );
      setIsJudging(false);
    }, 800);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-indigo-500/5 border-indigo-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Swords className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              GenAI Model Evaluation Arena & ELO Leaderboard
              <Badge variant="outline" className="text-[10px] border-indigo-500/30 text-indigo-500 bg-indigo-500/10">
                LLM-as-a-Judge
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Automated pairwise blind evaluation benchmarking synthetic data fidelity across top foundation models.
            </p>
          </div>
        </div>

        <Button
          onClick={handleRunNewBattle}
          disabled={isJudging}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
        >
          {isJudging ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Flame className="size-3.5 mr-1.5" />}
          {isJudging ? 'Evaluating Battle with Judge...' : 'Trigger Arena Battle'}
        </Button>
      </div>

      {/* ELO Leaderboard Matrix */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider flex items-center gap-1.5">
            <Trophy className="size-3.5 text-amber-400" />
            Live Synthetic Generation ELO Rankings
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">Bradley-Terry Statistical Model</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {leaderboard.map((model, idx) => (
            <div
              key={model.name}
              className={`p-3 rounded-xl border space-y-1.5 ${
                idx === 0
                  ? 'bg-indigo-500/10 border-indigo-500/40 shadow-sm'
                  : 'bg-muted/30 border-border/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground truncate">{model.name}</span>
                <Badge variant="outline" className="text-[9px] font-mono">
                  #{idx + 1}
                </Badge>
              </div>
              <div className="text-xl font-mono font-bold text-indigo-400 flex items-baseline gap-1">
                {model.eloRating} <span className="text-[10px] text-muted-foreground font-normal">ELO</span>
              </div>
              <div className="text-[10px] text-muted-foreground flex justify-between">
                <span>{model.winRatePct}% Win Rate</span>
                <span>{model.matchesPlayed} Battles</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side Arena Battle Inspection */}
      <div className="p-4 bg-background/90 rounded-2xl border border-border/60 space-y-4 shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-2">
          <span className="text-xs font-bold text-foreground">
            Target Prompt: &ldquo;{currentBattle.prompt}&rdquo;
          </span>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] font-mono self-start sm:self-auto">
            WINNER: {currentBattle.judgeVerdict.toUpperCase()} ({currentBattle.modelA.name})
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Model A Output */}
          <div className="p-3.5 bg-indigo-500/5 border border-indigo-500/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="size-3.5" />
                Model A: {currentBattle.modelA.name}
              </span>
              <Badge className="bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">
                {currentBattle.modelA.score}/10
              </Badge>
            </div>
            <pre className="text-[11px] font-mono text-foreground/90 bg-background/80 p-2.5 rounded-lg border border-border/40 overflow-x-auto leading-relaxed">
              {currentBattle.modelA.output}
            </pre>
          </div>

          {/* Model B Output */}
          <div className="p-3.5 bg-muted/20 border border-border/40 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                Model B: {currentBattle.modelB.name}
              </span>
              <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground">
                {currentBattle.modelB.score}/10
              </Badge>
            </div>
            <pre className="text-[11px] font-mono text-muted-foreground bg-background/80 p-2.5 rounded-lg border border-border/40 overflow-x-auto leading-relaxed">
              {currentBattle.modelB.output}
            </pre>
          </div>
        </div>

        {/* LLM Judge Reasoning Panel */}
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <Scale className="size-4 text-indigo-400" />
            <span>LLM-as-a-Judge Automated Verdict Analysis</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {currentBattle.judgeReasoning}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
            {currentBattle.criteria.map((c) => (
              <div key={c.name} className="p-2 bg-background rounded-lg border border-border/40 flex justify-between">
                <span className="text-muted-foreground">{c.name}:</span>
                <span className="font-bold text-indigo-400">{c.scoreA} vs {c.scoreB}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
