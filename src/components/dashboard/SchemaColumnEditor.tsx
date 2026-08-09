'use client';

import React from 'react';
import { Type, Hash, Calendar, Mail, Key, Trash2, Check, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface SchemaColumn {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'email' | 'uuid';
  required: boolean;
  unique: boolean;
  description?: string;
}

interface SchemaColumnEditorProps {
  column: SchemaColumn;
  onChange: (updated: SchemaColumn) => void;
  onDelete: (id: string) => void;
}

export function SchemaColumnEditor({ column, onChange, onDelete }: SchemaColumnEditorProps) {
  const getTypeIcon = (type: SchemaColumn['type']) => {
    switch (type) {
      case 'string': return <Type className="size-4 text-blue-500" />;
      case 'number': return <Hash className="size-4 text-purple-500" />;
      case 'date': return <Calendar className="size-4 text-emerald-500" />;
      case 'email': return <Mail className="size-4 text-orange-500" />;
      case 'uuid': return <Key className="size-4 text-cyan-500" />;
      default: return <Shield className="size-4 text-primary" />;
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group hover:border-primary/40 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="p-2.5 rounded-xl bg-muted border border-border/40">
          {getTypeIcon(column.type)}
        </div>
        <div className="flex-1 space-y-1">
          <Input
            value={column.name}
            onChange={(e) => onChange({ ...column, name: e.target.value })}
            placeholder="column_name"
            className="h-8 font-mono text-xs font-bold bg-transparent border-transparent hover:border-border/50 focus:border-primary"
          />
          <Input
            value={column.description || ''}
            onChange={(e) => onChange({ ...column, description: e.target.value })}
            placeholder="Field description..."
            className="h-6 text-[11px] text-muted-foreground bg-transparent border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {/* Type Select */}
        <select
          value={column.type}
          onChange={(e) => onChange({ ...column, type: e.target.value as SchemaColumn['type'] })}
          className="h-8 px-2.5 rounded-xl bg-muted border border-border/40 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
          <option value="date">Date</option>
          <option value="email">Email</option>
          <option value="uuid">UUID</option>
        </select>

        {/* Required Toggle */}
        <button
          onClick={() => onChange({ ...column, required: !column.required })}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors ${
            column.required
              ? 'bg-primary/20 text-primary border-primary/30'
              : 'bg-muted text-muted-foreground border-transparent'
          }`}
        >
          Required
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(column.id)}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
          title="Delete column"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
