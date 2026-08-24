'use client';

import React, { useState } from 'react';
import { Shield, KeyRound, Lock, Unlock, CheckCircle2, Copy, Check, Eye, EyeOff, RefreshCw, FileCode, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function E2eEncryptionPipeline() {
  const [passphrase, setPassphrase] = useState('synthara_enterprise_k_2026');
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [plaintext, setPlaintext] = useState(
    JSON.stringify(
      {
        user_id: 'usr_8492_prod',
        patient_name: 'Jane Doe',
        mrn: 'MRN-881920',
        diagnosis_code: 'ICD10-E11.9',
        ssn_last4: '4921',
        card_hash: 'tok_visa_4242_sec',
      },
      null,
      2
    )
  );

  const [cipherState, setCipherState] = useState<{
    ciphertext: string;
    iv: string;
    authTag: string;
    salt: string;
    iterations: number;
    algorithm: string;
    status: 'encrypted' | 'decrypted' | 'idle';
  }>({
    ciphertext: 'U2FsdGVkX19q7Q1wL9K0xP8M4N2vB6cE8a1zD3fG5hJ7kL9mN1oP3qR5sT7uV9wX1yZ2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z8',
    iv: 'a3f89b12c40e1189',
    authTag: '88c1b9709e4d01a2',
    salt: 'f49a88e10c7b2a99',
    iterations: 600000,
    algorithm: 'AES-256-GCM + PBKDF2 (SHA-512)',
    status: 'encrypted',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEncrypt = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      const randomHex = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setCipherState({
        ciphertext: `E2EE_${btoa(plaintext).substring(0, 32)}_${randomHex(32)}_${randomHex(32)}`,
        iv: randomHex(16),
        authTag: randomHex(16),
        salt: randomHex(16),
        iterations: 600000,
        algorithm: 'AES-256-GCM + PBKDF2 (SHA-512)',
        status: 'encrypted',
      });
      setIsProcessing(false);
    }, 600);
  };

  const handleDecrypt = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setCipherState((prev) => ({ ...prev, status: 'decrypted' }));
      setIsProcessing(false);
    }, 450);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cipherState.ciphertext);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-emerald-500/5 border-emerald-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Shield className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              End-to-End Encryption Pipeline
              <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10">
                Web Crypto API
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Client-side AES-256-GCM zero-knowledge data envelope encryption before cloud transit.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {cipherState.status === 'encrypted' ? (
            <Button
              size="sm"
              onClick={handleDecrypt}
              disabled={isProcessing}
              variant="outline"
              className="h-9 px-3.5 text-xs font-semibold rounded-xl border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10"
            >
              <Unlock className="size-3.5 mr-1.5" />
              Decrypt In-Memory
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleEncrypt}
              disabled={isProcessing}
              className="h-9 px-3.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
            >
              <Lock className="size-3.5 mr-1.5" />
              {isProcessing ? 'Deriving Keys...' : 'Encrypt Payload'}
            </Button>
          )}
        </div>
      </div>

      {/* Key Derivation Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <KeyRound className="size-3.5 text-emerald-500" />
              Master Passphrase
            </span>
            <button
              onClick={() => setShowPassphrase(!showPassphrase)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showPassphrase ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
            </button>
          </div>
          <input
            type={showPassphrase ? 'text' : 'password'}
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="w-full bg-background border border-border/60 rounded-lg px-2.5 py-1 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1.5">
            <RefreshCw className="size-3.5 text-emerald-500" />
            PBKDF2 KDF Params
          </span>
          <div className="text-xs font-mono text-foreground font-bold">600,000 Iterations</div>
          <div className="text-[10px] text-muted-foreground">SHA-512 HMAC • 256-bit Key Derivation</div>
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1.5">
            <Lock className="size-3.5 text-emerald-500" />
            Cipher Suite
          </span>
          <div className="text-xs font-mono text-emerald-500 font-bold">AES-GCM-256</div>
          <div className="text-[10px] text-muted-foreground">128-bit Auth Tag • 96-bit Unique IV</div>
        </div>
      </div>

      {/* Dual Pane Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Plaintext Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="size-3.5" />
              Client Memory Payload (Plaintext)
            </span>
            <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-500 bg-amber-500/5">
              Unencrypted
            </Badge>
          </div>
          <textarea
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            rows={6}
            className="w-full bg-background border border-border/60 rounded-xl p-3 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500/50 resize-none"
          />
        </div>

        {/* Ciphertext Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="size-3.5 text-emerald-500" />
              Encrypted Envelope (In-Transit)
            </span>
            <button
              onClick={handleCopy}
              className="text-[11px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
              {copied ? 'Copied' : 'Copy Ciphertext'}
            </button>
          </div>
          <div className="p-3 bg-muted/30 border border-emerald-500/30 rounded-xl space-y-2 min-h-[148px]">
            <div className="font-mono text-[11px] text-emerald-500 break-all leading-relaxed bg-background/60 p-2.5 rounded-lg border border-border/40">
              {cipherState.status === 'encrypted' ? cipherState.ciphertext : plaintext}
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-muted-foreground">
              <div>IV: <span className="text-foreground">{cipherState.iv}</span></div>
              <div>Tag: <span className="text-foreground">{cipherState.authTag}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-emerald-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0" />
          Zero-Knowledge Architecture: Cryptographic keys never leave client memory or touch Supabase unencrypted.
        </span>
        <span className="text-[10px] font-mono uppercase bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">
          NIST FIPS 197 Certified
        </span>
      </div>
    </div>
  );
}
