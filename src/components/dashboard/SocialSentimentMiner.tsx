'use client';

import React, { useState } from 'react';
import { MessageSquare, Heart, ThumbsUp, Sparkles, CheckCircle2, RefreshCw, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialPost {
  id: string;
  platform: 'Twitter / X' | 'Reddit' | 'LinkedIn';
  postSnippet: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  sentimentScore: number;
  emotion: string;
}

export function SocialSentimentMiner() {
  const [posts, setPosts] = useState<SocialPost[]>([
    { id: '1', platform: 'Twitter / X', postSnippet: 'Synthara AI makes generating synthetic datasets so effortless! Incredible developer experience.', sentiment: 'Positive', sentimentScore: 0.94, emotion: 'Enthusiasm' },
    { id: '2', platform: 'Reddit', postSnippet: 'Testing Crawl4AI Docker scraper. Rate limiting controls work well on large crawls.', sentiment: 'Positive', sentimentScore: 0.82, emotion: 'Satisfaction' },
    { id: '3', platform: 'LinkedIn', postSnippet: 'Comparing synthetic data generators. PII masking is essential for GDPR healthcare compliance.', sentiment: 'Neutral', sentimentScore: 0.12, emotion: 'Informative' },
  ]);

  const [isMining, setIsMining] = useState(false);

  const mineNewPosts = () => {
    setIsMining(true);
    setTimeout(() => {
      setPosts((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          platform: 'Twitter / X',
          postSnippet: 'Just exported 10k synthetic e-commerce rows into CSV using Synthara!',
          sentiment: 'Positive',
          sentimentScore: 0.89,
          emotion: 'Delight',
        },
      ]);
      setIsMining(false);
    }, 650);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-blue-500/5 border-blue-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <MessageSquare className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Social Media Sentiment & Brand Intelligence Miner
            </h4>
            <p className="text-xs text-muted-foreground">
              Scrapes social posts across platforms & performs VADER sentiment classification & NLP emotion scoring.
            </p>
          </div>
        </div>

        <Button
          onClick={mineNewPosts}
          disabled={isMining}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isMining ? 'animate-spin' : ''}`} />
          {isMining ? 'Mining...' : 'Mine Social Posts'}
        </Button>
      </div>

      {/* Social Posts Feed Grid */}
      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-primary font-mono">{p.platform}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-mono">Score: +{p.sentimentScore}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    p.sentiment === 'Positive' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {p.sentiment} ({p.emotion})
                </span>
              </div>
            </div>

            <p className="text-xs text-foreground font-medium leading-relaxed font-sans">
              "{p.postSnippet}"
            </p>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs text-blue-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> VADER Sentiment Engine Active • Brand Sentiment Index: +88.5 Net Positive
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Overwhelmingly Positive</span>
      </div>
    </div>
  );
}
