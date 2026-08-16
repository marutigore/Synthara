'use client';

import React from 'react';
import { Leaf, Factory, Zap, CheckCircle2, TrendingDown, Droplets } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface EmissionScope {
  scope: 'Scope 1 (Direct)' | 'Scope 2 (Energy)' | 'Scope 3 (Value Chain)';
  tCO2e: number;
  target: number;
  reduction: number;
  source: string;
}

export function EsgSustainabilityTracker() {
  const emissions: EmissionScope[] = [
    { scope: 'Scope 1 (Direct)', tCO2e: 1240, target: 1000, reduction: 18, source: 'On-site Natural Gas & Fleet Vehicles' },
    { scope: 'Scope 2 (Energy)', tCO2e: 3890, target: 3200, reduction: 24, source: 'Purchased Electricity (Grid + Solar PPA)' },
    { scope: 'Scope 3 (Value Chain)', tCO2e: 12450, target: 10000, reduction: 12, source: 'Upstream Suppliers, Business Travel, Cloud Computing' },
  ];

  const totalEmissions = emissions.reduce((sum, e) => sum + e.tCO2e, 0);
  const renewablePercent = 62;
  const esgScore = 78;

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-green-500/5 border-green-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20">
            <Leaf className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              ESG & Carbon Footprint Sustainability Metrics
            </h4>
            <p className="text-xs text-muted-foreground">
              Scope 1-3 GHG emissions tracking, renewable energy usage, and ESG compliance scoring for SEC / EU CSRD disclosures.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-500/15 text-green-500 border border-green-500/30 flex items-center gap-1.5">
          <CheckCircle2 className="size-3" /> ESG Grade: B+ ({esgScore}/100)
        </span>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1"><Factory className="size-3" /> Total GHG Emissions</span>
          <p className="font-mono text-lg font-bold text-foreground">{totalEmissions.toLocaleString()} <span className="text-xs text-muted-foreground">tCO2e</span></p>
        </div>
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1"><Zap className="size-3" /> Renewable Energy Mix</span>
          <p className="font-mono text-lg font-bold text-green-500">{renewablePercent}% <span className="text-xs text-muted-foreground">Solar + Wind</span></p>
        </div>
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1"><Droplets className="size-3" /> Water Intensity</span>
          <p className="font-mono text-lg font-bold text-blue-500">2.4 <span className="text-xs text-muted-foreground">m³ / $M revenue</span></p>
        </div>
      </div>

      {/* Scope Emissions Breakdown */}
      <div className="space-y-3">
        {emissions.map((e) => (
          <div key={e.scope} className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-foreground">{e.scope}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-muted-foreground">{e.tCO2e.toLocaleString()} tCO2e</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-500/20 text-green-500 flex items-center gap-1">
                  <TrendingDown className="size-3" /> -{e.reduction}% YoY
                </span>
              </div>
            </div>
            <Progress value={(e.tCO2e / e.target) * 80} className="h-1.5 bg-green-500/10" />
            <div className="text-[10px] text-muted-foreground font-mono">
              Source: {e.source} • Target: {e.target.toLocaleString()} tCO2e by 2027
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-between text-xs text-green-500 font-semibold">
        <span className="flex items-center gap-2">
          <Leaf className="size-4" /> Science Based Targets Initiative (SBTi) Aligned • Net-Zero Target: 2040
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">EU CSRD Compliant</span>
      </div>
    </div>
  );
}
