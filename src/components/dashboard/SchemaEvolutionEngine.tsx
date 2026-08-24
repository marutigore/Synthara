'use client';

import React, { useState } from 'react';
import { GitCompare, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, FileCode, ArrowRight, ShieldX, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type CompatibilityMode = 'BACKWARD' | 'FORWARD' | 'FULL' | 'NONE';

interface SchemaFieldChange {
  field: string;
  changeType: 'added' | 'removed' | 'type_changed' | 'default_added';
  oldType?: string;
  newType?: string;
  isBreaking: boolean;
  explanation: string;
}

export function SchemaEvolutionEngine() {
  const [compatMode, setCompatMode] = useState<CompatibilityMode>('BACKWARD');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const [fieldChanges, setFieldChanges] = useState<SchemaFieldChange[]>([
    {
      field: 'loyalty_tier',
      changeType: 'added',
      newType: 'VARCHAR(20) DEFAULT "BRONZE"',
      isBreaking: false,
      explanation: 'Safe: Added optional field with default value.',
    },
    {
      field: 'tax_rate_pct',
      changeType: 'type_changed',
      oldType: 'INT',
      newType: 'FLOAT',
      isBreaking: false,
      explanation: 'Safe: Numeric type widening from INT to FLOAT.',
    },
    {
      field: 'legacy_fax_number',
      changeType: 'removed',
      oldType: 'VARCHAR(32)',
      isBreaking: true,
      explanation: 'Breaking: Removing field violates BACKWARD compatibility for older consumers.',
    },
  ]);

  const handleModeChange = (mode: CompatibilityMode) => {
    setIsEvaluating(true);
    setCompatMode(mode);
    setTimeout(() => {
      setFieldChanges((prev) =>
        prev.map((f) => ({
          ...f,
          isBreaking: mode === 'NONE' ? false : f.changeType === 'removed',
        }))
      );
      setIsEvaluating(false);
    }, 400);
  };

  const breakingCount = fieldChanges.filter((f) => f.isBreaking).length;
  const isCompatible = breakingCount === 0;

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-purple-500/5 border-purple-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <GitCompare className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Schema Evolution & Compatibility Engine
              <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-500 bg-purple-500/10">
                Avro / Confluent Standard
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Automated schema drift detection and downstream ML consumer compatibility governance.
            </p>
          </div>
        </div>

        {/* Compatibility Verdict Pill */}
        <div className="flex items-center gap-2">
          {isCompatible ? (
            <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 px-3 py-1 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5" />
              SCHEMA COMPATIBLE
            </Badge>
          ) : (
            <Badge className="bg-rose-500/20 text-rose-500 border-rose-500/30 px-3 py-1 text-xs flex items-center gap-1.5">
              <ShieldX className="size-3.5" />
              {breakingCount} BREAKING DRIFT(S)
            </Badge>
          )}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="p-4 bg-muted/40 rounded-2xl border border-border/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Active Conformance Mode
          </span>
          <div className="flex items-center gap-1 bg-background p-1 rounded-xl border border-border/60">
            {(['BACKWARD', 'FORWARD', 'FULL', 'NONE'] as CompatibilityMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => handleModeChange(mode)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-lg transition-colors ${
                  compatMode === mode
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {compatMode === 'BACKWARD' && 'Consumers using Schema v2 can read data produced by Schema v1 (default for data warehouses).'}
          {compatMode === 'FORWARD' && 'Consumers using Schema v1 can read data produced by Schema v2.'}
          {compatMode === 'FULL' && 'Schemas are both backward and forward compatible.'}
          {compatMode === 'NONE' && 'Compatibility checks are disabled.'}
        </p>
      </div>

      {/* Schema Version Comparison Diff */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Field Delta: Schema v1.4 → v2.0
          </span>
          <span className="text-muted-foreground font-mono">3 fields modified</span>
        </div>

        <div className="space-y-2">
          {fieldChanges.map((change, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                change.isBreaking
                  ? 'bg-rose-500/5 border-rose-500/30'
                  : 'bg-muted/30 border-border/40'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-foreground">{change.field}</span>
                  <Badge
                    variant="outline"
                    className={`text-[9px] font-mono ${
                      change.changeType === 'added'
                        ? 'border-emerald-500/30 text-emerald-500'
                        : change.changeType === 'removed'
                        ? 'border-rose-500/30 text-rose-500'
                        : 'border-blue-500/30 text-blue-500'
                    }`}
                  >
                    {change.changeType.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-[11px] text-muted-foreground">{change.explanation}</div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {change.isBreaking ? (
                  <Badge className="bg-rose-500/20 text-rose-500 border-rose-500/30 text-[10px]">
                    BREAKING CHANGE
                  </Badge>
                ) : (
                  <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 text-[10px]">
                    NON-BREAKING
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Migration Script Snippet */}
      <div className="p-3.5 bg-background border border-border/60 rounded-xl space-y-1.5">
        <span className="text-[10px] font-mono uppercase text-muted-foreground font-bold flex items-center gap-1.5">
          <FileCode className="size-3 text-purple-500" />
          Auto-Generated Safe Migration DDL
        </span>
        <div className="text-[11px] font-mono text-purple-400 bg-muted/30 p-2 rounded-lg">
          ALTER TABLE synthetic_orders ADD COLUMN loyalty_tier VARCHAR(20) DEFAULT &apos;BRONZE&apos;;
        </div>
      </div>
    </div>
  );
}
