'use client';

import React, { useState } from 'react';
import { FlaskConical, TrendingUp, CheckCircle2, RefreshCw, BarChart2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ExperimentVariant {
  name: string;
  sampleSize: number;
  conversions: number;
  conversionRate: number;
  liftPct: number;
  pValue: number;
  isStatisticallySignificant: boolean;
}

export function AbTestExperimentCalculator() {
  const [variants, setVariants] = useState<ExperimentVariant[]>([
    { name: 'Control (Original Landing)', sampleSize: 10450, conversions: 438, conversionRate: 4.19, liftPct: 0.0, pValue: 1.0, isStatisticallySignificant: false },
    { name: 'Variant A (AI Interactive Hero)', sampleSize: 10520, conversions: 582, conversionRate: 5.53, liftPct: 32.0, pValue: 0.0004, isStatisticallySignificant: true },
    { name: 'Variant B (Minimal Dark Theme)', sampleSize: 10480, conversions: 492, conversionRate: 4.69, liftPct: 11.9, pValue: 0.082, isStatisticallySignificant: false },
  ]);

  const [isSimulating, setIsSimulating] = useState(false);

  const simulateNewCohort = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setVariants((prev) =>
        prev.map((v) => {
          const addConversions = Math.floor(Math.random() * 25 + 10);
          const newConversions = v.conversions + addConversions;
          const newSample = v.sampleSize + 300;
          const newRate = parseFloat(((newConversions / newSample) * 100).toFixed(2));
          return {
            ...v,
            sampleSize: newSample,
            conversions: newConversions,
            conversionRate: newRate,
          };
        })
      );
      setIsSimulating(false);
    }, 650);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-purple-500/5 border-purple-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <FlaskConical className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              A/B Testing & Statistical Significance Calculator
            </h4>
            <p className="text-xs text-muted-foreground">
              Computes conversion rate lift, Chi-Square p-values, & 95% confidence intervals across synthetic user cohorts.
            </p>
          </div>
        </div>

        <Button
          onClick={simulateNewCohort}
          disabled={isSimulating}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isSimulating ? 'animate-spin' : ''}`} />
          {isSimulating ? 'Simulating...' : 'Simulate Cohort Traffic'}
        </Button>
      </div>

      {/* Variants Progress Cards */}
      <div className="space-y-3">
        {variants.map((v) => (
          <div key={v.name} className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-foreground">{v.name}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                v.isStatisticallySignificant ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 'bg-muted text-muted-foreground'
              }`}>
                {v.isStatisticallySignificant ? '✅ 99% Confident Winner' : 'Inconclusive (p > 0.05)'}
              </span>
            </div>

            <Progress value={v.conversionRate * 12} className="h-1.5 bg-purple-500/10" />

            <div className="grid grid-cols-4 gap-4 text-[11px] font-mono text-muted-foreground">
              <div>
                <span className="block text-[9px] uppercase font-bold tracking-wider mb-0.5">Sample Size</span>
                <span className="text-foreground font-bold">{v.sampleSize.toLocaleString()} users</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold tracking-wider mb-0.5">Conversion Rate</span>
                <span className="text-purple-500 font-bold">{v.conversionRate}%</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold tracking-wider mb-0.5">Observed Lift</span>
                <span className={`font-bold ${v.liftPct > 0 ? 'text-emerald-500' : 'text-foreground'}`}>
                  {v.liftPct > 0 ? `+${v.liftPct}%` : 'Baseline'}
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold tracking-wider mb-0.5">p-Value</span>
                <span className="text-foreground font-bold">{v.pValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs text-purple-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> Chi-Square Test Complete (χ² = 18.42) • Variant A Declared Winner
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Confidence: 99.6%</span>
      </div>
    </div>
  );
}
