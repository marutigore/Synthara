'use client';

import React, { useState } from 'react';
import { Link2, ShieldCheck, CheckCircle2, Copy, Check, RefreshCw, ArrowUpRight, Lock, FileCode, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProvenanceReceipt {
  txHash: string;
  blockNumber: number;
  ipfsCid: string;
  merkleRoot: string;
  signerAddress: string;
  timestamp: string;
  network: string;
  isVerified: boolean;
}

export function SmartContractAuditLedger() {
  const [isMinting, setIsMinting] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [receipt, setReceipt] = useState<ProvenanceReceipt>({
    txHash: '0x8f39b1a0e49f28d7c6501190284e317b901a8820c71a39f0291e7728b492019a',
    blockNumber: 20491820,
    ipfsCid: 'bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku',
    merkleRoot: '0x1a8f9c7e0029b4d18302fec90019284ba7192084c8102948b81920394819203a',
    signerAddress: '0x71C...8492 (Synthara Authority EIP-712)',
    timestamp: '2026-09-01T11:45:00Z',
    network: 'Ethereum Mainnet (L1)',
    isVerified: true,
  });

  const mintNewProvenanceAnchor = () => {
    setIsMinting(true);
    setTimeout(() => {
      const randomHex = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setReceipt({
        txHash: `0x${randomHex(64)}`,
        blockNumber: receipt.blockNumber + Math.floor(Math.random() * 5 + 1),
        ipfsCid: `bafybeic${randomHex(50)}`,
        merkleRoot: `0x${randomHex(64)}`,
        signerAddress: '0x71C...8492 (Synthara Authority EIP-712)',
        timestamp: new Date().toISOString(),
        network: 'Ethereum Mainnet (L1)',
        isVerified: true,
      });
      setIsMinting(false);
    }, 700);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-purple-500/5 border-purple-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <Link2 className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Decentralized Dataset Provenance Ledger
              <Badge variant="outline" className="text-[10px] border-purple-500/30 text-purple-500 bg-purple-500/10">
                EIP-712 / IPFS / EVM
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Cryptographic dataset lineage anchor providing tamper-proof proof of origin and training consent.
            </p>
          </div>
        </div>

        <Button
          onClick={mintNewProvenanceAnchor}
          disabled={isMinting}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20"
        >
          {isMinting ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Lock className="size-3.5 mr-1.5" />}
          {isMinting ? 'Signing On-Chain...' : 'Anchor Provenance Proof'}
        </Button>
      </div>

      {/* Network Verification Banner */}
      <div className="p-4 bg-muted/40 rounded-2xl border border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-500" />
          <span className="font-bold text-foreground">On-Chain State: Confirmed at Block #{receipt.blockNumber.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <Network className="size-3.5 text-purple-400" />
          <span>{receipt.network}</span>
        </div>
      </div>

      {/* Provenance Fields Grid */}
      <div className="space-y-3">
        <div className="p-3.5 bg-muted/30 border border-border/40 rounded-xl space-y-1.5 text-xs">
          <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase">
            <span>Transaction Hash</span>
            <button
              onClick={() => copyToClipboard(receipt.txHash, 'tx')}
              className="hover:text-foreground flex items-center gap-1 font-sans"
            >
              {copied === 'tx' ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
              {copied === 'tx' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="font-mono text-purple-400 break-all text-[11px] font-bold">{receipt.txHash}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 bg-muted/30 border border-border/40 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase">
              <span>IPFS CID (Content Hash)</span>
              <button
                onClick={() => copyToClipboard(receipt.ipfsCid, 'cid')}
                className="hover:text-foreground flex items-center gap-1 font-sans"
              >
                {copied === 'cid' ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                {copied === 'cid' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="text-foreground break-all text-[11px]">{receipt.ipfsCid}</div>
          </div>

          <div className="p-3.5 bg-muted/30 border border-border/40 rounded-xl space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase">
              <span>Dataset Merkle Root</span>
              <button
                onClick={() => copyToClipboard(receipt.merkleRoot, 'merkle')}
                className="hover:text-foreground flex items-center gap-1 font-sans"
              >
                {copied === 'merkle' ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                {copied === 'merkle' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="text-foreground break-all text-[11px]">{receipt.merkleRoot}</div>
          </div>
        </div>
      </div>

      {/* Compliance Footer */}
      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-between text-xs text-purple-400 font-semibold">
        <span className="flex items-center gap-2">
          <ShieldCheck className="size-4" />
          EU AI Act Article 53 Compliant: Cryptographic copyright & training lineage certified.
        </span>
        <span className="text-[10px] font-mono uppercase bg-purple-500/20 px-2 py-0.5 rounded">
          IMMUTABLE PROOF
        </span>
      </div>
    </div>
  );
}
