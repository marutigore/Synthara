"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RowMultiplierProps {
  data: Array<Record<string, any>>;
  onUpdateData?: (newData: Array<Record<string, any>>) => void;
}

export function RowMultiplier({ data, onUpdateData }: RowMultiplierProps) {
  const { toast } = useToast();

  const handleMultiply = (multiplier: number) => {
    if (!data || data.length === 0) return;

    let expanded: Array<Record<string, any>> = [];
    for (let i = 0; i < multiplier; i++) {
      const copyChunk = data.map((item, idx) => ({
        ...item,
        id: item.id ? `${item.id}_dup_${i}` : `row_${expanded.length + idx + 1}`,
      }));
      expanded = [...expanded, ...copyChunk];
    }

    if (onUpdateData) onUpdateData(expanded);
    toast({
      title: "Rows Multiplied! 🚀",
      description: `Expanded dataset record count to ${expanded.length} rows (${multiplier}x).`,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
        <Layers className="h-3.5 w-3.5 text-primary" /> Row Multiplier:
      </span>
      <Button onClick={() => handleMultiply(2)} variant="outline" size="sm" className="h-7 text-[10px] font-mono">
        2x
      </Button>
      <Button onClick={() => handleMultiply(5)} variant="outline" size="sm" className="h-7 text-[10px] font-mono">
        5x
      </Button>
      <Button onClick={() => handleMultiply(10)} variant="outline" size="sm" className="h-7 text-[10px] font-mono">
        10x
      </Button>
    </div>
  );
}
