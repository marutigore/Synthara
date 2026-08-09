'use client';

import React, { useState } from 'react';
import { Network, Globe, Server, Cpu, ShieldCheck, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Node {
  id: string;
  title: string;
  subtitle: string;
  type: 'source' | 'crawler' | 'ai' | 'privacy' | 'destination';
  status: 'completed' | 'processing' | 'queued';
  icon: React.ElementType;
}

export function DataLineageGraph() {
  const [selectedNode, setSelectedNode] = useState<string>('node-3');

  const nodes: Node[] = [
    {
      id: 'node-1',
      title: 'Target Web Source',
      subtitle: 'https://news.ycombinator.com',
      type: 'source',
      status: 'completed',
      icon: Globe,
    },
    {
      id: 'node-2',
      title: 'Crawl4AI Headless Node',
      subtitle: 'Port 11235 / Docker Container',
      type: 'crawler',
      status: 'completed',
      icon: Server,
    },
    {
      id: 'node-3',
      title: 'DeepSeek Schema Cleaner',
      subtitle: 'OpenRouter LLM Inference',
      type: 'ai',
      status: 'completed',
      icon: Cpu,
    },
    {
      id: 'node-4',
      title: 'Laplace Privacy Anonymizer',
      subtitle: 'ε = 0.5 Differential Privacy',
      type: 'privacy',
      status: 'completed',
      icon: ShieldCheck,
    },
    {
      id: 'node-5',
      title: 'Final Synthetic Dataset',
      subtitle: 'CSV / Encrypted ZIP Vault',
      type: 'destination',
      status: 'completed',
      icon: Download,
    },
  ];

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card to-primary/5 border-primary/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <Network className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground">
              Data Lineage & Provenance Graph
            </h4>
            <p className="text-xs text-muted-foreground">
              Visual end-to-end DAG lineage tracing from raw URL to clean dataset export.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1.5">
          <CheckCircle2 className="size-3" /> Verifiable Provenance
        </span>
      </div>

      {/* Interactive DAG Pipeline */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 overflow-x-auto p-4 rounded-2xl bg-muted/30 border border-border/40">
        {nodes.map((node, index) => {
          const IconComp = node.icon;
          const isSelected = node.id === selectedNode;
          return (
            <React.Fragment key={node.id}>
              <div
                onClick={() => setSelectedNode(node.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex-1 min-w-[160px] space-y-2 ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-card text-foreground border-border/50 hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-xl ${
                      isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <IconComp className="size-4" />
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-emerald-500/10 text-emerald-500'
                    }`}
                  >
                    {node.status}
                  </span>
                </div>

                <div>
                  <h5 className="text-xs font-bold truncate">{node.title}</h5>
                  <p
                    className={`text-[10px] font-mono truncate ${
                      isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}
                  >
                    {node.subtitle}
                  </p>
                </div>
              </div>

              {index < nodes.length - 1 && (
                <ArrowRight className="size-4 text-muted-foreground/50 hidden md:block flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <div className="p-4 rounded-2xl bg-card border border-border/50 space-y-2 text-xs">
        <h5 className="font-bold text-foreground flex items-center gap-2">
          <span>Inspect Transformation Stage:</span>
          <span className="text-primary font-mono">{nodes.find((n) => n.id === selectedNode)?.title}</span>
        </h5>
        <p className="text-muted-foreground leading-relaxed">
          Stage verified by zero-knowledge execution log hash <code className="text-primary font-mono font-bold">sha256:8f92a1...c4b</code>. All PII transformation rules satisfied GDPR Article 32 data safety standards.
        </p>
      </div>
    </div>
  );
}
