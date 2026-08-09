'use client';

import React from 'react';
import { Trophy, Flame, Star, Sparkles, Award } from 'lucide-react';
import { AchievementBadge, Achievement } from './AchievementBadge';
import { Progress } from '@/components/ui/progress';

export function AchievementSystem() {
  const achievements: Achievement[] = [
    { id: '1', title: 'First Synthesis 🎉', description: 'Generated your first synthetic dataset on Synthara.', icon: '⚡', unlocked: true, unlockedAt: '2 days ago', points: 100 },
    { id: '2', title: 'Privacy Champion 🛡️', description: 'Applied Laplace noise differential privacy to a dataset.', icon: '🛡️', unlocked: true, unlockedAt: '1 day ago', points: 250 },
    { id: '3', title: '10,000 Rows Club 🔥', description: 'Synthesized over 10,000 total clean data entries.', icon: '🔥', unlocked: true, unlockedAt: 'Today', points: 500 },
    { id: '4', title: 'Machine Learning Pioneer 🧠', description: 'Trained an in-browser TensorFlow.js model on synthetic data.', icon: '🧠', unlocked: false, points: 750 },
    { id: '5', title: 'Automation Master ⚙️', description: 'Scheduled a recurring cron batch scraping job.', icon: '⚙️', unlocked: false, points: 1000 },
  ];

  const totalXP = achievements
    .filter((a) => a.unlocked)
    .reduce((acc, a) => acc + a.points, 0);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-amber-500/5 border-amber-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Trophy className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground">
              Gamification & Achievement Trophy Shelf
            </h4>
            <p className="text-xs text-muted-foreground">
              Earn XP and unlock badges by mastering AI synthesis features.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 font-mono text-xs font-black">
          <Star className="size-3.5 fill-current" />
          <span>{totalXP} TOTAL XP</span>
        </div>
      </div>

      {/* Progress to Next Rank */}
      <div className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-foreground flex items-center gap-1.5 font-sans">
            <Flame className="size-4 text-orange-500" /> Current Rank: Level 3 Data Strategist
          </span>
          <span className="text-amber-500 font-mono">850 / 1500 XP to Level 4</span>
        </div>
        <Progress value={56} className="h-2 bg-amber-500/10" />
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((item) => (
          <AchievementBadge key={item.id} achievement={item} />
        ))}
      </div>
    </div>
  );
}
