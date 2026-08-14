'use client';

import React, { useState } from 'react';
import { Bot, Code2, Copy, Check, Sparkles, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LlmDatasetFormatter() {
  const [copied, setCopied] = useState(false);

  const jsonlOutput = `{"messages": [{"role": "system", "content": "You are a Synthara AI financial assistant."}, {"role": "user", "content": "What is the Q3 revenue for Tesla?"}, {"role": "assistant", "content": "Tesla reported Q3 revenue of $25.18 billion, a 8% increase YoY."}]}
{"messages": [{"role": "system", "content": "You are a Synthara AI financial assistant."}, {"role": "user", "content": "Analyze competitor discount rates for Sony headphones."}, {"role": "assistant", "content": "Sony WH-1000XM5 is currently discounted at 13% ($348.00 vs $399.99 MSRP)."}]}
{"messages": [{"role": "system", "content": "You are a Synthara AI financial assistant."}, {"role": "user", "content": "What is the HIPAA de-identification status for patient SYN-EHR-9081?"}, {"role": "assistant", "content": "Patient SYN-EHR-9081 is fully de-identified under HIPAA Safe Harbor rules."}]}
`;

  const copyJsonl = () => {
    navigator.clipboard.writeText(jsonlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-purple-500/5 border-purple-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <Bot className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              LLM Fine-Tuning Instruct & Chat JSONL Formatter
            </h4>
            <p className="text-xs text-muted-foreground">
              Converts raw web content into OpenAI / HuggingFace Alpaca JSONL instruction format for fine-tuning.
            </p>
          </div>
        </div>

        <Button
          onClick={copyJsonl}
          size="sm"
          variant="outline"
          className="h-9 px-3 text-xs font-bold rounded-xl border-border/50"
        >
          {copied ? <Check className="size-3.5 text-emerald-500 mr-1.5" /> : <Copy className="size-3.5 mr-1.5" />}
          {copied ? 'Copied JSONL' : 'Copy Fine-Tuning JSONL'}
        </Button>
      </div>

      {/* Code Box */}
      <div className="p-4 rounded-2xl bg-black/90 border border-border/20 space-y-2 text-xs font-mono text-zinc-300">
        <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase font-bold">
          <span className="flex items-center gap-1.5"><FileCode className="size-3.5 text-purple-400" /> OpenAI / Mistral Chat JSONL Stream</span>
          <span className="text-emerald-500 font-mono">Format: ChatML / Alpaca</span>
        </div>
        <pre className="text-[11px] leading-relaxed text-purple-300 overflow-x-auto max-h-44">
          {jsonlOutput}
        </pre>
      </div>

      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs text-purple-500 font-semibold">
        <span className="flex items-center gap-2">
          <Sparkles className="size-4" /> Ready for Llama 3, OpenAI gpt-4o-mini, & DeepSeek Fine-Tuning
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">3 Instruct Examples</span>
      </div>
    </div>
  );
}
