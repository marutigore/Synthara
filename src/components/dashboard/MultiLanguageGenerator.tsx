'use client';

import React, { useState } from 'react';
import { Globe, Languages, Sparkles, Check } from 'lucide-react';
import { localeProviders, LocaleProvider } from '@/lib/data-processing/locale-providers';

export function MultiLanguageGenerator() {
  const [selectedLocale, setSelectedLocale] = useState<LocaleProvider>(localeProviders[0]);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card to-blue-500/5 border-blue-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Globe className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground">
              Multi-Language Synthetic Generator
            </h4>
            <p className="text-xs text-muted-foreground">
              Generate locale-aware names, addresses, and cultural data patterns in 15+ languages.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500 border border-blue-500/20">
          Locale Aware
        </span>
      </div>

      {/* Language Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {localeProviders.map((loc) => {
          const isSelected = loc.code === selectedLocale.code;
          return (
            <button
              key={loc.code}
              onClick={() => setSelectedLocale(loc)}
              className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-muted/30 text-foreground border-border/40 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{loc.flag}</span>
                <span className="text-xs font-bold">{loc.name.split(' ')[0]}</span>
              </div>
              {isSelected && <Check className="size-4" />}
            </button>
          );
        })}
      </div>

      {/* Selected Locale Sample Preview */}
      <div className="p-4 rounded-2xl bg-muted/40 border border-border/30 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-foreground">
          <span className="flex items-center gap-2">
            <Languages className="size-4 text-primary" /> Active Locale Pattern: {selectedLocale.flag} {selectedLocale.name}
          </span>
          <span className="font-mono text-primary text-[10px]">{selectedLocale.code}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-card border border-border/40">
            <span className="text-[10px] text-muted-foreground uppercase block font-sans font-bold">Sample Name</span>
            <span className="font-bold text-foreground truncate block">{selectedLocale.sampleName}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/40">
            <span className="text-[10px] text-muted-foreground uppercase block font-sans font-bold">Sample City</span>
            <span className="font-bold text-foreground truncate block">{selectedLocale.sampleCity}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-card border border-border/40">
            <span className="text-[10px] text-muted-foreground uppercase block font-sans font-bold">Phone Pattern</span>
            <span className="font-bold text-foreground truncate block">{selectedLocale.phoneFormat}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
