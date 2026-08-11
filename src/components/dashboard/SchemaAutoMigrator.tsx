'use client';

import React, { useState } from 'react';
import { RefreshCw, Code2, Check, Copy, AlertTriangle, ShieldCheck, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SchemaAutoMigrator() {
  const [copied, setCopied] = useState(false);

  const sqlMigrationScript = `-- Synthara AI Auto-Generated SQL DDL Schema Migration
-- Source Version: v1.0.4  -> Target Version: v2.0.0
---------------------------------------------------------
ALTER TABLE ecommerce_customers 
  ADD COLUMN IF NOT EXISTS lifetime_value NUMERIC(10,2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS preferred_locale VARCHAR(10) DEFAULT 'en-US',
  DROP COLUMN IF EXISTS legacy_fax_number,
  ALTER COLUMN account_status SET DATA TYPE VARCHAR(30);

-- Auto-Generated JavaScript Payload Transformation Function
function transformV1ToV2(record) {
  return {
    ...record,
    lifetime_value: record.total_spend || 0.0,
    preferred_locale: record.country_code === 'IN' ? 'hi-IN' : 'en-US',
    legacy_fax_number: undefined,
  };
}
`;

  const copyScript = () => {
    navigator.clipboard.writeText(sqlMigrationScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-emerald-500/5 border-emerald-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Database className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Automated Schema Migration & DDL Auto-Fixer
            </h4>
            <p className="text-xs text-muted-foreground">
              Auto-generates SQL ALTER TABLE scripts & JavaScript payload transform functions between version diffs.
            </p>
          </div>
        </div>

        <Button
          onClick={copyScript}
          size="sm"
          variant="outline"
          className="h-9 px-3 text-xs font-bold rounded-xl border-border/50"
        >
          {copied ? <Check className="size-3.5 text-emerald-500 mr-1.5" /> : <Copy className="size-3.5 mr-1.5" />}
          {copied ? 'Copied Script' : 'Copy Migration Script'}
        </Button>
      </div>

      {/* Migration Script Code Box */}
      <div className="p-4 rounded-2xl bg-black/90 border border-border/20 space-y-2 text-xs font-mono text-zinc-300">
        <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase font-bold">
          <span className="flex items-center gap-1.5"><Code2 className="size-3.5 text-emerald-400" /> PostgreSQL & Payload Migration Generator</span>
          <span className="text-emerald-500">Zero Downtime Ready</span>
        </div>
        <pre className="text-[11px] leading-relaxed text-emerald-400 overflow-x-auto max-h-48">
          {sqlMigrationScript}
        </pre>
      </div>

      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-500 font-semibold">
        <span className="flex items-center gap-2">
          <ShieldCheck className="size-4" /> Migration Safe • 2 Columns Added, 1 Column Dropped
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">v1.0.4 → v2.0.0</span>
      </div>
    </div>
  );
}
