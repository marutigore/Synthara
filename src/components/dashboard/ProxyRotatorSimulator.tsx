'use client';

import React, { useState } from 'react';
import { Server, Globe2, ShieldCheck, RefreshCcw, Wifi, Activity, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProxyNode {
  id: string;
  ip: string;
  location: string;
  latencyMs: number;
  status: 'Active' | 'Rotating' | 'Cooldown';
  requestsPassed: number;
}

export function ProxyRotatorSimulator() {
  const [proxies, setProxies] = useState<ProxyNode[]>([
    { id: '1', ip: '192.168.45.12', location: '🇺🇸 US East (Virginia)', latencyMs: 18, status: 'Active', requestsPassed: 1420 },
    { id: '2', ip: '185.220.101.5', location: '🇩🇪 EU Central (Frankfurt)', latencyMs: 42, status: 'Active', requestsPassed: 890 },
    { id: '3', ip: '103.21.244.18', location: '🇯🇵 APAC East (Tokyo)', latencyMs: 65, status: 'Rotating', requestsPassed: 610 },
    { id: '4', ip: '45.33.32.156', location: '🇬🇧 EU West (London)', latencyMs: 24, status: 'Active', requestsPassed: 1105 },
  ]);

  const rotateAllProxies = () => {
    setProxies((prev) =>
      prev.map((p) => ({
        ...p,
        latencyMs: Math.floor(Math.random() * 40) + 15,
        status: Math.random() > 0.3 ? 'Active' : 'Rotating',
      }))
    );
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-cyan-500/5 border-cyan-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <Globe2 className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Crawl4AI Scraper Network & Proxy Rotator
            </h4>
            <p className="text-xs text-muted-foreground">
              Monitors anti-bot IP pool rotation, geo-location node health, and request latency.
            </p>
          </div>
        </div>

        <Button
          onClick={rotateAllProxies}
          size="sm"
          variant="outline"
          className="h-9 px-3 text-xs font-bold rounded-xl border-border/50"
        >
          <RefreshCcw className="size-3.5 mr-1.5" /> Rotate IP Pool
        </Button>
      </div>

      {/* Proxy Pool Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {proxies.map((p) => (
          <div key={p.id} className="p-3.5 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-foreground">{p.location}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                  p.status === 'Active'
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : 'bg-cyan-500/20 text-cyan-500 animate-pulse'
                }`}
              >
                {p.status}
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground">
              <span>IP: {p.ip}</span>
              <span className="text-primary font-bold">{p.latencyMs}ms</span>
            </div>

            <div className="text-[10px] text-muted-foreground/80 font-mono pt-1 border-t border-border/20 flex justify-between">
              <span>Requests Handled: {p.requestsPassed.toLocaleString()}</span>
              <span className="text-emerald-500 font-bold">99.9% Success</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between text-xs text-cyan-500 font-semibold">
        <span className="flex items-center gap-2">
          <Wifi className="size-4" /> 4 Residential Proxy Nodes Healthy • Crawl4AI Engine Online
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Pool Health: 100%</span>
      </div>
    </div>
  );
}
