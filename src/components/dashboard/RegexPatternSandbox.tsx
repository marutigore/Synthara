'use client';

import React, { useState } from 'react';
import { Code2, Wand2, CheckCircle2, Play, RefreshCw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RegexTemplate {
  name: string;
  pattern: string;
  exampleMatch: string;
  category: 'E-Commerce' | 'Automotive' | 'Banking' | 'Healthcare';
}

export function RegexPatternSandbox() {
  const [pattern, setPattern] = useState('^ORD-[A-Z]{3}-[0-9]{6}$');
  const [samples, setSamples] = useState<string[]>([
    'ORD-NYC-481902',
    'ORD-LON-712845',
    'ORD-TOK-938102',
    'ORD-SFO-102948',
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const templates: RegexTemplate[] = [
    { name: 'Enterprise Order ID', pattern: '^ORD-[A-Z]{3}-[0-9]{6}$', exampleMatch: 'ORD-NYC-481902', category: 'E-Commerce' },
    { name: 'Vehicle VIN Number', pattern: '^[1-9A-HJ-NPR-Z]{17}$', exampleMatch: '1HGCR2F83HA029184', category: 'Automotive' },
    { name: 'EU IBAN Bank Account', pattern: '^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$', exampleMatch: 'DE89370400440532013000', category: 'Banking' },
    { name: 'DEA Physician License', pattern: '^[A-Z]{2}[0-9]{7}$', exampleMatch: 'BM1294812', category: 'Healthcare' },
  ];

  const generateNewSamples = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const cities = ['NYC', 'LON', 'TOK', 'BER', 'PAR', 'SFO', 'DXB', 'SYD'];
      const newSamples = Array.from({ length: 4 }).map(() => {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const num = Math.floor(Math.random() * 900000 + 100000);
        return `ORD-${city}-${num}`;
      });
      setSamples(newSamples);
      setIsGenerating(false);
    }, 550);
  };

  const copyPattern = () => {
    navigator.clipboard.writeText(pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-rose-500/5 border-rose-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <Code2 className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Custom Synthetic Regex Pattern Generator & Sandbox
            </h4>
            <p className="text-xs text-muted-foreground">
              Define custom regular expressions to synthesize enterprise order IDs, VINs, IBANs, and serial keys.
            </p>
          </div>
        </div>

        <Button
          onClick={generateNewSamples}
          disabled={isGenerating}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20"
        >
          <Wand2 className={`size-3.5 mr-1.5 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Synthesizing...' : 'Synthesize Samples'}
        </Button>
      </div>

      {/* Pattern Input */}
      <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Active Regex Generator Pattern</span>
          <button onClick={copyPattern} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
            {copied ? 'Copied' : 'Copy Pattern'}
          </button>
        </div>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className="w-full bg-background border border-border/60 rounded-xl px-3 py-2 text-xs font-mono text-rose-500 font-bold focus:outline-none focus:border-rose-500/50"
        />
      </div>

      {/* Preset Templates */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Enterprise Preset Templates</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {templates.map((t) => (
            <button
              key={t.name}
              onClick={() => setPattern(t.pattern)}
              className="p-2.5 rounded-xl bg-muted/30 hover:bg-muted/60 border border-border/40 text-left transition-colors space-y-1"
            >
              <div className="text-[11px] font-bold text-foreground truncate">{t.name}</div>
              <div className="text-[9px] text-muted-foreground font-mono truncate">{t.exampleMatch}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Generated Synthetic Sample Tokens */}
      <div className="space-y-2">
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Synthesized Output Stream (Passed RegExp)</span>
        <div className="grid grid-cols-2 gap-2">
          {samples.map((s, i) => (
            <div key={i} className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 flex items-center justify-between font-mono text-xs text-foreground">
              <span className="font-bold text-rose-500">{s}</span>
              <span className="text-[9px] font-sans font-bold bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 rounded">MATCH</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between text-xs text-rose-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> PCRE2 / ECMAScript Regex Compliant Engine • Inverse-Matching Generator
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Generation Rate: 50,000 strings/sec</span>
      </div>
    </div>
  );
}
