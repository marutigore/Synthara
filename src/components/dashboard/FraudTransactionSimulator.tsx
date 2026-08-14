'use client';

import React, { useState } from 'react';
import { CreditCard, AlertTriangle, ShieldAlert, CheckCircle2, Play, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Transaction {
  id: string;
  txHash: string;
  amount: number;
  merchantCategory: string;
  location: string;
  isFraud: boolean;
  fraudReason?: string;
  timestamp: string;
}

export function FraudTransactionSimulator() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', txHash: '0x8f2a...91b0', amount: 14.50, merchantCategory: 'Coffee & Dining', location: 'New York, USA', isFraud: false, timestamp: '12:04:15' },
    { id: '2', txHash: '0x3c1d...44e2', amount: 4890.00, merchantCategory: 'Crypto ATM Exchange', location: 'Lagos, Nigeria (Speed: 8000 mph)', isFraud: true, fraudReason: 'Impossible Velocity Jump', timestamp: '12:04:22' },
    { id: '3', txHash: '0x7e9f...10a5', amount: 89.20, merchantCategory: 'E-Commerce Retail', location: 'New York, USA', isFraud: false, timestamp: '12:04:30' },
    { id: '4', txHash: '0x1a4b...88c9', amount: 9999.99, merchantCategory: 'Offshore Electronics', location: 'Grand Cayman', isFraud: true, fraudReason: 'High-Risk Velocity Peak', timestamp: '12:04:35' },
  ]);

  const [isSimulating, setIsSimulating] = useState(false);

  const simulateMore = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const isFraudulent = Math.random() > 0.6;
      const newTx: Transaction = {
        id: Date.now().toString(),
        txHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
        amount: isFraudulent ? parseFloat((Math.random() * 5000 + 2000).toFixed(2)) : parseFloat((Math.random() * 150 + 5).toFixed(2)),
        merchantCategory: isFraudulent ? 'High-Risk Gambling' : 'Grocery & Fuel',
        location: isFraudulent ? 'Unknown IP Proxy / VPN' : 'San Francisco, USA',
        isFraud: isFraudulent,
        fraudReason: isFraudulent ? 'Anomaly Score > 0.95' : undefined,
        timestamp: new Date().toLocaleTimeString(),
      };

      setTransactions((prev) => [newTx, ...prev.slice(0, 4)]);
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-red-500/5 border-red-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
            <CreditCard className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Financial Fraud & Transaction Anomaly Simulator
            </h4>
            <p className="text-xs text-muted-foreground">
              Generates banking streams with embedded fraud anomalies (geo-velocity, high-risk categories).
            </p>
          </div>
        </div>

        <Button
          onClick={simulateMore}
          disabled={isSimulating}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-600/20"
        >
          <Play className={`size-3.5 mr-1.5 ${isSimulating ? 'animate-spin' : ''}`} />
          {isSimulating ? 'Simulating...' : 'Stream Transaction'}
        </Button>
      </div>

      {/* Transactions Feed */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Tx Hash & Time</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Merchant Category</th>
              <th className="p-3">Geo-Location</th>
              <th className="p-3">Risk Assessment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="font-mono font-bold text-foreground">{tx.txHash}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{tx.timestamp}</div>
                </td>
                <td className="p-3 font-bold text-foreground">${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                <td className="p-3 text-muted-foreground">{tx.merchantCategory}</td>
                <td className="p-3 text-muted-foreground">{tx.location}</td>
                <td className="p-3">
                  {tx.isFraud ? (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-500/20 text-red-500 border border-red-500/30 flex items-center gap-1 w-fit">
                      <AlertTriangle className="size-3" /> {tx.fraudReason || 'Fraud Alert'}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="size-3" /> Legitimate
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between text-xs text-red-500 font-semibold">
        <span className="flex items-center gap-2">
          <ShieldAlert className="size-4" /> Anti-Fraud Classifier Training Set Prepared • Anomaly Ratio: 50%
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Model Parity: High</span>
      </div>
    </div>
  );
}
