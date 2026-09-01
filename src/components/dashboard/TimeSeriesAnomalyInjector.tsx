'use client';

import React, { useState } from 'react';
import { Activity, AlertTriangle, Play, RefreshCw, Sliders, CheckCircle2, TrendingUp, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DataPoint {
  time: string;
  vibration: number;
  temperature: number;
  voltage: number;
  isAnomaly: boolean;
  anomalyType?: string;
}

export function TimeSeriesAnomalyInjector() {
  const [anomalyMode, setAnomalyMode] = useState<'spike' | 'contextual' | 'drift'>('spike');
  const [anomalyRate, setAnomalyRate] = useState<number>(5); // 5%
  const [isInjecting, setIsInjecting] = useState(false);

  const [points, setPoints] = useState<DataPoint[]>([
    { time: '11:45:00', vibration: 42, temperature: 65, voltage: 230, isAnomaly: false },
    { time: '11:45:05', vibration: 44, temperature: 66, voltage: 229, isAnomaly: false },
    { time: '11:45:10', vibration: 43, temperature: 65, voltage: 231, isAnomaly: false },
    { time: '11:45:15', vibration: 98, temperature: 92, voltage: 180, isAnomaly: true, anomalyType: 'Thermal Point Spike' },
    { time: '11:45:20', vibration: 45, temperature: 67, voltage: 230, isAnomaly: false },
    { time: '11:45:25', vibration: 42, temperature: 66, voltage: 230, isAnomaly: false },
    { time: '11:45:30', vibration: 43, temperature: 65, voltage: 229, isAnomaly: false },
    { time: '11:45:35', vibration: 88, temperature: 89, voltage: 195, isAnomaly: true, anomalyType: 'Voltage Sag' },
    { time: '11:45:40', vibration: 44, temperature: 66, voltage: 230, isAnomaly: false },
  ]);

  const handleInject = () => {
    setIsInjecting(true);
    setTimeout(() => {
      const newPoints: DataPoint[] = Array.from({ length: 9 }).map((_, i) => {
        const isAnom = Math.random() < anomalyRate / 100;
        const vib = isAnom ? Math.floor(Math.random() * 50 + 80) : Math.floor(Math.random() * 8 + 40);
        const temp = isAnom ? Math.floor(Math.random() * 30 + 85) : Math.floor(Math.random() * 4 + 64);
        const volt = isAnom ? Math.floor(Math.random() * 40 + 175) : Math.floor(Math.random() * 4 + 228);
        return {
          time: `11:46:0${i * 5}`,
          vibration: vib,
          temperature: temp,
          voltage: volt,
          isAnomaly: isAnom,
          anomalyType: isAnom ? (anomalyMode === 'spike' ? 'Sudden Transient Spike' : 'Contextual Thermal Shift') : undefined,
        };
      });

      // Ensure at least one anomaly exists
      if (!newPoints.some((p) => p.isAnomaly)) {
        newPoints[3] = {
          time: '11:46:15',
          vibration: 96,
          temperature: 94,
          voltage: 175,
          isAnomaly: true,
          anomalyType: 'Forced Peak Anomaly',
        };
      }

      setPoints(newPoints);
      setIsInjecting(false);
    }, 600);
  };

  const anomalyCount = points.filter((p) => p.isAnomaly).length;

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-rose-500/5 border-rose-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <Activity className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Multivariate Time-Series Anomaly Injector
              <Badge variant="outline" className="text-[10px] border-rose-500/30 text-rose-500 bg-rose-500/10">
                IoT / Predictive Maintenance
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Synthesize high-frequency sensor streams with controllable point, contextual, and collective anomalies.
            </p>
          </div>
        </div>

        <Button
          onClick={handleInject}
          disabled={isInjecting}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20"
        >
          {isInjecting ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Play className="size-3.5 mr-1.5" />}
          {isInjecting ? 'Synthesizing Waveforms...' : 'Inject Anomalies'}
        </Button>
      </div>

      {/* SVG Multi-Line Sensor Visualizer */}
      <div className="p-4 bg-background/90 rounded-2xl border border-border/60 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="font-bold text-foreground">Sensor Telemetry Channels</span>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1 text-blue-400">
                <span className="size-2 rounded-full bg-blue-400" /> Vibration (Hz)
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="size-2 rounded-full bg-amber-400" /> Temp (°C)
              </span>
            </div>
          </div>
          <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30 text-[10px] font-mono">
            {anomalyCount} Anomalies Tagged
          </Badge>
        </div>

        {/* Multi-point Grid Render */}
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 pt-2">
          {points.map((p, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl border text-center font-mono space-y-1 transition-all ${
                p.isAnomaly
                  ? 'bg-rose-500/15 border-rose-500 shadow-sm shadow-rose-500/20'
                  : 'bg-muted/30 border-border/40'
              }`}
            >
              <div className="text-[9px] text-muted-foreground">{p.time.substring(3)}</div>
              <div className="text-xs font-bold text-blue-400">{p.vibration}Hz</div>
              <div className="text-xs font-bold text-amber-400">{p.temperature}°C</div>
              {p.isAnomaly && (
                <div className="text-[8px] font-bold text-rose-400 bg-rose-500/20 px-1 py-0.5 rounded truncate">
                  ANOMALY
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls & Injection Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Anomaly Pattern Preset
          </span>
          <div className="flex gap-1.5">
            {(['spike', 'contextual', 'drift'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setAnomalyMode(mode)}
                className={`flex-1 py-1 text-xs font-mono font-bold capitalize rounded-lg transition-colors ${
                  anomalyMode === mode
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-background text-muted-foreground hover:text-foreground border border-border/60'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Contamination Rate: {anomalyRate}%
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">Target Outlier Density</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            step="1"
            value={anomalyRate}
            onChange={(e) => setAnomalyRate(parseInt(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
