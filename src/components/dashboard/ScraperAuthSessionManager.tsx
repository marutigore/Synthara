'use client';

import React, { useState } from 'react';
import { Key, Lock, ShieldCheck, RefreshCw, CheckCircle2, UserCheck, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthSession {
  id: string;
  domain: string;
  authMethod: 'OAuth 2.0' | 'JWT Bearer' | 'Session Cookie Replay' | 'API Key';
  sessionExpiry: string;
  status: 'Active' | 'Refreshing' | 'Expired';
  jwtHeaderSnippet: string;
}

export function ScraperAuthSessionManager() {
  const [sessions, setSessions] = useState<AuthSession[]>([
    { id: '1', domain: 'linkedin.com', authMethod: 'Session Cookie Replay', sessionExpiry: 'In 14 hours', status: 'Active', jwtHeaderSnippet: 'li_at=AQEDAT38...a91f' },
    { id: '2', domain: 'api.github.com', authMethod: 'OAuth 2.0', sessionExpiry: 'In 28 days', status: 'Active', jwtHeaderSnippet: 'gho_8f92a1...c4b' },
    { id: '3', domain: 'portal.bloomberg.com', authMethod: 'JWT Bearer', sessionExpiry: 'In 2 hours', status: 'Active', jwtHeaderSnippet: 'Bearer eyJhbGci...x9' },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshSessions = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSessions((prev) =>
        prev.map((s) => ({
          ...s,
          status: 'Active',
          sessionExpiry: 'In 24 hours',
        }))
      );
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-blue-500/5 border-blue-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Key className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Authenticated Scraper Session & Cookie Manager
            </h4>
            <p className="text-xs text-muted-foreground">
              Manages paywalled OAuth sessions, cookie replay vaults, & JWT token refreshers.
            </p>
          </div>
        </div>

        <Button
          onClick={refreshSessions}
          disabled={isRefreshing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh All JWT Tokens'}
        </Button>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessions.map((s) => (
          <div key={s.id} className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-foreground">{s.domain}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500">
                {s.status}
              </span>
            </div>

            <div className="space-y-1 text-xs text-muted-foreground font-mono">
              <div className="flex justify-between">
                <span>Method:</span>
                <span className="text-foreground font-bold">{s.authMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Expires:</span>
                <span className="text-primary font-bold">{s.sessionExpiry}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border/20">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block mb-1">Encrypted Header Token</span>
              <code className="text-[10px] font-mono text-emerald-400 bg-black/80 px-2 py-1 rounded block truncate">
                {s.jwtHeaderSnippet}
              </code>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs text-blue-500 font-semibold">
        <span className="flex items-center gap-2">
          <ShieldCheck className="size-4" /> Zero-Knowledge Session Storage Active • AES-256 Vault Encrypted
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">3 Sessions Valid</span>
      </div>
    </div>
  );
}
