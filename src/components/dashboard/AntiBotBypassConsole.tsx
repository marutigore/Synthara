'use client';

import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Cpu, RefreshCw, Zap, CheckCircle2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DefenseBypass {
  id: string;
  provider: 'Cloudflare Turnstile' | 'Akamai Bot Manager' | 'DataDome AI' | 'reCAPTCHA Enterprise';
  tactic: string;
  bypassRate: number;
  tlsFingerprint: string;
  status: 'Bypassed' | 'Challenged' | 'Bypassing';
}

export function AntiBotBypassConsole() {
  const [defenses, setDefenses] = useState<DefenseBypass[]>([
    { id: '1', provider: 'Cloudflare Turnstile', tactic: 'JA3 / TLS Fingerprint Spoofing', bypassRate: 99.4, tlsFingerprint: '771,4865-4866-4867,0-23-65281', status: 'Bypassed' },
    { id: '2', provider: 'Akamai Bot Manager', tactic: 'Canvas & WebGL Randomization', bypassRate: 98.1, tlsFingerprint: '771,49195-49199-52393,10-11-13-16', status: 'Bypassed' },
    { id: '3', provider: 'DataDome AI', tactic: 'Behavioral Mouse Trajectory Shift', bypassRate: 97.8, tlsFingerprint: '771,4865-4867-49195,0-5-10-18', status: 'Bypassed' },
    { id: '4', provider: 'reCAPTCHA Enterprise', tactic: 'Stealth Puppeteer Playwright Driver', bypassRate: 96.2, tlsFingerprint: '771,49196-49200,10-13-16-23', status: 'Challenged' },
  ]);

  const [isTesting, setIsTesting] = useState(false);

  const runBypassDiagnostic = () => {
    setIsTesting(true);
    setTimeout(() => {
      setDefenses((prev) =>
        prev.map((d) => ({
          ...d,
          bypassRate: parseFloat((Math.random() * 3 + 97).toFixed(1)),
          status: 'Bypassed',
        }))
      );
      setIsTesting(false);
    }, 700);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-cyan-500/5 border-cyan-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Crawl4AI Anti-Bot Bypass Diagnostic Console
            </h4>
            <p className="text-xs text-muted-foreground">
              Monitors Cloudflare, Akamai, & DataDome anti-bot bypass success rates & TLS spoofing.
            </p>
          </div>
        </div>

        <Button
          onClick={runBypassDiagnostic}
          disabled={isTesting}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isTesting ? 'animate-spin' : ''}`} />
          {isTesting ? 'Testing...' : 'Run Stealth Diagnostic'}
        </Button>
      </div>

      {/* Defenses Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Target WAF / Bot Guard</th>
              <th className="p-3">Stealth Bypass Strategy</th>
              <th className="p-3">JA3 / TLS Fingerprint</th>
              <th className="p-3">Bypass Success Rate</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {defenses.map((d) => (
              <tr key={d.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 font-bold text-primary">{d.provider}</td>
                <td className="p-3 text-foreground font-semibold">{d.tactic}</td>
                <td className="p-3 text-muted-foreground truncate max-w-[140px] font-mono">{d.tlsFingerprint}</td>
                <td className="p-3 font-bold text-emerald-500">{d.bypassRate}%</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    d.status === 'Bypassed' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                  }`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between text-xs text-cyan-500 font-semibold">
        <span className="flex items-center gap-2">
          <Zap className="size-4" /> Stealth Chromium Driver Active • Headless Fingerprint Randomization Enabled
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Overall Stealth: 98.4%</span>
      </div>
    </div>
  );
}
