'use client';

import React, { useState } from 'react';
import { ShieldAlert, Sparkles, AlertTriangle, Bug, Zap, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EdgeCaseVector {
  id: string;
  field: string;
  anomalyType: 'Boundary Float' | 'SQL Injection Test' | 'Unicode Overflow' | 'Null Injection' | 'Extreme Timestamp';
  value: string;
  severity: 'High' | 'Medium' | 'Critical';
}

export function EdgeCaseAugmenter() {
  const [vectors, setVectors] = useState<EdgeCaseVector[]>([
    { id: '1', field: 'annual_revenue', anomalyType: 'Boundary Float', value: '1.7976931348623157e+308', severity: 'High' },
    { id: '2', field: 'customer_email', anomalyType: 'SQL Injection Test', value: "admin' OR '1'='1' --", severity: 'Critical' },
    { id: '3', field: 'user_bio', anomalyType: 'Unicode Overflow', value: '█████████ 𝓕𝓤𝓛𝓛 𝓤𝓝𝓘𝓒𝓞𝓓𝓔 ⛤⛥⛦', severity: 'Medium' },
    { id: '4', field: 'phone_number', anomalyType: 'Null Injection', value: 'NaN / NULL / undefined', severity: 'High' },
    { id: '5', field: 'created_at', anomalyType: 'Extreme Timestamp', value: '9999-12-31T23:59:59.999Z', severity: 'Critical' },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewVectors = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setVectors([
        { id: Date.now().toString() + '-1', field: 'order_total', anomalyType: 'Boundary Float', value: '-Infinity / +Infinity', severity: 'Critical' },
        { id: Date.now().toString() + '-2', field: 'api_token', anomalyType: 'SQL Injection Test', value: "'; DROP TABLE users; --", severity: 'Critical' },
        { id: Date.now().toString() + '-3', field: 'user_name', anomalyType: 'Unicode Overflow', value: '🔥'.repeat(256), severity: 'Medium' },
        ...vectors.slice(0, 2),
      ]);
      setIsGenerating(false);
    }, 700);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-amber-500/5 border-amber-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Bug className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              AI Adversarial Edge Case Augmenter
            </h4>
            <p className="text-xs text-muted-foreground">
              Inject boundary values, unicode anomalies, and stress-test vectors into synthetic datasets.
            </p>
          </div>
        </div>

        <Button
          onClick={generateNewVectors}
          disabled={isGenerating}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Augment Edge Cases'}
        </Button>
      </div>

      {/* Vectors Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Target Field</th>
              <th className="p-3">Anomaly Type</th>
              <th className="p-3">Adversarial Test Value</th>
              <th className="p-3">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {vectors.map((v) => (
              <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 font-bold text-primary">{v.field}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    {v.anomalyType}
                  </span>
                </td>
                <td className="p-3 text-foreground font-semibold truncate max-w-[200px]">{v.value}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                      v.severity === 'Critical'
                        ? 'bg-red-500/20 text-red-500'
                        : v.severity === 'High'
                        ? 'bg-orange-500/20 text-orange-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}
                  >
                    {v.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs text-amber-500 font-semibold">
        <span className="flex items-center gap-2">
          <ShieldAlert className="size-4" /> 5 Edge Case Vectors Prepared for Model Resiliency Testing
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Stress Level: High</span>
      </div>
    </div>
  );
}
