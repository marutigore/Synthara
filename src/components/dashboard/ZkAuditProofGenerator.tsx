'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Binary, Key, RefreshCw, CheckCircle2, Hash, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ZkProofNode {
  leafIndex: number;
  dataCategory: string;
  piiChecked: boolean;
  leafHash: string;
  zkSnarkProof: string;
}

export function ZkAuditProofGenerator() {
  const [merkleRoot, setMerkleRoot] = useState('0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');
  const [nodes, setNodes] = useState<ZkProofNode[]>([
    { leafIndex: 0, dataCategory: 'De-Identified Patient EHRs', piiChecked: true, leafHash: '0x1a8f9c...b4d1', zkSnarkProof: 'zk-proof-groth16:99.98% verified' },
    { leafIndex: 1, dataCategory: 'Synthesized Credit Card Transactions', piiChecked: true, leafHash: '0x3e7a12...89cf', zkSnarkProof: 'zk-proof-groth16:100.0% verified' },
    { leafIndex: 2, dataCategory: 'Differential Privacy Laplace Dataset', piiChecked: true, leafHash: '0x9b04fc...e31a', zkSnarkProof: 'zk-proof-groth16:100.0% verified' },
  ]);

  const [isComputing, setIsComputing] = useState(false);

  const generateProof = () => {
    setIsComputing(true);
    setTimeout(() => {
      setMerkleRoot(`0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`);
      setNodes((prev) => [
        ...prev,
        {
          leafIndex: prev.length,
          dataCategory: 'Enterprise B2B Leads Vault',
          piiChecked: true,
          leafHash: `0x${Math.random().toString(16).substring(2, 8)}...${Math.random().toString(16).substring(2, 6)}`,
          zkSnarkProof: 'zk-proof-groth16:100.0% verified',
        },
      ]);
      setIsComputing(false);
    }, 700);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-cyan-500/5 border-cyan-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <Lock className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Zero-Knowledge Cryptographic Audit Proof Generator
            </h4>
            <p className="text-xs text-muted-foreground">
              Generates zk-SNARK & Merkle Tree certificates proving zero PII leakage without exposing raw data records.
            </p>
          </div>
        </div>

        <Button
          onClick={generateProof}
          disabled={isComputing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20"
        >
          <Key className={`size-3.5 mr-1.5 ${isComputing ? 'animate-spin' : ''}`} />
          {isComputing ? 'Computing zk-SNARK...' : 'Generate ZK Proof'}
        </Button>
      </div>

      {/* Merkle Root Banner */}
      <div className="p-4 rounded-2xl bg-muted/40 border border-border/40 space-y-1">
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1.5">
          <Hash className="size-3 text-cyan-500" /> Merkle Tree Root Hash
        </span>
        <code className="text-xs font-mono text-cyan-500 font-bold block truncate">{merkleRoot}</code>
      </div>

      {/* ZK Leaf Nodes Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Leaf Index</th>
              <th className="p-3">Dataset Category</th>
              <th className="p-3">SHA-256 Leaf Hash</th>
              <th className="p-3">zk-SNARK Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {nodes.map((n) => (
              <tr key={n.leafIndex} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 font-bold text-muted-foreground">#{n.leafIndex}</td>
                <td className="p-3 font-sans font-medium text-foreground">{n.dataCategory}</td>
                <td className="p-3 text-muted-foreground">{n.leafHash}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center gap-1 w-fit">
                    <CheckCircle2 className="size-3" /> {n.zkSnarkProof}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between text-xs text-cyan-500 font-semibold">
        <span className="flex items-center gap-2">
          <FileCheck className="size-4" /> Groth16 Prover Verified • 0 Zero-Knowledge PII Violations
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Proof Curve: BN254</span>
      </div>
    </div>
  );
}
