'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Trophy, BrainCircuit, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RlhfPair {
  id: string;
  prompt: string;
  completionA: string;
  completionB: string;
  status: 'pending' | 'ranked';
  chosen?: 'A' | 'B';
}

export function RlhfRewardModelTrainer() {
  const [pairs, setPairs] = useState<RlhfPair[]>([
    {
      id: 'req-001',
      prompt: 'Write a concise email declining a vendor proposal.',
      completionA: 'Dear Vendor, We are not interested. Do not contact us again. Thanks.',
      completionB: 'Thank you for reaching out and sharing your proposal. At this time, we have decided not to move forward, but we appreciate your time and effort.',
      status: 'pending',
    },
    {
      id: 'req-002',
      prompt: 'Explain quantum computing to a 5-year-old.',
      completionA: 'Quantum computing uses qubits which can be in a state of superposition (0 and 1 simultaneously) allowing exponential parallel calculations.',
      completionB: 'Imagine you have a magical spinning coin. While it spins, it\'s both heads and tails at the same time! Quantum computers use that magic to solve puzzles super fast.',
      status: 'pending',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPair = pairs[currentIndex];

  const handleRank = (chosen: 'A' | 'B') => {
    setPairs(prev => prev.map((p, i) => 
      i === currentIndex ? { ...p, status: 'ranked', chosen } : p
    ));
    if (currentIndex < pairs.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 400);
    }
  };

  const progress = pairs.filter(p => p.status === 'ranked').length;
  const isComplete = progress === pairs.length;

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-emerald-500/5 border-emerald-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <BrainCircuit className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              RLHF Preference Dataset Builder
            </h4>
            <p className="text-xs text-muted-foreground">
              Rank synthetic completions to train Large Language Model Reward Networks.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-bold bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
          <Trophy className="size-3.5 text-amber-400" />
          <span>{progress} / {pairs.length} Ranked</span>
        </div>
      </div>

      {isComplete ? (
        <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
          <CheckCircle2 className="size-12 text-emerald-500" />
          <div>
            <h3 className="font-bold text-lg text-foreground">Dataset Fully Ranked!</h3>
            <p className="text-sm text-muted-foreground">Your RLHF preferences are ready for fine-tuning.</p>
          </div>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl mt-4">
            <Download className="size-4 mr-2" />
            Export JSONL (Chosen vs Rejected)
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-border/40">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block mb-2">Synthetic User Prompt</span>
            <p className="text-sm font-medium text-foreground">{currentPair?.prompt}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model A */}
            <div className={`p-4 rounded-2xl border transition-all ${currentPair?.chosen === 'A' ? 'border-emerald-500 bg-emerald-500/10' : 'border-border/40 bg-card hover:border-emerald-500/30'}`}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-muted-foreground">Model A Completion</span>
              </div>
              <p className="text-sm text-muted-foreground min-h-[80px]">{currentPair?.completionA}</p>
              <div className="mt-4 flex gap-2">
                <Button 
                  onClick={() => handleRank('A')}
                  variant={currentPair?.chosen === 'A' ? 'default' : 'outline'}
                  size="sm" 
                  className={`flex-1 text-xs font-bold rounded-xl ${currentPair?.chosen === 'A' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'hover:text-emerald-500'}`}
                >
                  <ThumbsUp className="size-3.5 mr-1.5" />
                  Choose A
                </Button>
              </div>
            </div>

            {/* Model B */}
            <div className={`p-4 rounded-2xl border transition-all ${currentPair?.chosen === 'B' ? 'border-emerald-500 bg-emerald-500/10' : 'border-border/40 bg-card hover:border-emerald-500/30'}`}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-muted-foreground">Model B Completion</span>
              </div>
              <p className="text-sm text-muted-foreground min-h-[80px]">{currentPair?.completionB}</p>
              <div className="mt-4 flex gap-2">
                <Button 
                  onClick={() => handleRank('B')}
                  variant={currentPair?.chosen === 'B' ? 'default' : 'outline'}
                  size="sm" 
                  className={`flex-1 text-xs font-bold rounded-xl ${currentPair?.chosen === 'B' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'hover:text-emerald-500'}`}
                >
                  <ThumbsUp className="size-3.5 mr-1.5" />
                  Choose B
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress indicators */}
      <div className="flex justify-center gap-1.5 pt-2">
        {pairs.map((p, i) => (
          <div 
            key={p.id} 
            className={`h-1.5 rounded-full transition-all ${
              p.status === 'ranked' ? 'w-6 bg-emerald-500' : 
              i === currentIndex ? 'w-6 bg-emerald-500/40 animate-pulse' : 'w-2 bg-border'
            }`} 
          />
        ))}
      </div>
    </div>
  );
}
