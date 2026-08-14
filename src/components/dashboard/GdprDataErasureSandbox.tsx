'use client';

import React, { useState } from 'react';
import { Scale, Trash2, CheckCircle2, ShieldCheck, Database, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErasureRequest {
  requestId: string;
  dataSubject: string;
  affectedTables: string[];
  recordsPurged: number;
  status: 'Pending' | 'Cascading Purge' | 'Purge Verified';
  complianceHash: string;
}

export function GdprDataErasureSandbox() {
  const [requests, setRequests] = useState<ErasureRequest[]>([
    { requestId: 'GDPR-ART17-001', dataSubject: 'user_uuid_89a1f4', affectedTables: ['users', 'orders', 'activity_logs', 'ml_embeddings'], recordsPurged: 412, status: 'Purge Verified', complianceHash: 'sha256:7b92f...a10' },
    { requestId: 'GDPR-ART17-002', dataSubject: 'user_uuid_31c8e2', affectedTables: ['users', 'billing_profiles', 'support_tickets'], recordsPurged: 184, status: 'Purge Verified', complianceHash: 'sha256:4a81d...f92' },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);

  const simulateErasure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setRequests((prev) => [
        {
          requestId: `GDPR-ART17-00${prev.length + 1}`,
          dataSubject: `user_uuid_${Math.random().toString(16).substring(2, 8)}`,
          affectedTables: ['users', 'customer_features', 'synthetic_backups'],
          recordsPurged: Math.floor(Math.random() * 300 + 100),
          status: 'Purge Verified',
          complianceHash: `sha256:${Math.random().toString(16).substring(2, 10)}`,
        },
        ...prev,
      ]);
      setIsProcessing(false);
    }, 700);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-emerald-500/5 border-emerald-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Scale className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              GDPR Article 17 "Right to Erasure" Compliance Sandbox
            </h4>
            <p className="text-xs text-muted-foreground">
              Simulates automated data subject erasure requests across database tables & synthetic backups.
            </p>
          </div>
        </div>

        <Button
          onClick={simulateErasure}
          disabled={isProcessing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
        >
          <Trash2 className={`size-3.5 mr-1.5 ${isProcessing ? 'animate-bounce' : ''}`} />
          {isProcessing ? 'Purging...' : 'Execute Erasure Request'}
        </Button>
      </div>

      {/* Erasure Requests Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Request ID</th>
              <th className="p-3">Data Subject Token</th>
              <th className="p-3">Cascading Tables Purged</th>
              <th className="p-3">Records Erased</th>
              <th className="p-3">Audit Hash</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {requests.map((r) => (
              <tr key={r.requestId} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 font-bold text-primary">{r.requestId}</td>
                <td className="p-3 font-mono text-foreground">{r.dataSubject}</td>
                <td className="p-3 text-muted-foreground">
                  <div className="flex flex-wrap gap-1">
                    {r.affectedTables.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded text-[9px] bg-muted border border-border/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 font-bold text-emerald-500">{r.recordsPurged} entries</td>
                <td className="p-3 text-muted-foreground font-mono">{r.complianceHash}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center gap-1 w-fit">
                    <CheckCircle2 className="size-3" /> {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-500 font-semibold">
        <span className="flex items-center gap-2">
          <ShieldCheck className="size-4" /> GDPR Article 17 & CCPA Section 1798.105 Verified • 100% Cryptographic Certificate Issued
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Zero Residual Data</span>
      </div>
    </div>
  );
}
