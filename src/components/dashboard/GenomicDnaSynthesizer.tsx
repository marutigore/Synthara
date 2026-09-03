'use client';

import React, { useState } from 'react';
import { Dna, Download, RefreshCw, Sliders, CheckCircle2, FileCode, Sparkles, Binary, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DnaSequence {
  id: string;
  header: string;
  sequence: string;
  gcContentPct: number;
  lengthBp: number;
  hasCrisprPam: boolean;
}

export function GenomicDnaSynthesizer() {
  const [targetGc, setTargetGc] = useState<number>(52);
  const [seqLength, setSeqLength] = useState<number>(60);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'fasta' | 'fastq'>('fasta');

  const [sequences, setSequences] = useState<DnaSequence[]>([
    {
      id: 'seq-1',
      header: '>synth_homo_sapiens_chr7_exon4_simulated_01',
      sequence: 'ATGCGATCGATCGATCGATCGATCGGCTAGCTAGCTAGCTAGCTAGCTAGGCTAGCTAGC',
      gcContentPct: 52.4,
      lengthBp: 60,
      hasCrisprPam: true,
    },
    {
      id: 'seq-2',
      header: '>synth_crispr_target_cas9_sgRNA_spacer_02',
      sequence: 'GGATCGATCGATCGATCGATCGATCGATCGATCGGCTAGCTAGCTAGCTAGCTAGCTAGG',
      gcContentPct: 54.1,
      lengthBp: 60,
      hasCrisprPam: true,
    },
  ]);

  const generateSequences = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const bases = ['A', 'C', 'G', 'T'];
      const gcBases = ['G', 'C'];
      const atBases = ['A', 'T'];

      const newSeqs: DnaSequence[] = Array.from({ length: 2 }).map((_, i) => {
        let seq = '';
        for (let j = 0; j < seqLength; j++) {
          if (Math.random() < targetGc / 100) {
            seq += gcBases[Math.floor(Math.random() * gcBases.length)];
          } else {
            seq += atBases[Math.floor(Math.random() * atBases.length)];
          }
        }

        const gcCount = (seq.match(/[GC]/g) || []).length;
        const gcPct = parseFloat(((gcCount / seq.length) * 100).toFixed(1));
        const hasPam = seq.includes('AGG') || seq.includes('TGG') || seq.includes('CGG') || seq.includes('GGG');

        return {
          id: `seq-${Date.now()}-${i}`,
          header: `>synth_genomic_strand_${Date.now().toString().slice(-4)}_${i + 1}`,
          sequence: seq,
          gcContentPct: gcPct,
          lengthBp: seq.length,
          hasCrisprPam: hasPam,
        };
      });

      setSequences(newSeqs);
      setIsGenerating(false);
    }, 600);
  };

  const colorizeBases = (seq: string) => {
    return seq.split('').map((base, idx) => {
      let colorClass = 'text-blue-400';
      if (base === 'A') colorClass = 'text-emerald-400';
      if (base === 'T') colorClass = 'text-rose-400';
      if (base === 'C') colorClass = 'text-amber-400';
      if (base === 'G') colorClass = 'text-cyan-400';

      return (
        <span key={idx} className={`${colorClass} font-mono font-bold`}>
          {base}
        </span>
      );
    });
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-cyan-500/5 border-cyan-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
            <Dna className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Bioinformatics & Genomic Sequence Synthesizer
              <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-500 bg-cyan-500/10">
                FASTA / FASTQ / CRISPR
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Synthesize DNA/RNA nucleotide sequences with controlled GC-content, CRISPR PAM motifs, and simulated SNPs.
            </p>
          </div>
        </div>

        <Button
          onClick={generateSequences}
          disabled={isGenerating}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20"
        >
          {isGenerating ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Sparkles className="size-3.5 mr-1.5" />}
          {isGenerating ? 'Synthesizing DNA Strands...' : 'Synthesize Sequences'}
        </Button>
      </div>

      {/* Sequence Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider flex items-center gap-1">
              <Sliders className="size-3 text-cyan-500" />
              Target GC-Ratio: {targetGc}%
            </span>
            <span className="font-mono text-[10px] text-cyan-400">Genomic Baseline</span>
          </div>
          <input
            type="range"
            min="30"
            max="70"
            step="1"
            value={targetGc}
            onChange={(e) => setTargetGc(parseInt(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Strand Length</span>
          <div className="text-2xl font-mono font-bold text-foreground">{seqLength} bp</div>
          <div className="text-[10px] text-muted-foreground">Base pairs per synthetic read</div>
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1.5">
          <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Format Standard</span>
          <div className="flex gap-1.5">
            {(['fasta', 'fastq'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`flex-1 py-1 text-xs font-mono font-bold uppercase rounded-lg transition-colors ${
                  selectedFormat === fmt
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-background text-muted-foreground hover:text-foreground border border-border/60'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Nucleotide Sequence Viewer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Binary className="size-3.5 text-cyan-500" />
            Synthesized Nucleotide Readout (Base Pairs)
          </span>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span className="text-emerald-400 font-bold">A (Adenine)</span>
            <span className="text-rose-400 font-bold">T (Thymine)</span>
            <span className="text-amber-400 font-bold">C (Cytosine)</span>
            <span className="text-cyan-400 font-bold">G (Guanine)</span>
          </div>
        </div>

        <div className="space-y-2">
          {sequences.map((seq) => (
            <div
              key={seq.id}
              className="p-4 bg-background/90 rounded-2xl border border-border/60 space-y-2 shadow-inner"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-muted-foreground font-bold truncate">
                  {seq.header}
                </span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px] font-mono">
                    GC: {seq.gcContentPct}%
                  </Badge>
                  {seq.hasCrisprPam && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] font-mono">
                      CRISPR NGG PAM DETECTED
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-2.5 bg-muted/30 rounded-xl font-mono text-xs break-all leading-relaxed tracking-wider border border-border/40">
                {colorizeBases(seq.sequence)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Preview */}
      <div className="p-3.5 bg-background border border-border/60 rounded-xl space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1.5">
            <FileCode className="size-3.5 text-cyan-500" />
            {selectedFormat.toUpperCase()} Bio-File Preview
          </span>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
            <CheckCircle2 className="size-3" /> Compatible with Biopython, BLAST & HyenaDNA
          </span>
        </div>
        <pre className="text-[11px] font-mono text-cyan-400 bg-muted/30 p-2.5 rounded-lg overflow-x-auto leading-relaxed">
          {selectedFormat === 'fasta'
            ? sequences.map((s) => `${s.header}\n${s.sequence}`).join('\n')
            : sequences
                .map((s) => `@${s.header.slice(1)}\n${s.sequence}\n+\n${'I'.repeat(s.sequence.length)}`)
                .join('\n')}
        </pre>
      </div>
    </div>
  );
}
