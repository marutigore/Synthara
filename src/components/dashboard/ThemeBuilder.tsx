'use client';

import React, { useState } from 'react';
import { Palette, Check, Sparkles, Sliders, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

interface PresetTheme {
  id: string;
  name: string;
  primaryColor: string;
  ringColor: string;
  bgGradient: string;
}

export function ThemeBuilder() {
  const { theme, setTheme } = useTheme();

  const presets: PresetTheme[] = [
    { id: 'sapphire', name: 'Sapphire Intelligence', primaryColor: '#3b82f6', ringColor: '#10b981', bgGradient: 'from-blue-500/20 to-indigo-500/10' },
    { id: 'emerald', name: 'Emerald Synthesis', primaryColor: '#10b981', ringColor: '#06b6d4', bgGradient: 'from-emerald-500/20 to-teal-500/10' },
    { id: 'cyberpunk', name: 'Cyber Purple', primaryColor: '#a855f7', ringColor: '#ec4899', bgGradient: 'from-purple-500/20 to-pink-500/10' },
    { id: 'amber', name: 'Sunset Amber', primaryColor: '#f59e0b', ringColor: '#ef4444', bgGradient: 'from-amber-500/20 to-orange-500/10' },
  ];

  const [activePreset, setActivePreset] = useState<string>('sapphire');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-purple-500/5 border-purple-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <Palette className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground">
              Custom Theme & Palette Builder
            </h4>
            <p className="text-xs text-muted-foreground">
              Personalize dashboard accent gradients, color tokens, and layout density modes.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-500 border border-purple-500/20">
          Personalized UI
        </span>
      </div>

      {/* Light / Dark / System Toggle */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground uppercase tracking-wider">Appearance Mode</label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setTheme('light')}
            className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              theme === 'light' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-foreground border-border/40'
            }`}
          >
            <Sun className="size-4" /> Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              theme === 'dark' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-foreground border-border/40'
            }`}
          >
            <Moon className="size-4" /> Dark
          </button>
          <button
            onClick={() => setTheme('system')}
            className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              theme === 'system' ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted/30 text-foreground border-border/40'
            }`}
          >
            <Monitor className="size-4" /> System
          </button>
        </div>
      </div>

      {/* Preset Accent Cards */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground uppercase tracking-wider">Accent Palette Presets</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {presets.map((p) => {
            const isSelected = p.id === activePreset;
            return (
              <button
                key={p.id}
                onClick={() => setActivePreset(p.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-card border-primary ring-2 ring-primary/30 shadow-md'
                    : 'bg-muted/30 border-border/40 hover:border-primary/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="size-6 rounded-full shadow-inner border border-white/20"
                    style={{ backgroundColor: p.primaryColor }}
                  />
                  <div>
                    <h5 className="text-xs font-bold text-foreground">{p.name}</h5>
                    <span className="text-[10px] text-muted-foreground font-mono">Accent Token #{p.id}</span>
                  </div>
                </div>

                {isSelected && <Check className="size-4 text-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Density Mode */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground uppercase tracking-wider">Layout Spacing Density</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDensity('comfortable')}
            className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
              density === 'comfortable'
                ? 'bg-primary/10 text-primary border-primary/30'
                : 'bg-muted/30 text-muted-foreground border-transparent'
            }`}
          >
            Comfortable (Default)
          </button>
          <button
            onClick={() => setDensity('compact')}
            className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
              density === 'compact'
                ? 'bg-primary/10 text-primary border-primary/30'
                : 'bg-muted/30 text-muted-foreground border-transparent'
            }`}
          >
            Compact (High Density)
          </button>
        </div>
      </div>
    </div>
  );
}
