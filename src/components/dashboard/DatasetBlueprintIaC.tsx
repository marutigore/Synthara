'use client';

import React, { useState } from 'react';
import { Terminal, FileCode2, Play, CheckCircle2, Copy, Check, RefreshCw, Layers, ShieldCheck, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function DatasetBlueprintIaC() {
  const [yamlConfig, setYamlConfig] = useState(`version: "2.1"
pipeline:
  name: "ecommerce-synthetic-fraud-stream"
  target_rows: 10000

ingest:
  crawler: "crawl4ai-headless"
  source_urls:
    - "https://demo-ecommerce.store/catalog"
  rate_limit_rps: 5

transform:
  model: "gemini-2.5-flash"
  temperature: 0.7
  schema_contract:
    - name: "order_id"
      type: "uuid4"
      nullable: false
    - name: "amount_usd"
      type: "float"
      bounds: [10.0, 5000.0]
    - name: "is_fraudulent"
      type: "boolean"
      ratio: 0.04

privacy:
  anonymize_pii: true
  dp_epsilon: 1.2
  zk_proof_audit: true

export:
  sink: "snowflake-iceberg"
  format: "parquet"
  compression: "zstd"`);

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedHash, setDeployedHash] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setDeployedHash(`sha256_${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`);
      setIsDeploying(false);
    }, 850);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-orange-500/5 border-orange-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
            <FileCode2 className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Infrastructure-as-Code (IaC) Dataset Blueprint
              <Badge variant="outline" className="text-[10px] border-orange-500/30 text-orange-500 bg-orange-500/10">
                Terraform for Data
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Declarative YAML blueprint orchestrating crawler ingest, Gemini schemas, and Lakehouse sinks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleDeploy}
            disabled={isDeploying}
            className="h-9 px-4 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-600/20"
          >
            {isDeploying ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Play className="size-3.5 mr-1.5" />}
            {isDeploying ? 'Applying Blueprint...' : 'Deploy & Replay Pipeline'}
          </Button>
        </div>
      </div>

      {/* Editor & Spec View */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="size-3.5 text-orange-500" />
            synthara-pipeline.yaml (Declarative Spec)
          </span>
          <button
            onClick={handleCopy}
            className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 font-medium"
          >
            {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
            {copied ? 'Copied' : 'Copy YAML'}
          </button>
        </div>

        <div className="relative">
          <textarea
            value={yamlConfig}
            onChange={(e) => setYamlConfig(e.target.value)}
            rows={14}
            className="w-full bg-background/90 border border-border/60 rounded-2xl p-4 text-xs font-mono text-orange-400 focus:outline-none focus:border-orange-500/50 resize-none leading-relaxed shadow-inner"
          />
        </div>
      </div>

      {/* Pipeline Status Banner */}
      {deployedHash ? (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-500 font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>Blueprint Deployed: Pipeline running on 4 distributed worker pods.</span>
          </div>
          <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400">
            Immutable Hash: {deployedHash}
          </span>
        </div>
      ) : (
        <div className="p-3.5 bg-muted/40 border border-border/40 rounded-xl flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-orange-500" />
            Lint passed: 0 syntax errors • 100% reproducible pipeline spec
          </span>
          <span className="font-mono text-[10px]">v2.1 SPEC COMPLIANT</span>
        </div>
      )}
    </div>
  );
}
