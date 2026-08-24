'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, Unlock, Key, KeyRound, Copy, Check, RefreshCw, FileCode, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function E2eEncryptionPipeline() {
  const [passphrase, setPassphrase] = useState('synthara-vault-sec-2026');
  const [rawText, setRawText] = useState(
    JSON.stringify([
      { id: 'usr_8492', ssn: '901-44-1182', salary: 142000, diagnosis: 'Hypertension' },
      { id: 'usr_8493', ssn: '812-33-9041', salary: 189000, diagnosis: 'Type-2 Diabetes' }
    ], null, 2)
  );
  const [cipherResult, setCipherResult] = useState<{
    ciphertext: string;
    ivHex: string;
    saltHex: string;
    algorithm: string;
    tagLength: number;
  } | null>(null);
  const [decryptedText, setDecryptedText] = useState<string | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Native Web Crypto API AES-256-GCM with PBKDF2 Key Derivation
  const handleEncrypt = async () => {
    setIsEncrypting(true);
    setDecryptedText(null);
    try {
      const enc = new TextEncoder();
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const iv = window.crypto.getRandomValues(new Uint8Array(12));

      // 1. Derive Key from Passphrase
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(passphrase),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );

      const aesKey = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );

      // 2. Encrypt Data
      const encryptedBuffer = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        aesKey,
        enc.encode(rawText)
      );

      const cipherArray = Array.from(new Uint8Array(encryptedBuffer));
      const cipherHex = cipherArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
      const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');

      setCipherResult({
        ciphertext: cipherHex,
        ivHex,
        saltHex,
        algorithm: 'AES-256-GCM (PBKDF2 100k iter)',
        tagLength: 128,
      });
    } catch (err) {
      console.error('Encryption failed:', err);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleDecrypt = async () => {
    if (!cipherResult) return;
    setIsDecrypting(true);
    try {
      const enc = new TextEncoder();
      const dec = new TextDecoder();

      // Hex to Uint8Array helpers
      const hexToBytes = (hex: string) => {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
          bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
        }
        return bytes;
      };

      const salt = hexToBytes(cipherResult.saltHex);
      const iv = hexToBytes(cipherResult.ivHex);
      const encryptedBytes = hexToBytes(cipherResult.ciphertext);

      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(passphrase),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );

      const aesKey = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );

      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        aesKey,
        encryptedBytes
      );

      setDecryptedText(dec = new TextDecoder().decode(decryptedBuffer));
    } catch (err) {
      setDecryptedText('❌ Decryption Failed: Invalid passphrase or corrupted ciphertext payload.');
    } finally {
      setIsDecrypting(false);
    }
  };

  const copyCiphertext = () => {
    if (!cipherResult) return;
    navigator.clipboard.writeText(JSON.stringify(cipherResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-emerald-500/5 border-emerald-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              End-to-End Client-Side AES-256-GCM Encryption Vault
            </h4>
            <p className="text-xs text-muted-foreground">
              Zero-knowledge browser-native encryption before data ever leaves your device to cloud storage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleEncrypt}
            disabled={isEncrypting}
            size="sm"
            className="h-9 px-3.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
          >
            {isEncrypting ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Lock className="size-3.5 mr-1.5" />}
            {isEncrypting ? 'Encrypting...' : 'Encrypt Dataset'}
          </Button>
        </div>
      </div>

      {/* Secret Passphrase and Salt settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1.5">
            <KeyRound className="size-3 text-emerald-500" /> PBKDF2 Secret Passphrase
          </label>
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="w-full bg-background border border-border/60 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold text-foreground focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 space-y-1.5">
          <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider flex items-center gap-1.5">
            <Key className="size-3 text-emerald-500" /> Cryptographic Parameters
          </label>
          <div className="text-xs font-mono text-muted-foreground flex items-center justify-between pt-1">
            <span>Algorithm: <strong className="text-foreground">AES-GCM-256</strong></span>
            <span>Derivation: <strong className="text-emerald-500">100k SHA-256</strong></span>
          </div>
        </div>
      </div>

      {/* Raw Payload vs Encrypted Ciphertext */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
            Raw Plaintext Synthetic Records
          </span>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            rows={5}
            className="w-full bg-background/80 border border-border/60 rounded-xl p-3 text-xs font-mono text-foreground focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
              Encrypted Envelope Ciphertext (Hex)
            </span>
            {cipherResult && (
              <button onClick={copyCiphertext} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                {copied ? 'Copied' : 'Copy Envelope'}
              </button>
            )}
          </div>
          <div className="w-full bg-muted/40 border border-border/60 rounded-xl p-3 text-xs font-mono text-emerald-500 break-all h-[115px] overflow-y-auto">
            {cipherResult ? (
              <div className="space-y-1">
                <div><span className="text-muted-foreground">IV:</span> {cipherResult.ivHex}</div>
                <div><span className="text-muted-foreground">Salt:</span> {cipherResult.saltHex}</div>
                <div><span className="text-muted-foreground">Cipher:</span> {cipherResult.ciphertext.slice(0, 80)}...</div>
              </div>
            ) : (
              <span className="text-muted-foreground italic">Click "Encrypt Dataset" to generate AES-256-GCM cipher envelope...</span>
            )}
          </div>
        </div>
      </div>

      {/* Decrypt Action and Result */}
      {cipherResult && (
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Unlock className="size-4 text-emerald-500" /> Client-Side Decryption Verification
            </span>
            <Button
              onClick={handleDecrypt}
              disabled={isDecrypting}
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs font-bold rounded-lg border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10"
            >
              {isDecrypting ? 'Decrypting...' : 'Verify Decryption'}
            </Button>
          </div>
          {decryptedText && (
            <pre className="p-3 bg-background rounded-lg border border-border/40 text-xs font-mono text-foreground whitespace-pre-wrap overflow-x-auto">
              {decryptedText}
            </pre>
          )}
        </div>
      )}

      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-500 font-semibold">
        <span className="flex items-center gap-2">
          <ShieldAlert className="size-4" /> Zero-Knowledge Client Architecture • Keys Never Transmit to Server
        </span>
        <span className="font-mono text-[10px] uppercase font-bold tracking-wider">FIPS 197 Validated</span>
      </div>
    </div>
  );
}
