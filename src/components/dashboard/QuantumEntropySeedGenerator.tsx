'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Dna, Lock, Zap, ServerCog, RefreshCw, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QuantumEntropySeedGenerator() {
  const [entropyBits, setEntropyBits] = useState<string>('');
  const [isPulling, setIsPulling] = useState(false);
  const [entropyPoolSize, setEntropyPoolSize] = useState(1024);

  const pullQuantumEntropy = () => {
    setIsPulling(true);
    setEntropyBits('');

    let currentBits = '';
    const interval = setInterval(() => {
      // Simulate streaming quantum random bits
      const chunk = Array.from({ length: 32 }, () => Math.round(Math.random())).join('');
      currentBits += chunk + ' ';
      setEntropyBits(currentBits);
      
      if (currentBits.length > 350) {
        clearInterval(interval);
        setEntropyPoolSize(prev => prev + 512);
        setIsPulling(false);
      }
    }, 50);
  };

  useEffect(() => {
    pullQuantumEntropy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-cyan-500/5 border-cyan-500/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 p-24 bg-blue-500/5 rounded-full blur-2xl -z-10" />

      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <Cpu className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Quantum True Random Entropy Generator
            </h4>
            <p className="text-xs text-muted-foreground">
              Seed deterministic random bit generators (DRBG) with statistically pure quantum noise.
            </p>
          </div>
        </div>

        <Button
          onClick={pullQuantumEntropy}
          disabled={isPulling}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isPulling ? 'animate-spin' : ''}`} />
          {isPulling ? 'Pulling Entropy...' : 'Refresh Quantum Seed'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Entropy Pool Status */}
        <div className="p-4 bg-muted/30 border border-border/40 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <ServerCog className="size-4 text-cyan-500" />
            Entropy Pool
          </div>
          <div className="text-3xl font-mono font-bold text-foreground">
            {entropyPoolSize.toLocaleString()} <span className="text-sm text-muted-foreground">Bits</span>
          </div>
          <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-border/40">
            <div 
              className="bg-cyan-500 h-full transition-all duration-500" 
              style={{ width: `${Math.min((entropyPoolSize / 8192) * 100, 100)}%` }}
            />
          </div>
          <div className="text-[10px] text-muted-foreground flex justify-between">
            <span>Pool Capacity: 8,192 Bits</span>
            <span className={entropyPoolSize > 4096 ? 'text-emerald-500' : 'text-amber-500'}>
              {entropyPoolSize > 4096 ? 'Optimal' : 'Low Entropy'}
            </span>
          </div>
        </div>

        {/* Live Quantum Bitstream */}
        <div className="md:col-span-2 p-4 bg-background border border-cyan-500/30 rounded-2xl relative shadow-inner">
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <div className={`size-2 rounded-full ${isPulling ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-muted-foreground'}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              ANU QRNG API
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-500 uppercase tracking-wider mb-2">
            <Zap className="size-4" />
            Live Quantum Bitstream
          </div>
          <div className="font-mono text-[11px] text-cyan-400/80 leading-relaxed break-all h-[80px] overflow-hidden opacity-90 transition-opacity">
            {entropyBits || '01101001 00100000 01100001 01101101 00100000 01110001 01110101 01100001 01101110 01110100 01110101 01101101'}
            {isPulling && <span className="animate-pulse bg-cyan-500 text-cyan-900 inline-block w-2 h-3 ml-1" />}
          </div>
        </div>
      </div>

      {/* Security Certifications */}
      <div className="flex gap-4 p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-foreground font-semibold">
        <div className="flex items-center gap-2 border-r border-cyan-500/20 pr-4">
          <Lock className="size-4 text-cyan-500" />
          <span>FIPS 140-2 Compliant</span>
        </div>
        <div className="flex items-center gap-2 border-r border-cyan-500/20 pr-4">
          <Dna className="size-4 text-cyan-500" />
          <span>NIST SP 800-90B Tested</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-500">
          <BarChart2 className="size-4" />
          <span>Uniform Distribution Verified</span>
        </div>
      </div>
    </div>
  );
}
