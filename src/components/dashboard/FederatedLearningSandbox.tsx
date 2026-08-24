'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Share2, Play, RefreshCw, CheckCircle2, ShieldCheck, Activity, Layers, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface FederatedNode {
  id: string;
  name: string;
  category: 'Healthcare' | 'Financial' | 'Retail';
  localSamples: number;
  localLoss: number;
  localAccuracy: number;
  dpEpsilon: number;
  status: 'training' | 'synced' | 'idle';
}

export function FederatedLearningSandbox() {
  const [round, setRound] = useState(1);
  const [maxRounds] = useState(5);
  const [globalAccuracy, setGlobalAccuracy] = useState(74.2);
  const [globalLoss, setGlobalLoss] = useState(0.58);
  const [isTraining, setIsTraining] = useState(false);

  const [nodes, setNodes] = useState<FederatedNode[]>([
    {
      id: 'node-1',
      name: 'Mayo Clinic Private Shard',
      category: 'Healthcare',
      localSamples: 3200,
      localLoss: 0.54,
      localAccuracy: 76.5,
      dpEpsilon: 0.8,
      status: 'idle',
    },
    {
      id: 'node-2',
      name: 'JPMorgan Fraud Shard',
      category: 'Financial',
      localSamples: 4500,
      localLoss: 0.61,
      localAccuracy: 72.8,
      dpEpsilon: 1.2,
      status: 'idle',
    },
    {
      id: 'node-3',
      name: 'Amazon Purchase Shard',
      category: 'Retail',
      localSamples: 5100,
      localLoss: 0.59,
      localAccuracy: 73.4,
      dpEpsilon: 1.0,
      status: 'idle',
    },
  ]);

  const [roundHistory, setRoundHistory] = useState<Array<{ round: number; acc: number; loss: number }>>([
    { round: 1, acc: 74.2, loss: 0.58 },
  ]);

  const startFederatedRound = () => {
    if (round >= maxRounds) {
      setRound(1);
      setGlobalAccuracy(74.2);
      setGlobalLoss(0.58);
      setRoundHistory([{ round: 1, acc: 74.2, loss: 0.58 }]);
      return;
    }

    setIsTraining(true);
    setNodes((prev) => prev.map((n) => ({ ...n, status: 'training' })));

    setTimeout(() => {
      const nextRound = round + 1;
      const accDelta = parseFloat((Math.random() * 4 + 3).toFixed(1));
      const lossDelta = parseFloat((Math.random() * 0.08 + 0.04).toFixed(2));
      const newAcc = Math.min(96.8, parseFloat((globalAccuracy + accDelta).toFixed(1)));
      const newLoss = Math.max(0.12, parseFloat((globalLoss - lossDelta).toFixed(2)));

      setRound(nextRound);
      setGlobalAccuracy(newAcc);
      setGlobalLoss(newLoss);
      setRoundHistory((prev) => [...prev, { round: nextRound, acc: newAcc, loss: newLoss }]);

      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          status: 'synced',
          localAccuracy: parseFloat((n.localAccuracy + (Math.random() * 3 + 2)).toFixed(1)),
          localLoss: parseFloat((n.localLoss - 0.05).toFixed(2)),
        }))
      );
      setIsTraining(false);
    }, 1200);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-amber-500/5 border-amber-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Brain className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              On-Device Federated Learning Simulator
              <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-500 bg-amber-500/10">
                FedAvg + TF.js
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Simulate decentralized model training with differential privacy gradient aggregation.
            </p>
          </div>
        </div>

        <Button
          onClick={startFederatedRound}
          disabled={isTraining}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20"
        >
          {isTraining ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Play className="size-3.5 mr-1.5" />}
          {isTraining ? 'Aggregating FedAvg...' : round >= maxRounds ? 'Reset Training' : `Run Round ${round + 1}/${maxRounds}`}
        </Button>
      </div>

      {/* Global Model Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Federation Round</span>
          <div className="text-2xl font-mono font-bold text-foreground">
            {round} <span className="text-xs text-muted-foreground font-normal">/ {maxRounds}</span>
          </div>
          <Progress value={(round / maxRounds) * 100} className="h-1.5 bg-muted" />
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Global Accuracy</span>
          <div className="text-2xl font-mono font-bold text-emerald-500">{globalAccuracy}%</div>
          <div className="text-[10px] text-muted-foreground">Converging on distributed shards</div>
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Global Loss</span>
          <div className="text-2xl font-mono font-bold text-amber-500">{globalLoss}</div>
          <div className="text-[10px] text-muted-foreground">Cross-Entropy Loss</div>
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Privacy Guarantee</span>
          <div className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5 mt-1">
            <ShieldCheck className="size-4 text-emerald-500" />
            DP-SGD (ε=1.0)
          </div>
          <div className="text-[10px] text-muted-foreground">Zero raw record leakage</div>
        </div>
      </div>

      {/* Distributed Node Topology */}
      <div className="space-y-3">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
          Distributed Virtual Client Shards (Web Workers)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="p-4 bg-muted/30 border border-border/40 rounded-2xl space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-xs text-foreground truncate">{node.name}</div>
                <Badge variant="outline" className="text-[9px] font-mono">
                  {node.category}
                </Badge>
              </div>

              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>Local Data:</span>
                  <span className="text-foreground">{node.localSamples.toLocaleString()} rows</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>Shard Acc:</span>
                  <span className="text-emerald-500 font-bold">{node.localAccuracy}%</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>DP Epsilon (ε):</span>
                  <span className="text-foreground">{node.dpEpsilon}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Cpu className="size-3" />
                  Local Worker
                </span>
                <Badge
                  className={`text-[9px] ${
                    node.status === 'training'
                      ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                  }`}
                >
                  {node.status === 'training' ? 'TRAINING' : 'GRADIENTS SYNCED'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Convergence History */}
      <div className="p-3.5 bg-background/60 rounded-xl border border-border/40 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-amber-500" />
          <span className="font-bold text-foreground">FedAvg Weight Aggregation:</span>
          <span className="text-muted-foreground font-mono">
            {roundHistory.map((h) => `R${h.round}: ${h.acc}%`).join(' → ')}
          </span>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground">Algorithm: McMahan et al. 2017</div>
      </div>
    </div>
  );
}
