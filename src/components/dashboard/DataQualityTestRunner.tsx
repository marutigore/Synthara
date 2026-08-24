'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Play, FileCheck2, AlertTriangle, RefreshCw, Plus, Trash2, Download, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DataAssertion {
  id: string;
  name: string;
  column: string;
  assertionType: 'not_null' | 'regex_match' | 'range_bounds' | 'is_unique' | 'cardinality';
  rule: string;
  status: 'passed' | 'failed' | 'pending';
  passedRows: number;
  totalRows: number;
  durationMs: number;
  failureSample?: string;
}

export function DataQualityTestRunner() {
  const [assertions, setAssertions] = useState<DataAssertion[]>([
    {
      id: 'ast-1',
      name: 'Primary Key Uniqueness',
      column: 'customer_id',
      assertionType: 'is_unique',
      rule: 'COUNT(DISTINCT customer_id) == COUNT(*)',
      status: 'passed',
      passedRows: 5000,
      totalRows: 5000,
      durationMs: 14,
    },
    {
      id: 'ast-2',
      name: 'Email Format RFC 5322',
      column: 'email',
      assertionType: 'regex_match',
      rule: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      status: 'passed',
      passedRows: 4998,
      totalRows: 5000,
      durationMs: 28,
    },
    {
      id: 'ast-3',
      name: 'Credit Score Range [300-850]',
      column: 'credit_score',
      assertionType: 'range_bounds',
      rule: 'credit_score >= 300 AND credit_score <= 850',
      status: 'passed',
      passedRows: 5000,
      totalRows: 5000,
      durationMs: 9,
    },
    {
      id: 'ast-4',
      name: 'Non-Null Shipping Address',
      column: 'shipping_address',
      assertionType: 'not_null',
      rule: 'shipping_address IS NOT NULL',
      status: 'failed',
      passedRows: 4890,
      totalRows: 5000,
      durationMs: 12,
      failureSample: 'Row #412, #890: null value found',
    },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'passed' | 'failed'>('all');

  const runAllTests = () => {
    setIsRunning(true);
    setAssertions((prev) => prev.map((a) => ({ ...a, status: 'pending' })));

    setTimeout(() => {
      setAssertions((prev) =>
        prev.map((a) => ({
          ...a,
          status: a.id === 'ast-4' ? 'failed' : 'passed',
          durationMs: Math.floor(Math.random() * 25 + 5),
        }))
      );
      setIsRunning(false);
    }, 800);
  };

  const totalPassed = assertions.filter((a) => a.status === 'passed').length;
  const totalFailed = assertions.filter((a) => a.status === 'failed').length;
  const passRate = Math.round((totalPassed / assertions.length) * 100);

  const filteredAssertions = assertions.filter((a) => {
    if (activeFilter === 'passed') return a.status === 'passed';
    if (activeFilter === 'failed') return a.status === 'failed';
    return true;
  });

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-blue-500/5 border-blue-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <FileCheck2 className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Automated Data Quality Test Runner
              <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-500 bg-blue-500/10">
                CI/CD Data Gate
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Automated assertion unit tests for synthetic datasets prior to warehouse & ML ingestion.
            </p>
          </div>
        </div>

        <Button
          onClick={runAllTests}
          disabled={isRunning}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
        >
          {isRunning ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Play className="size-3.5 mr-1.5" />}
          {isRunning ? 'Running Assertions...' : 'Execute Test Suite'}
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Pass Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-foreground">{passRate}%</span>
            <span className="text-[11px] text-muted-foreground">({totalPassed}/{assertions.length})</span>
          </div>
          <Progress value={passRate} className="h-1.5 bg-muted" />
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Passed Tests</span>
          <div className="text-2xl font-mono font-bold text-emerald-500 flex items-center gap-1.5">
            <CheckCircle2 className="size-5" />
            {totalPassed}
          </div>
          <div className="text-[10px] text-muted-foreground">100% compliant rows</div>
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Failed Assertions</span>
          <div className="text-2xl font-mono font-bold text-rose-500 flex items-center gap-1.5">
            <XCircle className="size-5" />
            {totalFailed}
          </div>
          <div className="text-[10px] text-muted-foreground">Requires auto-imputation</div>
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Gate Status</span>
          <div className="mt-1">
            {totalFailed === 0 ? (
              <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 text-xs">
                READY FOR PROD
              </Badge>
            ) : (
              <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-xs">
                GATE BLOCKED
              </Badge>
            )}
          </div>
          <div className="text-[10px] text-muted-foreground">Threshold: 100% pass</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/40">
          {(['all', 'passed', 'failed'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                activeFilter === filter
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-muted-foreground">
          5,000 synthetic rows evaluated in ~63ms
        </div>
      </div>

      {/* Test Assertions List */}
      <div className="space-y-2">
        {filteredAssertions.map((assertion) => (
          <div
            key={assertion.id}
            className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              assertion.status === 'passed'
                ? 'bg-emerald-500/5 border-emerald-500/20'
                : assertion.status === 'failed'
                ? 'bg-rose-500/5 border-rose-500/20'
                : 'bg-muted/30 border-border/40'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {assertion.status === 'passed' && <CheckCircle2 className="size-4 text-emerald-500" />}
                {assertion.status === 'failed' && <XCircle className="size-4 text-rose-500" />}
                {assertion.status === 'pending' && <RefreshCw className="size-4 text-muted-foreground animate-spin" />}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{assertion.name}</span>
                  <Badge variant="outline" className="text-[10px] font-mono py-0">
                    {assertion.column}
                  </Badge>
                </div>
                <div className="text-[11px] font-mono text-muted-foreground">{assertion.rule}</div>
                {assertion.failureSample && (
                  <div className="text-[10px] text-rose-500 font-mono mt-1 flex items-center gap-1">
                    <AlertTriangle className="size-3 shrink-0" />
                    {assertion.failureSample}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-foreground">
                  {assertion.passedRows} / {assertion.totalRows} passed
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">{assertion.durationMs}ms</div>
              </div>
              <Badge
                className={`text-[10px] font-bold ${
                  assertion.status === 'passed'
                    ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                }`}
              >
                {assertion.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
