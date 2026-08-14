'use client';

import React, { useState } from 'react';
import { Database, Shield, Tag, UserCheck, Key, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CatalogDataset {
  id: string;
  name: string;
  domainOwner: string;
  piiSensitivity: 'High (Restricted)' | 'Medium (Internal)' | 'Low (Public)';
  classificationTags: string[];
  retentionDays: number;
  rbacRole: 'Data Engineer' | 'Data Scientist' | 'Compliance Officer';
}

export function DataGovernanceCatalog() {
  const [catalog, setCatalog] = useState<CatalogDataset[]>([
    { id: '1', name: 'user_billing_events_v2', domainOwner: 'Harsha M (Data Lead)', piiSensitivity: 'High (Restricted)', classificationTags: ['PII', 'Financial', 'PCI-DSS'], retentionDays: 365, rbacRole: 'Compliance Officer' },
    { id: '2', name: 'synthetic_ecommerce_leads', domainOwner: 'Maruti Gore (Dev)', piiSensitivity: 'Low (Public)', classificationTags: ['Synthetic', 'Marketing', 'LeadGen'], retentionDays: 90, rbacRole: 'Data Scientist' },
    { id: '3', name: 'ehr_patient_diagnoses', domainOwner: 'Manogna (Research)', piiSensitivity: 'High (Restricted)', classificationTags: ['PHI', 'HIPAA', 'Clinical'], retentionDays: 2555, rbacRole: 'Compliance Officer' },
  ]);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-indigo-500/5 border-indigo-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Shield className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Enterprise Data Governance & Catalog Suite
            </h4>
            <p className="text-xs text-muted-foreground">
              Automated PII classification, data ownership attribution, & RBAC policy access matrix.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-500 border border-indigo-500/30 flex items-center gap-1.5">
          <Lock className="size-3" /> RBAC Enforced
        </span>
      </div>

      {/* Catalog Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Dataset Name</th>
              <th className="p-3">Domain Owner</th>
              <th className="p-3">Sensitivity Tier</th>
              <th className="p-3">Governance Tags</th>
              <th className="p-3">Retention Policy</th>
              <th className="p-3">Required Access Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {catalog.map((c) => (
              <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 font-bold text-primary">{c.name}</td>
                <td className="p-3 text-foreground font-semibold flex items-center gap-1.5">
                  <UserCheck className="size-3 text-muted-foreground" /> {c.domainOwner}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    c.piiSensitivity.includes('High') ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {c.piiSensitivity}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {c.classificationTags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-muted-foreground">{c.retentionDays} days</td>
                <td className="p-3 text-foreground font-bold">{c.rbacRole}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between text-xs text-indigo-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> Data Catalog Synchronized • 3 Enterprise Assets Governed
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Policy Status: Active</span>
      </div>
    </div>
  );
}
