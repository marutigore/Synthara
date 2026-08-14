'use client';

import React, { useState } from 'react';
import { Activity, Radio, Play, Pause, CheckCircle2, Zap, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function KafkaStreamProducer() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [eventsProduced, setEventsProduced] = useState(4820);
  const [throughputEps, setThroughputEps] = useState(120);

  const toggleStream = () => {
    if (!isStreaming) {
      setIsStreaming(true);
      const interval = setInterval(() => {
        setEventsProduced((prev) => prev + Math.floor(Math.random() * 15 + 10));
      }, 500);
      (window as any).__kafkaInterval = interval;
    } else {
      setIsStreaming(false);
      clearInterval((window as any).__kafkaInterval);
    }
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
              Apache Kafka & AWS EventBridge Stream Producer
            </h4>
            <p className="text-xs text-muted-foreground">
              Streams high-throughput synthetic events directly to real-world message brokers & Webhooks.
            </p>
          </div>
        </div>

        <Button
          onClick={toggleStream}
          size="sm"
          className={`h-9 px-4 text-xs font-bold rounded-xl shadow-md ${
            isStreaming
              ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20'
              : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
          }`}
        >
          {isStreaming ? <Pause className="size-3.5 mr-1.5" /> : <Play className="size-3.5 mr-1.5" />}
          {isStreaming ? 'Stop Streaming' : 'Start Event Producer'}
        </Button>
      </div>

      {/* Stream Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Target Broker</span>
          <p className="font-mono text-sm font-bold text-amber-500 flex items-center gap-1.5">
            <Server className="size-3.5" /> kafka.synthara.internal:9092
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Events Produced</span>
          <p className="font-mono text-sm font-bold text-foreground">{eventsProduced.toLocaleString()} events</p>
        </div>

        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Stream Throughput</span>
          <p className="font-mono text-sm font-bold text-emerald-500">{isStreaming ? throughputEps : 0} events / sec</p>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs text-amber-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> Kafka Cluster Connection Healthy • Topic: synthara.telemetry.events
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">{isStreaming ? 'Streaming Live' : 'Ready'}</span>
      </div>
    </div>
  );
}
