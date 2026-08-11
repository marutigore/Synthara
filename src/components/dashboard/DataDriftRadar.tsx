'use client';

import React from 'react';
import { Activity, AlertCircle, CheckCircle2, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface FeatureDrift {
  featureName: string;
  psiScore: number; // Population Stability Index
  wassersteinDistance: number;
  status: 'Stable' | 'Moderate Shift' | 'Critical Drift';
}

export function DataDriftRadar() {
  const drifts: FeatureDrift[] = [
    { featureName: 'annual_revenue', psiScore: 0.042, wassersteinDistance: 0.12, status: 'Stable' },
    { featureName: 'user_age_distribution', psiScore: 0.088, wassersteinDistance: 0.24, status: 'Stable' },
    { featureName: 'purchase_frequency', psiScore: 0.215, wassersteinDistance: 0.68, status: 'Moderate Shift' },
    { featureName: 'churn_probability', psiScore: 0.385, wassersteinDistance: 1.14, status: 'Critical Drift' },
  ];

  const overallPSI = (
    drifts.reduce((acc, d) => acc + d.psiScore, 0) / drifts.length
  ).toFixed(3);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-red-500/5 border-red-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
            <Activity className="size-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Real-Time Statistical Data Drift Radar
            </h4>
            <p className="text-xs text-muted-foreground">
              Monitors Population Stability Index (PSI) & Wasserstein distance across dataset batches.
            </p>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-red-500/15 text-red-500 border border-red-500/30 flex items-center gap-1.5">
          <TrendingUp className="size-3" /> Average PSI: {overallPSI}
        </div>
      </div>

      {/* Drift Features Grid */}
      <div className="space-y-3">
        {drifts.map((d) => {
          const psiPct = Math.min(Math.round(d.psiScore * 200), 100);
          return (
            <div key={d.featureName} className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-foreground font-mono">{d.featureName}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-[10px] font-mono">PSI: {d.psiScore}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      d.status === 'Stable'
                        ? 'bg-emerald-500/20 text-emerald-500'
                        : d.status === 'Moderate Shift'
                        ? 'bg-amber-500/20 text-amber-500'
                        : 'bg-red-500/20 text-red-500 animate-pulse'
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
              </div>

              <Progress
                value={psiPct}
                className={`h-2 ${
                  d.status === 'Stable'
                    ? 'bg-emerald-500/10'
                    : d.status === 'Moderate Shift'
                    ? 'bg-amber-500/10'
                    : 'bg-red-500/10'
                }`}
              />

              <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono">
                <span>Wasserstein Distance: {d.wassersteinDistance}</span>
                <span>Threshold: PSI &lt; 0.25</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between text-xs text-red-500 font-semibold">
        <span className="flex items-center gap-2">
          <ShieldAlert className="size-4" /> 1 Feature Exceeds Safety Threshold (churn_probability)
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Action Required: Re-align Schema</span>
      </div>
    </div>
  );
}
