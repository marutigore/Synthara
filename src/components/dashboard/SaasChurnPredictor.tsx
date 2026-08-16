'use client';

import React, { useState } from 'react';
import { BarChart3, AlertTriangle, CheckCircle2, DollarSign, RefreshCw, UserMinus, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SaasCustomer {
  id: string;
  companyName: string;
  plan: 'Starter' | 'Growth' | 'Enterprise';
  mrr: number;
  ltv: number;
  renewalDate: string;
  supportTickets: number;
  loginFrequency: string;
  churnRisk: number;
}

export function SaasChurnPredictor() {
  const [customers, setCustomers] = useState<SaasCustomer[]>([
    { id: '1', companyName: 'Acme Corp', plan: 'Enterprise', mrr: 4200, ltv: 151200, renewalDate: '2026-11-15', supportTickets: 2, loginFrequency: '22/30 days', churnRisk: 8 },
    { id: '2', companyName: 'NovaTech Labs', plan: 'Growth', mrr: 890, ltv: 21360, renewalDate: '2026-09-01', supportTickets: 14, loginFrequency: '4/30 days', churnRisk: 82 },
    { id: '3', companyName: 'CloudBridge AI', plan: 'Enterprise', mrr: 6500, ltv: 234000, renewalDate: '2027-02-10', supportTickets: 0, loginFrequency: '28/30 days', churnRisk: 3 },
    { id: '4', companyName: 'QuickRetail Inc', plan: 'Starter', mrr: 290, ltv: 3480, renewalDate: '2026-09-20', supportTickets: 8, loginFrequency: '6/30 days', churnRisk: 68 },
  ]);

  const [isRecalculating, setIsRecalculating] = useState(false);

  const recalculateRisk = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setCustomers((prev) =>
        prev.map((c) => ({
          ...c,
          churnRisk: Math.min(99, Math.max(1, c.churnRisk + Math.floor((Math.random() - 0.5) * 10))),
        }))
      );
      setIsRecalculating(false);
    }, 650);
  };

  const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0);
  const atRiskRevenue = customers.filter((c) => c.churnRisk > 50).reduce((sum, c) => sum + c.mrr, 0);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-orange-500/5 border-orange-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
            <UserMinus className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              SaaS Subscription Churn & Customer LTV Predictor
            </h4>
            <p className="text-xs text-muted-foreground">
              Predicts subscription churn risk using product usage telemetry, MRR, support ticket velocity, and login frequency.
            </p>
          </div>
        </div>

        <Button
          onClick={recalculateRisk}
          disabled={isRecalculating}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isRecalculating ? 'animate-spin' : ''}`} />
          {isRecalculating ? 'Recalculating...' : 'Recalculate Churn Risk'}
        </Button>
      </div>

      {/* Customer Churn Table */}
      <div className="space-y-3">
        {customers.map((c) => (
          <div key={c.id} className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold text-sm text-foreground">{c.companyName}</span>
                <span className="ml-2 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-muted text-muted-foreground border border-border/40">{c.plan}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                c.churnRisk > 60 ? 'bg-red-500/20 text-red-500 animate-pulse' :
                c.churnRisk > 30 ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'
              }`}>
                {c.churnRisk > 60 ? '⚠️' : c.churnRisk > 30 ? '⚡' : '✅'} Churn Risk: {c.churnRisk}%
              </span>
            </div>

            <Progress
              value={c.churnRisk}
              className={`h-1.5 ${
                c.churnRisk > 60 ? 'bg-red-500/10' : c.churnRisk > 30 ? 'bg-amber-500/10' : 'bg-emerald-500/10'
              }`}
            />

            <div className="grid grid-cols-4 gap-4 text-[11px] font-mono text-muted-foreground">
              <div>
                <span className="block text-[9px] uppercase font-bold tracking-wider mb-0.5">MRR</span>
                <span className="text-foreground font-bold">${c.mrr.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold tracking-wider mb-0.5">Predicted LTV</span>
                <span className="text-emerald-500 font-bold">${c.ltv.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold tracking-wider mb-0.5">Support Tickets</span>
                <span className={`font-bold ${c.supportTickets > 10 ? 'text-red-500' : 'text-foreground'}`}>{c.supportTickets} open</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold tracking-wider mb-0.5">Login Activity</span>
                <span className="text-foreground font-bold">{c.loginFrequency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-between text-xs text-orange-500 font-semibold">
        <span className="flex items-center gap-2">
          <DollarSign className="size-4" /> Total MRR: ${totalMrr.toLocaleString()} • At-Risk MRR: ${atRiskRevenue.toLocaleString()}
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Renewal Window: 90 Days</span>
      </div>
    </div>
  );
}
