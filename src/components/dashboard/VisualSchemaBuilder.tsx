'use client';

import React, { useState } from 'react';
import { SchemaColumnEditor, SchemaColumn } from './SchemaColumnEditor';
import { Plus, Code2, Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VisualSchemaBuilder() {
  const [columns, setColumns] = useState<SchemaColumn[]>([
    { id: '1', name: 'user_id', type: 'uuid', required: true, unique: true, description: 'Primary user identifier' },
    { id: '2', name: 'email', type: 'email', required: true, unique: true, description: 'User contact email' },
    { id: '3', name: 'annual_revenue', type: 'number', required: false, unique: false, description: 'Company revenue in USD' },
    { id: '4', name: 'created_at', type: 'date', required: true, unique: false, description: 'Registration timestamp' },
  ]);

  const [copied, setCopied] = useState(false);

  const addColumn = () => {
    const newCol: SchemaColumn = {
      id: Date.now().toString(),
      name: `field_${columns.length + 1}`,
      type: 'string',
      required: false,
      unique: false,
    };
    setColumns([...columns, newCol]);
  };

  const handleUpdate = (updated: SchemaColumn) => {
    setColumns(columns.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDelete = (id: string) => {
    setColumns(columns.filter((c) => c.id !== id));
  };

  const generatedJson = JSON.stringify(
    columns.map(({ name, type, required, description }) => ({
      name,
      type,
      required,
      ...(description ? { description } : {}),
    })),
    null,
    2
  );

  const copyJson = () => {
    navigator.clipboard.writeText(generatedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary animate-pulse" />
            <h3 className="font-headline font-bold text-lg text-foreground">Visual Schema Builder</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Design dataset column structures visually with zero JSON writing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyJson}
            className="h-9 px-3 text-xs font-bold rounded-xl border-border/50"
          >
            {copied ? <Check className="size-3.5 text-emerald-500 mr-1.5" /> : <Copy className="size-3.5 mr-1.5" />}
            {copied ? 'Copied JSON' : 'Export JSON'}
          </Button>

          <Button
            onClick={addColumn}
            size="sm"
            className="h-9 px-4 text-xs font-bold rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20"
          >
            <Plus className="size-4 mr-1.5" /> Add Column
          </Button>
        </div>
      </div>

      {/* Columns List */}
      <div className="space-y-3">
        {columns.map((col) => (
          <SchemaColumnEditor
            key={col.id}
            column={col}
            onChange={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Live Generated JSON Snippet */}
      <div className="p-4 rounded-2xl bg-black/90 border border-border/20 text-xs font-mono space-y-2 text-zinc-300">
        <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
          <span className="flex items-center gap-1.5"><Code2 className="size-3.5 text-primary" /> Live Generated JSON Schema</span>
          <span>{columns.length} Fields Defined</span>
        </div>
        <pre className="overflow-x-auto text-[11px] leading-relaxed max-h-36 text-emerald-400">
          {generatedJson}
        </pre>
      </div>
    </div>
  );
}
