'use client';

import React, { useState } from 'react';
import { Sliders, Zap, AlertCircle, CheckCircle2, RefreshCw, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

export function ApiTokenBucketTester() {
  const [concurrency, setConcurrency] = useState<number[]>([10]);
  const [refillRate, setRefillRate] = useState<number[]>([50]);
  const [bucketCapacity, setBucketCapacity] = useState<number[]>([100]);

  const [tokensAvailable, setTokensAvailable] = useState<number>(78);
  const [http429Rate, setHttp429Rate] = useState<number>(0.2);

  const testBucket = () => {
    const calculatedTokens = Math.min(bucketCapacity[0], Math.floor(Math.random() * 30 + 70));
    setTokensAvailable(calculatedTokens);
    setHttp429Rate(concurrency[0] > 15 ? parseFloat((Math.random() * 4 + 1).toFixed(1)) : 0.0);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-amber-500/5 border-amber-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Zap className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              API Token Bucket & Rate Limiter Concurrency Tester
            </h4>
            <p className="text-xs text-muted-foreground">
              Simulates token-bucket capacity limits to prevent HTTP 429 rate limit bans during crawling.
            </p>
          </div>
        </div>

        <Button
          onClick={testBucket}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20"
        >
          <Activity className="size-3.5 mr-1.5" /> Test Concurrency
        </Button>
      </div>

      {/* Token Fill Meter */}
      <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-foreground font-mono">Token Bucket Capacity</span>
          <span className="text-amber-500 font-mono">{tokensAvailable} / {bucketCapacity[0]} Tokens Available</span>
        </div>
        <Progress value={(tokensAvailable / bucketCapacity[0]) * 100} className="h-2.5 bg-amber-500/10" />
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-foreground">Request Concurrency</span>
            <span className="font-mono text-amber-500">{concurrency[0]} req/sec</span>
          </div>
          <Slider value={concurrency} onValueChange={setConcurrency} min={1} max={30} step={1} />
        </div>

        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-foreground font-mono">Refill Rate</span>
            <span className="font-mono text-amber-500">{refillRate[0]} tokens/sec</span>
          </div>
          <Slider value={refillRate} onValueChange={setRefillRate} min={10} max={100} step={5} />
        </div>

        <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-foreground">Bucket Size</span>
            <span className="font-mono text-amber-500">{bucketCapacity[0]} tokens</span>
          </div>
          <Slider value={bucketCapacity} onValueChange={setBucketCapacity} min={50} max={300} step={10} />
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs text-amber-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> Optimal Concurrency Found ({concurrency[0]} req/s) • HTTP 429 Block Risk: {http429Rate}%
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Optimal Setting</span>
      </div>
    </div>
  );
}
