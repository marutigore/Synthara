'use client';

import React, { useState } from 'react';
import { Code2, Play, Copy, Check, Terminal, Server, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApiEndpoint {
  method: 'POST' | 'GET' | 'DELETE';
  path: string;
  title: string;
  description: string;
  sampleBody: string;
  sampleResponse: string;
}

export function ApiPlayground() {
  const endpoints: ApiEndpoint[] = [
    {
      method: 'POST',
      path: '/api/generate',
      title: 'Generate Synthetic Dataset',
      description: 'Trigger autonomous crawling & AI synthesis pipeline.',
      sampleBody: JSON.stringify({ prompt: "Generate 50 ecommerce order records", numRows: 50, format: "csv" }, null, 2),
      sampleResponse: JSON.stringify({ status: "success", jobId: "job_9f821a", datasetUrl: "/api/datasets/download/job_9f821a.csv", numRows: 50 }, null, 2),
    },
    {
      method: 'GET',
      path: '/api/health',
      title: 'Check Node Health',
      description: 'Fetch real-time microservice ping & Crawl4AI status.',
      sampleBody: '{}',
      sampleResponse: JSON.stringify({ status: "healthy", crawlerPort: 11235, latencyMs: 14, uptime: "99.99%" }, null, 2),
    },
    {
      method: 'POST',
      path: '/api/anonymize',
      title: 'Anonymize Sensitive Data (PII)',
      description: 'Apply Laplace differential privacy and email/phone masking.',
      sampleBody: JSON.stringify({ text: "Contact user john.doe@example.com at +1-555-0192", epsilon: 0.5 }, null, 2),
      sampleResponse: JSON.stringify({ maskedText: "Contact user [EMAIL_MASKED] at [PHONE_MASKED]", piiCount: 2 }, null, 2),
    },
  ];

  const [activeEndpoint, setActiveEndpoint] = useState<ApiEndpoint>(endpoints[0]);
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const executeRequest = () => {
    setLoading(true);
    setResponseOutput(null);
    setTimeout(() => {
      setResponseOutput(activeEndpoint.sampleResponse);
      setLoading(false);
    }, 600);
  };

  const curlSnippet = `curl -X ${activeEndpoint.method} "https://synthara.ai${activeEndpoint.path}" \\
  -H "Authorization: Bearer syn_live_9a81f72" \\
  -H "Content-Type: application/json" \\
  -d '${activeEndpoint.sampleBody.replace(/\n/g, '')}'`;

  const copyCurl = () => {
    navigator.clipboard.writeText(curlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Endpoints Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {endpoints.map((ep) => {
          const isSelected = ep.path === activeEndpoint.path;
          return (
            <button
              key={ep.path}
              onClick={() => {
                setActiveEndpoint(ep);
                setResponseOutput(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                  : 'bg-card text-foreground border-border/40 hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md font-mono ${
                    ep.method === 'POST' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {ep.method}
                </span>
                <span className={`text-[10px] font-mono font-bold ${isSelected ? 'opacity-90' : 'text-muted-foreground'}`}>
                  {ep.path}
                </span>
              </div>
              <h4 className="text-xs font-bold truncate">{ep.title}</h4>
            </button>
          );
        })}
      </div>

      {/* Request Execution Console */}
      <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-secondary/30 border-border/50">
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-black bg-primary/20 text-primary">
                {activeEndpoint.method}
              </span>
              <h3 className="font-headline font-bold text-base text-foreground font-mono">
                {activeEndpoint.path}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">{activeEndpoint.description}</p>
          </div>

          <Button
            onClick={executeRequest}
            disabled={loading}
            className="h-10 px-5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 text-xs"
          >
            <Play className="size-4 mr-1.5" /> {loading ? 'Executing...' : 'Test Endpoint'}
          </Button>
        </div>

        {/* cURL Code Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-bold">
            <span className="flex items-center gap-1.5"><Terminal className="size-3.5 text-primary" /> cURL Request Snippet</span>
            <button onClick={copyCurl} className="hover:text-foreground flex items-center gap-1 text-[11px]">
              {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
              {copied ? 'Copied' : 'Copy cURL'}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-black/90 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-border/20">
            {curlSnippet}
          </pre>
        </div>

        {/* Live Response Viewer */}
        {responseOutput && (
          <div className="space-y-2 animate-in fade-in-0 duration-300">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-500 flex items-center gap-1">
                <ShieldCheck className="size-4" /> HTTP 200 OK (Response Received)
              </span>
              <span className="text-muted-foreground text-[10px] font-mono">Latency: 48ms</span>
            </div>
            <pre className="p-4 rounded-2xl bg-black/95 text-cyan-400 font-mono text-xs overflow-x-auto leading-relaxed border border-emerald-500/30 shadow-inner">
              {responseOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
