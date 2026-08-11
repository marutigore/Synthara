'use client';

import React, { useState } from 'react';
import { FileText, Download, Sparkles, Check, ShieldCheck, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ExecutiveReportExporter() {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const reportPreview = `# Synthara AI — Executive Dataset Audit Report
--------------------------------------------------
Generated: ${new Date().toLocaleDateString()}
Dataset: E-Commerce Customer Telemetry (v2.4)
Total Rows: 10,000 | Total Features: 8

EXECUTIVE SUMMARY:
- Data Integrity Score: 98.4% (Grade A+)
- PII Masking Status: 100% Compliant (GDPR / CCPA)
- Statistical Drift (PSI): 0.042 (Stable)
- Recommended Actions: Safe for ML Model Ingestion & Production Warehouse Deployment.
`;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const blob = new Blob([reportPreview], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `synthara_executive_report_${Date.now()}.md`;
      a.click();
      URL.revokeObjectURL(url);
      setIsExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 2500);
    }, 600);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-indigo-500/5 border-indigo-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <FileText className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Automated Executive Intelligence Report Exporter
            </h4>
            <p className="text-xs text-muted-foreground">
              One-click summary report compilation for stakeholders and compliance audits.
            </p>
          </div>
        </div>

        <Button
          onClick={handleExport}
          disabled={isExporting}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
        >
          {exported ? (
            <Check className="size-3.5 mr-1.5 text-emerald-300" />
          ) : (
            <Download className={`size-3.5 mr-1.5 ${isExporting ? 'animate-bounce' : ''}`} />
          )}
          {exported ? 'Report Downloaded' : isExporting ? 'Compiling PDF/MD...' : 'Export Executive Report'}
        </Button>
      </div>

      {/* Report Markdown Live Preview Box */}
      <div className="p-4 rounded-2xl bg-black/90 border border-border/20 text-xs font-mono text-zinc-300 space-y-2">
        <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase">
          <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-indigo-400" /> Report Document Stream</span>
          <span className="text-emerald-500 font-mono">Status: Verified</span>
        </div>
        <pre className="text-[11px] leading-relaxed text-indigo-300 overflow-x-auto max-h-40">
          {reportPreview}
        </pre>
      </div>
    </div>
  );
}
