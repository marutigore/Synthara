'use client';

import React, { useState } from 'react';
import { Shield, AlertTriangle, Skull, RefreshCw, CheckCircle2, Bug, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThreatFeed {
  id: string;
  cveId: string;
  description: string;
  cvssScore: number;
  severity: 'Critical' | 'High' | 'Medium';
  mitreTactic: string;
  malwareHash: string;
  publishedDate: string;
}

export function CyberThreatIntelligence() {
  const [threats, setThreats] = useState<ThreatFeed[]>([
    { id: '1', cveId: 'CVE-2026-44228', description: 'Remote Code Execution in OpenSSL TLS Handshake Parser', cvssScore: 9.8, severity: 'Critical', mitreTactic: 'T1190 — Exploit Public-Facing Application', malwareHash: 'sha256:4a8b1...f9c2', publishedDate: '2026-08-10' },
    { id: '2', cveId: 'CVE-2026-31045', description: 'Privilege Escalation via Kubernetes RBAC Policy Bypass', cvssScore: 8.4, severity: 'High', mitreTactic: 'T1068 — Exploitation for Privilege Escalation', malwareHash: 'md5:e72a3...8d1b', publishedDate: '2026-08-08' },
    { id: '3', cveId: 'CVE-2026-28912', description: 'Server-Side Request Forgery in Cloud Metadata Endpoint', cvssScore: 7.5, severity: 'High', mitreTactic: 'T1557 — Adversary-in-the-Middle', malwareHash: 'sha256:9f01c...2ab7', publishedDate: '2026-08-05' },
    { id: '4', cveId: 'CVE-2026-22190', description: 'SQL Injection in Legacy Authentication Middleware', cvssScore: 6.8, severity: 'Medium', mitreTactic: 'T1059 — Command and Scripting Interpreter', malwareHash: 'md5:1bc04...6e3f', publishedDate: '2026-08-02' },
  ]);

  const [isSyncing, setIsSyncing] = useState(false);

  const syncFeeds = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setThreats((prev) => [
        {
          id: Date.now().toString(),
          cveId: `CVE-2026-${Math.floor(Math.random() * 90000 + 10000)}`,
          description: 'Zero-Day Buffer Overflow in gRPC Protobuf Deserializer',
          cvssScore: 9.1,
          severity: 'Critical',
          mitreTactic: 'T1203 — Exploitation for Client Execution',
          malwareHash: `sha256:${Math.random().toString(16).substring(2, 10)}`,
          publishedDate: new Date().toISOString().split('T')[0],
        },
        ...prev.slice(0, 3),
      ]);
      setIsSyncing(false);
    }, 700);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-red-500/5 border-red-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
            <Shield className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Cybersecurity CVE Threat Intelligence & MITRE ATT&CK Feed
            </h4>
            <p className="text-xs text-muted-foreground">
              Synthesizes CVE vulnerability feeds, CVSS severity scores, MITRE TTP tactic mappings, and malware hash IoCs.
            </p>
          </div>
        </div>

        <Button
          onClick={syncFeeds}
          disabled={isSyncing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing Intel...' : 'Sync Threat Feeds'}
        </Button>
      </div>

      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">CVE ID</th>
              <th className="p-3">Vulnerability Description</th>
              <th className="p-3">CVSS Score</th>
              <th className="p-3">MITRE ATT&CK TTP</th>
              <th className="p-3">IoC Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {threats.map((t) => (
              <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <span className="font-bold text-red-500">{t.cveId}</span>
                  <div className="text-[10px] text-muted-foreground">{t.publishedDate}</div>
                </td>
                <td className="p-3 text-foreground font-sans font-medium max-w-[220px]">{t.description}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    t.severity === 'Critical' ? 'bg-red-500/20 text-red-500 animate-pulse' :
                    t.severity === 'High' ? 'bg-orange-500/20 text-orange-500' : 'bg-amber-500/20 text-amber-500'
                  }`}>
                    {t.cvssScore} — {t.severity}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground text-[10px]">{t.mitreTactic}</td>
                <td className="p-3 font-mono text-[10px] text-muted-foreground truncate max-w-[100px]">{t.malwareHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between text-xs text-red-500 font-semibold">
        <span className="flex items-center gap-2">
          <Skull className="size-4" /> {threats.filter((t) => t.severity === 'Critical').length} Critical Vulnerabilities Active • SOC Alert Level: Elevated
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">NVD + MITRE Synchronized</span>
      </div>
    </div>
  );
}
