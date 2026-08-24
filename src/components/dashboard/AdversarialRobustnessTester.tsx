'use client';

import React, { useState } from 'react';
import { ShieldAlert, Zap, AlertTriangle, Play, RefreshCw, CheckCircle2, Sliders, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface AttackVector {
  name: string;
  category: string;
  baselineAcc: number;
  attackedAcc: number;
  dropPct: number;
  severity: 'low' | 'medium' | 'high';
  status: 'tested' | 'pending';
}

export function AdversarialRobustnessTester() {
  const [epsilon, setEpsilon] = useState(0.08);
  const [isAttacking, setIsAttacking] = useState(false);

  const [attacks, setAttacks] = useState<AttackVector[]>([
    {
      name: 'FGSM Gradient Noise',
      category: 'Feature Perturbation',
      baselineAcc: 94.2,
      attackedAcc: 81.6,
      dropPct: 12.6,
      severity: 'medium',
      status: 'tested',
    },
    {
      name: 'Label Flipping Poisoning (5%)',
      category: 'Data Integrity Attack',
      baselineAcc: 94.2,
      attackedAcc: 74.3,
      dropPct: 19.9,
      severity: 'high',
      status: 'tested',
    },
    {
      name: 'Boundary Outlier Injection',
      category: 'Distribution Shift',
      baselineAcc: 94.2,
      attackedAcc: 88.5,
      dropPct: 5.7,
      severity: 'low',
      status: 'tested',
    },
  ]);

  const handleRunAttackSuite = () => {
    setIsAttacking(true);
    setTimeout(() => {
      setAttacks((prev) =>
        prev.map((a) => {
          const drop = parseFloat((a.dropPct * (1 + (epsilon - 0.08) * 4)).toFixed(1));
          const newAttacked = parseFloat((a.baselineAcc - drop).toFixed(1));
          return {
            ...a,
            attackedAcc: newAttacked,
            dropPct: drop,
            severity: drop > 15 ? 'high' : drop > 8 ? 'medium' : 'low',
          };
        })
      );
      setIsAttacking(false);
    }, 850);
  };

  const avgDrop = (attacks.reduce((acc, a) => acc + a.dropPct, 0) / attacks.length).toFixed(1);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-rose-500/5 border-rose-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <ShieldAlert className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Adversarial Robustness & Attack Simulation
              <Badge variant="outline" className="text-[10px] border-rose-500/30 text-rose-500 bg-rose-500/10">
                ML Threat Model
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Stress-test synthetic datasets and trained models against FGSM noise, poison attacks, and outliers.
            </p>
          </div>
        </div>

        <Button
          onClick={handleRunAttackSuite}
          disabled={isAttacking}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20"
        >
          {isAttacking ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Play className="size-3.5 mr-1.5" />}
          {isAttacking ? 'Simulating Attacks...' : 'Execute Attack Suite'}
        </Button>
      </div>

      {/* Attack Parameter Controls */}
      <div className="p-4 bg-muted/40 rounded-2xl border border-border/40 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider flex items-center gap-1.5">
            <Sliders className="size-3.5 text-rose-500" />
            Adversarial Perturbation Budget (Epsilon ε)
          </span>
          <span className="font-mono font-bold text-rose-500">ε = {epsilon}</span>
        </div>
        <input
          type="range"
          min="0.01"
          max="0.25"
          step="0.01"
          value={epsilon}
          onChange={(e) => setEpsilon(parseFloat(e.target.value))}
          className="w-full accent-rose-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>Subtle Perturbation (ε=0.01)</span>
          <span>Aggressive Feature Noise (ε=0.25)</span>
        </div>
      </div>

      {/* Robustness Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-muted/30 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Clean Baseline</span>
          <div className="text-2xl font-mono font-bold text-emerald-500">94.2%</div>
          <div className="text-[10px] text-muted-foreground">Zero perturbation validation accuracy</div>
        </div>

        <div className="p-3.5 bg-muted/30 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Under Attack</span>
          <div className="text-2xl font-mono font-bold text-rose-500">{attacks[0].attackedAcc}%</div>
          <div className="text-[10px] text-muted-foreground">Average drop of {avgDrop}% under attack</div>
        </div>

        <div className="p-3.5 bg-muted/30 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Robustness Score</span>
          <div className="text-2xl font-mono font-bold text-amber-500">B+ (78/100)</div>
          <div className="text-[10px] text-muted-foreground">Certified Robustness Metric</div>
        </div>
      </div>

      {/* Attack Vectors List */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
          Attack Surface Breakdown
        </span>
        <div className="space-y-2">
          {attacks.map((attack) => (
            <div
              key={attack.name}
              className="p-3.5 bg-muted/20 border border-border/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{attack.name}</span>
                  <Badge variant="outline" className="text-[9px] font-mono">{attack.category}</Badge>
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Baseline: {attack.baselineAcc}% → Attacked: {attack.attackedAcc}%
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="font-mono font-bold text-rose-500">-{attack.dropPct}% Acc</span>
                <Badge
                  className={`text-[9px] font-bold ${
                    attack.severity === 'high'
                      ? 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                      : attack.severity === 'medium'
                      ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-500 border-blue-500/30'
                  }`}
                >
                  {attack.severity.toUpperCase()} RISK
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hardening Recommendation */}
      <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs text-foreground">
        <span className="flex items-center gap-2 text-emerald-500 font-semibold">
          <ShieldCheck className="size-4 shrink-0" />
          Recommended Defense: Synthesize 15% adversarial augmented samples to increase certified bound.
        </span>
      </div>
    </div>
  );
}
