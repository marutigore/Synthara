'use client';

import React, { useState } from 'react';
import { Smartphone, Star, MessageCircle, RefreshCw, CheckCircle2, TrendingUp, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppReview {
  id: string;
  store: 'iOS App Store' | 'Google Play Store';
  appName: string;
  reviewSnippet: string;
  stars: number;
  category: 'Feature Request' | 'Bug Report' | 'UX Complaint' | 'Praise' | 'Crash Report';
  appVersion: string;
  date: string;
}

export function AppStoreReviewMiner() {
  const [reviews, setReviews] = useState<AppReview[]>([
    { id: '1', store: 'iOS App Store', appName: 'Synthara AI', reviewSnippet: 'Love the new data export feature! CSV generation is blazing fast now.', stars: 5, category: 'Praise', appVersion: 'v2.4.1', date: '2026-08-14' },
    { id: '2', store: 'Google Play Store', appName: 'Synthara AI', reviewSnippet: 'App crashes on Pixel 8 when opening the schema builder. Please fix ASAP.', stars: 1, category: 'Crash Report', appVersion: 'v2.4.0', date: '2026-08-13' },
    { id: '3', store: 'iOS App Store', appName: 'Synthara AI', reviewSnippet: 'Please add dark mode toggle in settings. White background strains my eyes.', stars: 3, category: 'Feature Request', appVersion: 'v2.4.1', date: '2026-08-12' },
    { id: '4', store: 'Google Play Store', appName: 'Synthara AI', reviewSnippet: 'Navigation is confusing. Took me 5 minutes to find the export button.', stars: 2, category: 'UX Complaint', appVersion: 'v2.3.9', date: '2026-08-11' },
  ]);

  const [isMining, setIsMining] = useState(false);

  const mineReviews = () => {
    setIsMining(true);
    setTimeout(() => {
      setReviews((prev) => [
        {
          id: Date.now().toString(),
          store: 'iOS App Store',
          appName: 'Synthara AI',
          reviewSnippet: 'The LLM fine-tuning JSONL formatter saved me hours. Absolutely brilliant tool!',
          stars: 5,
          category: 'Praise',
          appVersion: 'v2.4.2',
          date: new Date().toISOString().split('T')[0],
        },
        ...prev.slice(0, 3),
      ]);
      setIsMining(false);
    }, 650);
  };

  const avgStars = (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-pink-500/5 border-pink-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20">
            <Smartphone className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Mobile App Store Review & Feature Sentiment Analyzer
            </h4>
            <p className="text-xs text-muted-foreground">
              Scrapes iOS App Store & Google Play reviews; classifies crash reports, feature requests, and UX complaints.
            </p>
          </div>
        </div>

        <Button
          onClick={mineReviews}
          disabled={isMining}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-pink-600 hover:bg-pink-500 text-white shadow-md shadow-pink-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isMining ? 'animate-spin' : ''}`} />
          {isMining ? 'Mining Reviews...' : 'Mine App Reviews'}
        </Button>
      </div>

      {/* Reviews Feed */}
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-primary">{r.store}</span>
                <span className="text-[9px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded border border-border/40">{r.appVersion}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-3 ${i < r.stars ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
                  ))}
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  r.category === 'Praise' ? 'bg-emerald-500/20 text-emerald-500' :
                  r.category === 'Crash Report' ? 'bg-red-500/20 text-red-500' :
                  r.category === 'Feature Request' ? 'bg-blue-500/20 text-blue-500' :
                  r.category === 'Bug Report' ? 'bg-orange-500/20 text-orange-500' :
                  'bg-amber-500/20 text-amber-500'
                }`}>
                  {r.category}
                </span>
              </div>
            </div>
            <p className="text-xs text-foreground font-medium leading-relaxed font-sans">"{r.reviewSnippet}"</p>
            <span className="text-[10px] text-muted-foreground font-mono">{r.date}</span>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-between text-xs text-pink-500 font-semibold">
        <span className="flex items-center gap-2">
          <Star className="size-4 fill-pink-500" /> Average Rating: {avgStars} ★ • {reviews.filter((r) => r.category === 'Crash Report').length} Crash Reports Flagged
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Product Roadmap Intel</span>
      </div>
    </div>
  );
}
