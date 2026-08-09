'use client';

import React from 'react';
import { Award, Lock, Sparkles } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  points: number;
}

interface AchievementBadgeProps {
  achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <div
      className={`p-4 rounded-2xl border transition-all flex items-start gap-3 relative overflow-hidden ${
        achievement.unlocked
          ? 'bg-gradient-to-br from-primary/15 via-card to-card border-primary/30 shadow-md hover:border-primary/60'
          : 'bg-muted/20 border-border/30 opacity-60'
      }`}
    >
      <div
        className={`p-3 rounded-xl flex items-center justify-center text-xl shadow-inner ${
          achievement.unlocked ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted text-muted-foreground'
        }`}
      >
        {achievement.icon}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-bold text-foreground">{achievement.title}</h5>
          <span className="text-[10px] font-black font-mono px-2 py-0.5 rounded-full bg-primary/20 text-primary">
            +{achievement.points} XP
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{achievement.description}</p>
        {achievement.unlocked && (
          <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-1 mt-1">
            <Sparkles className="size-3" /> Unlocked {achievement.unlockedAt || 'Recently'}
          </span>
        )}
      </div>

      {!achievement.unlocked && (
        <div className="absolute top-2 right-2 text-muted-foreground">
          <Lock className="size-3.5 opacity-40" />
        </div>
      )}
    </div>
  );
}
