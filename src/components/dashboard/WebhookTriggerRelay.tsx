'use client';

import React, { useState } from 'react';
import { Radio, Zap, ShieldCheck, Play, RefreshCw, CheckCircle2, ArrowRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WebhookEndpoint {
  id: string;
  source: string;
  targetPipeline: string;
  eventTrigger: string;
  hmacVerified: boolean;
  status: 'Active' | 'Delivering' | 'Idle';
  lastFired: string;
  deliveriesCount: number;
}

export function WebhookTriggerRelay() {
  const [endpoints, setEndpoints] = useState<WebhookEndpoint[]>([
    { id: '1', source: 'Stripe (stripe.webhook)', targetPipeline: 'E-Commerce Order Synthesizer', eventTrigger: 'payment_intent.succeeded', hmacVerified: true, status: 'Active', lastFired: '2 mins ago', deliveriesCount: 1420 },
    { id: '2', source: 'Shopify Store (webhook)', targetPipeline: 'Competitor Price Tracker', eventTrigger: 'products/update', hmacVerified: true, status: 'Active', lastFired: '8 mins ago', deliveriesCount: 890 },
    { id: '3', source: 'GitHub Actions (CI/CD)', targetPipeline: 'Synthetic Model Training Worker', eventTrigger: 'workflow_run.completed', hmacVerified: true, status: 'Idle', lastFired: '1 hour ago', deliveriesCount: 310 },
  ]);

  const [isFiring, setIsFiring] = useState(false);

  const simulateWebhookTrigger = () => {
    setIsFiring(true);
    setTimeout(() => {
      setEndpoints((prev) => [
        {
          id: Date.now().toString(),
          source: 'AWS EventBridge (Bus)',
          targetPipeline: 'Supply Chain Telemetry Generator',
          eventTrigger: 'container.arrival.logged',
          hmacVerified: true,
          status: 'Active',
          lastFired: 'Just now',
          deliveriesCount: 1,
        },
        ...prev.slice(0, 2),
      ]);
      setIsFiring(false);
    }, 650);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-amber-500/5 border-amber-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Radio className="size-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              AI Webhook Relay & Dynamic Trigger Hub
            </h4>
            <p className="text-xs text-muted-foreground">
              Triggers Crawl4AI scraping and dataset synthesis pipelines from external HTTP webhook events.
            </p>
          </div>
        </div>

        <Button
          onClick={simulateWebhookTrigger}
          disabled={isFiring}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20"
        >
          <Zap className={`size-3.5 mr-1.5 ${isFiring ? 'animate-bounce' : ''}`} />
          {isFiring ? 'Relaying Event...' : 'Simulate Webhook Trigger'}
        </Button>
      </div>

      {/* Endpoints Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Webhook Ingest Source</th>
              <th className="p-3">Event Topic</th>
              <th className="p-3">Triggered Pipeline Target</th>
              <th className="p-3">HMAC SHA-256</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {endpoints.map((ep) => (
              <tr key={ep.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="font-sans font-bold text-foreground">{ep.source}</div>
                  <div className="text-[10px] text-muted-foreground">{ep.deliveriesCount.toLocaleString()} events handled</div>
                </td>
                <td className="p-3 font-bold text-amber-500">{ep.eventTrigger}</td>
                <td className="p-3 text-foreground font-medium flex items-center gap-1.5">
                  <ArrowRight className="size-3 text-muted-foreground" /> {ep.targetPipeline}
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center gap-1 w-fit">
                    <ShieldCheck className="size-3" /> Signed
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-muted text-muted-foreground border border-border/40">
                    {ep.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs text-amber-500 font-semibold">
        <span className="flex items-center gap-2">
          <Lock className="size-4" /> Zero-Trust Webhook Ingest Active • 100% HMAC-SHA256 Signature Verification
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Queue Latency: 4ms</span>
      </div>
    </div>
  );
}
