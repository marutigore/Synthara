"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, MoveLeft, MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ColumnReorderToolProps {
  columns: string[];
  onReorder: (newCols: string[]) => void;
}

export function ColumnReorderTool({ columns, onReorder }: ColumnReorderToolProps) {
  const move = (idx: number, dir: -1 | 1) => {
    const nextIdx = idx + dir;
    if (nextIdx < 0 || nextIdx >= columns.length) return;
    const copy = [...columns];
    const temp = copy[idx];
    copy[idx] = copy[nextIdx];
    copy[nextIdx] = temp;
    onReorder(copy);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
        <ArrowLeftRight className="h-3.5 w-3.5 text-primary" /> Column Order:
      </span>
      {columns.map((c, i) => (
        <div key={c} className="flex items-center gap-1 p-1 rounded-md bg-secondary/30 border border-border/30 text-[10px] font-mono">
          <span>{c}</span>
          <button onClick={() => move(i, -1)} disabled={i === 0} className="hover:text-primary disabled:opacity-30">
            <MoveLeft className="h-2.5 w-2.5" />
          </button>
          <button onClick={() => move(i, 1)} disabled={i === columns.length - 1} className="hover:text-primary disabled:opacity-30">
            <MoveRight className="h-2.5 w-2.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
