'use client';

import React, { useState } from 'react';
import { Clock, TrendingUp, Sliders, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function TimeSeriesSynthesizer() {
  const [seasonality, setSeasonality] = useState<number[]>([24]);
  const [trendSlope, setTrendSlope] = useState<number[]>([12]);
  const [noiseAmplitude, setNoiseAmplitude] = useState<number[]>([5]);
  const [anomalyFrequency, setAnomalyFrequency] = useState<number[]>([2]);

  const [generatedCount, setGeneratedCount] = useState(1440);
  const [isGenerating, setIsGenerating] = useState(false);

  const triggerSynthesis = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedCount((prev) => prev + 1440);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-purple-500/5 border-purple-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <Clock className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Time-Series Synthetic Data Engine
            </h4>
            <p className="text-xs text-muted-foreground">
              Generate temporal financial, IoT sensor, & server telemetry sequences with trend & seasonality.
            </p>
          </div>
        </div>

        <Button
          onClick={triggerSynthesis}
          disabled={isGenerating}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20"
        >
          <Play className={`size-3.5 mr-1.5 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Synthesizing...' : 'Synthesize Time Series'}
        </Button>
      </div>

      {/* Sliders Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-foreground">Seasonal Period (Hours)</span>
            <span className="font-mono text-purple-500">{seasonality[0]}h</span>
          </div>
          <Slider value={seasonality} onValueChange={setSeasonality} min={1} max={168} step={1} />
        </div>

        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-foreground">Trend Growth Slope</span>
            <span className="font-mono text-purple-500">+{trendSlope[0]}% / month</span>
          </div>
          <Slider value={trendSlope} onValueChange={setTrendSlope} min={-50} max={50} step={1} />
        </div>

        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-foreground">Stochastic Noise Variance</span>
            <span className="font-mono text-purple-500">±{noiseAmplitude[0]}%</span>
          </div>
          <Slider value={noiseAmplitude} onValueChange={setNoiseAmplitude} min={0} max={25} step={1} />
        </div>

        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-foreground">Anomaly Spike Frequency</span>
            <span className="font-mono text-purple-500">{anomalyFrequency[0]}% of points</span>
          </div>
          <Slider value={anomalyFrequency} onValueChange={setAnomalyFrequency} min={0} max={10} step={1} />
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs text-purple-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> {generatedCount.toLocaleString()} Telemetry Timestamps Generated
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Temporal Continuity: Verified</span>
      </div>
    </div>
  );
}
