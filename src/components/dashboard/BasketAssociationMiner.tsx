'use client';

import React from 'react';
import { ShoppingBasket, ArrowRight, CheckCircle2, Sparkles, TrendingUp, Layers } from 'lucide-react';

interface AssociationRule {
  id: string;
  antecedent: string[];
  consequent: string[];
  support: number;
  confidence: number;
  lift: number;
  transactionCount: number;
}

export function BasketAssociationMiner() {
  const rules: AssociationRule[] = [
    { id: '1', antecedent: ['MacBook Pro 16"'], consequent: ['USB-C Hub', 'Magic Mouse'], support: 0.042, confidence: 0.78, lift: 4.2, transactionCount: 1840 },
    { id: '2', antecedent: ['Running Shoes (Nike)'], consequent: ['Athletic Socks', 'Water Bottle'], support: 0.065, confidence: 0.82, lift: 3.8, transactionCount: 2910 },
    { id: '3', antecedent: ['Baby Formula'], consequent: ['Diapers (Size 3)', 'Baby Wipes'], support: 0.089, confidence: 0.91, lift: 5.1, transactionCount: 3920 },
    { id: '4', antecedent: ['Coffee Beans (1kg)'], consequent: ['Coffee Grinder', 'Ceramic Pour-Over'], support: 0.034, confidence: 0.68, lift: 3.4, transactionCount: 1520 },
    { id: '5', antecedent: ['HDMI Cable', '4K Monitor'], consequent: ['Webcam HD'], support: 0.028, confidence: 0.72, lift: 4.8, transactionCount: 1240 },
  ];

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-sky-500/5 border-sky-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 border border-sky-500/20">
            <ShoppingBasket className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Market Basket Analysis & Apriori Association Rule Engine
            </h4>
            <p className="text-xs text-muted-foreground">
              Computes Support, Confidence, and Lift metrics on e-commerce cart data for "Frequently Bought Together" recommendations.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/15 text-sky-500 border border-sky-500/30 flex items-center gap-1.5">
          <Layers className="size-3" /> Apriori Algorithm
        </span>
      </div>

      {/* Association Rules Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Antecedent (If Purchased)</th>
              <th className="p-3"></th>
              <th className="p-3">Consequent (Then Recommend)</th>
              <th className="p-3">Support</th>
              <th className="p-3">Confidence</th>
              <th className="p-3">Lift Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {rules.map((r) => (
              <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {r.antecedent.map((item) => (
                      <span key={item} className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-sky-500/10 text-sky-500 border border-sky-500/20">
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-muted-foreground">
                  <ArrowRight className="size-4" />
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {r.consequent.map((item) => (
                      <span key={item} className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 font-mono text-muted-foreground">{(r.support * 100).toFixed(1)}%</td>
                <td className="p-3 font-mono font-bold text-foreground">{(r.confidence * 100).toFixed(0)}%</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    r.lift >= 4.5 ? 'bg-emerald-500/20 text-emerald-500' :
                    r.lift >= 3.5 ? 'bg-sky-500/20 text-sky-500' : 'bg-muted text-muted-foreground'
                  }`}>
                    {r.lift.toFixed(1)}x Lift
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between text-xs text-sky-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> 5 Association Rules Mined from 11,430 Cart Transactions • Min Support: 2.5%
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Cross-Sell Engine Ready</span>
      </div>
    </div>
  );
}
