"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GitCompare, PlusCircle, MinusCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SchemaDeltaTableProps {
  currentSchema: Array<{ name: string; type: string }>;
  previousSchema?: Array<{ name: string; type: string }>;
}

export function SchemaDeltaTable({ currentSchema = [], previousSchema = [] }: SchemaDeltaTableProps) {
  const prevNames = new Set(previousSchema.map((s) => s.name));
  const currNames = new Set(currentSchema.map((s) => s.name));

  const added = currentSchema.filter((s) => !prevNames.has(s.name));
  const removed = previousSchema.filter((s) => !currNames.has(s.name));
  const unchanged = currentSchema.filter((s) => prevNames.has(s.name));

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-primary" />
          Dataset Schema Delta Comparator Table
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Compare schema changes across dataset generations.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-medium">
            <span className="flex items-center gap-1 font-bold"><PlusCircle className="h-3.5 w-3.5" /> Added ({added.length})</span>
            <div className="mt-1 space-y-1">
              {added.length === 0 ? <p className="text-[10px] text-muted-foreground">None</p> : added.map((a) => <p key={a.name} className="font-mono">{a.name} ({a.type})</p>)}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 font-medium">
            <span className="flex items-center gap-1 font-bold"><MinusCircle className="h-3.5 w-3.5" /> Removed ({removed.length})</span>
            <div className="mt-1 space-y-1">
              {removed.length === 0 ? <p className="text-[10px] text-muted-foreground">None</p> : removed.map((r) => <p key={r.name} className="font-mono">{r.name} ({r.type})</p>)}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 font-medium">
            <span className="flex items-center gap-1 font-bold"><CheckCircle2 className="h-3.5 w-3.5" /> Unchanged ({unchanged.length})</span>
            <div className="mt-1 space-y-1">
              {unchanged.length === 0 ? <p className="text-[10px] text-muted-foreground">None</p> : unchanged.slice(0, 3).map((u) => <p key={u.name} className="font-mono">{u.name}</p>)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
