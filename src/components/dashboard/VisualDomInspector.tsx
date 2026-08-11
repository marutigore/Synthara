'use client';

import React, { useState } from 'react';
import { MousePointer, Code, Table, CheckCircle2, Sparkles, Copy, Eye, ShieldAlert, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DomElement {
  id: string;
  tag: string;
  className: string;
  selector: string;
  sampleText: string;
  dataType: 'string' | 'number' | 'currency' | 'image_url';
  selected: boolean;
}

export function VisualDomInspector() {
  const [elements, setElements] = useState<DomElement[]>([
    { id: '1', tag: 'h2.product-title', className: 'text-2xl font-bold text-slate-900', selector: 'div.product-card > h2.product-title', sampleText: 'Tesla Model Y Performance (2026)', dataType: 'string', selected: true },
    { id: '2', tag: 'span.price-tag', className: 'text-emerald-600 font-bold text-xl', selector: 'div.price-box > span.price-tag', sampleText: '$54,990', dataType: 'currency', selected: true },
    { id: '3', tag: 'span.stock-status', className: 'badge bg-emerald-100 text-emerald-800', selector: 'div.status-wrap > span.stock-status', sampleText: 'In Stock (14 units)', dataType: 'string', selected: false },
    { id: '4', tag: 'td.battery-range', className: 'font-mono text-sm', selector: 'table.specs-table td.range', sampleText: '330 miles (EPA est.)', dataType: 'string', selected: true },
    { id: '5', tag: 'span.rating-score', className: 'font-bold text-amber-500', selector: 'div.rating > span.score', sampleText: '4.85', dataType: 'number', selected: true },
  ]);

  const [copied, setCopied] = useState(false);

  const toggleSelect = (id: string) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, selected: !el.selected } : el)));
  };

  const selectedElements = elements.filter((el) => el.selected);

  const generatedSchema = JSON.stringify(
    selectedElements.map((el) => ({
      field_name: el.tag.split('.')[1] || el.tag.split('.')[0],
      css_selector: el.selector,
      inferred_type: el.dataType,
      sample_value: el.sampleText,
    })),
    null,
    2
  );

  const copySchema = () => {
    navigator.clipboard.writeText(generatedSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            <MousePointer className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Visual DOM Element Inspector & Selector
            </h4>
            <p className="text-xs text-muted-foreground">
              Click page elements on simulated web targets to auto-infer CSS selectors & JSON schemas.
            </p>
          </div>
        </div>

        <Button
          onClick={copySchema}
          size="sm"
          variant="outline"
          className="h-9 px-3 text-xs font-bold rounded-xl border-border/50"
        >
          {copied ? <CheckCircle2 className="size-3.5 text-emerald-500 mr-1.5" /> : <Copy className="size-3.5 mr-1.5" />}
          {copied ? 'Copied Schema' : 'Copy Extraction Schema'}
        </Button>
      </div>

      {/* Simulated DOM Canvas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground px-1">
          <span className="flex items-center gap-1.5"><Layers className="size-3.5 text-primary" /> Target Web Target DOM Structure</span>
          <span>{selectedElements.length} / {elements.length} Fields Selected</span>
        </div>

        <div className="space-y-2.5">
          {elements.map((el) => (
            <div
              key={el.id}
              onClick={() => toggleSelect(el.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ${
                el.selected
                  ? 'bg-primary/10 border-primary/40 shadow-sm ring-1 ring-primary/20'
                  : 'bg-muted/20 border-border/40 opacity-70 hover:opacity-100 hover:border-primary/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl font-mono text-[10px] font-bold ${
                  el.selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {el.tag}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground font-mono">{el.sampleText}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{el.selector}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-muted text-muted-foreground border border-border/40">
                  {el.dataType}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  el.selected ? 'bg-emerald-500/20 text-emerald-500' : 'bg-muted text-muted-foreground'
                }`}>
                  {el.selected ? 'Selected' : 'Click to Add'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Generated Selector Rules */}
      <div className="p-4 rounded-2xl bg-black/90 border border-border/20 space-y-2 text-xs font-mono">
        <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase font-bold">
          <span className="flex items-center gap-1.5"><Code className="size-3.5 text-primary" /> Auto-Generated Crawl4AI Extraction Rules</span>
          <span className="text-emerald-500">Ready for Execution</span>
        </div>
        <pre className="text-emerald-400 text-[11px] leading-relaxed overflow-x-auto max-h-36">
          {generatedSchema}
        </pre>
      </div>
    </div>
  );
}
