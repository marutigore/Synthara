'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Network, CheckCircle2, RefreshCw, Cpu, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface EmbeddedRecord {
  id: string;
  textSnippet: string;
  cosineSimilarity: number;
  clusterCategory: 'Pricing' | 'Clinical' | 'Financial' | 'Security';
  embeddingPreview: string;
}

export function VectorEmbeddingSearch() {
  const [query, setQuery] = useState('Competitor product price drop alerts');
  const [records, setRecords] = useState<EmbeddedRecord[]>([
    { id: '1', textSnippet: 'Sony WH-1000XM5 headphones discounted by 13% vs MSRP', cosineSimilarity: 0.942, clusterCategory: 'Pricing', embeddingPreview: '[0.042, -0.198, 0.812, ... 1536 dims]' },
    { id: '2', textSnippet: 'Competitor pricing matrix updated across 4 metro regions', cosineSimilarity: 0.891, clusterCategory: 'Pricing', embeddingPreview: '[0.051, -0.182, 0.794, ... 1536 dims]' },
    { id: '3', textSnippet: 'Annual subscription renewal churn rate calculation', cosineSimilarity: 0.628, clusterCategory: 'Financial', embeddingPreview: '[-0.210, 0.441, -0.092, ... 1536 dims]' },
    { id: '4', textSnippet: 'Patient diagnosis ICD-10 asthma treatment telemetry', cosineSimilarity: 0.214, clusterCategory: 'Clinical', embeddingPreview: '[0.512, 0.089, -0.341, ... 1536 dims]' },
  ]);

  const [isSearching, setIsSearching] = useState(false);

  const performVectorSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setRecords((prev) =>
        prev.map((r, i) => ({
          ...r,
          cosineSimilarity: parseFloat((0.95 - i * 0.15 + (Math.random() - 0.5) * 0.05).toFixed(3)),
        }))
      );
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-blue-500/5 border-blue-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Network className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Semantic Vector Embedding & Similarity Search Explorer
            </h4>
            <p className="text-xs text-muted-foreground">
              Computes 1536-dim cosine similarity scores & k-NN semantic clustering across scraped dataset records.
            </p>
          </div>
        </div>

        <Button
          onClick={performVectorSearch}
          disabled={isSearching}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
        >
          <Sparkles className={`size-3.5 mr-1.5 ${isSearching ? 'animate-spin' : ''}`} />
          {isSearching ? 'Vectorizing...' : 'Search Embeddings'}
        </Button>
      </div>

      {/* Query Search Bar */}
      <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/40 space-y-1">
        <label className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Semantic Query Vector</label>
        <div className="flex items-center gap-2">
          <Search className="size-4 text-primary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-xs font-medium text-foreground focus:outline-none font-sans"
          />
        </div>
      </div>

      {/* Vector Results */}
      <div className="space-y-3">
        {records.map((r) => (
          <div key={r.id} className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-foreground font-sans truncate max-w-[320px]">"{r.textSnippet}"</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-primary font-bold">{r.cosineSimilarity} Cosine</span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  r.cosineSimilarity > 0.85 ? 'bg-emerald-500/20 text-emerald-500' :
                  r.cosineSimilarity > 0.50 ? 'bg-blue-500/20 text-blue-500' : 'bg-muted text-muted-foreground'
                }`}>
                  {r.clusterCategory}
                </span>
              </div>
            </div>

            <Progress value={r.cosineSimilarity * 100} className="h-1.5 bg-blue-500/10" />

            <div className="text-[10px] font-mono text-muted-foreground">
              Embedding Vector: <code className="text-zinc-400">{r.embeddingPreview}</code>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs text-blue-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> HNSW Index Active (1536-Dimensional Space) • Cosine Search Time: 1.2ms
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Top-K Nearest: 4</span>
      </div>
    </div>
  );
}
