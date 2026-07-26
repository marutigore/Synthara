"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitMerge, Layers, Check, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DatasetItem {
  id: string;
  name: string;
  rowCount: number;
  data: Array<Record<string, any>>;
}

export function DatasetMerger() {
  const { toast } = useToast();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mergedResult, setMergedResult] = useState<{ count: number; cols: number } | null>(null);

  const mockDatasets: DatasetItem[] = [
    { id: "ds1", name: "customer_leads_batch_1.csv", rowCount: 150, data: [{ name: "Alice", email: "alice@test.com" }, { name: "Bob", email: "bob@test.com" }] },
    { id: "ds2", name: "customer_leads_batch_2.csv", rowCount: 200, data: [{ name: "Charlie", email: "charlie@test.com" }, { name: "David", email: "david@test.com" }] },
    { id: "ds3", name: "scraped_tech_blogs.csv", rowCount: 85, data: [{ title: "AI Trends 2026", url: "https://example.com" }] }
  ];

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleMerge = () => {
    if (selectedIds.length < 2) {
      toast({
        title: "Select datasets",
        description: "Please choose at least 2 datasets to merge.",
        variant: "destructive"
      });
      return;
    }

    const selectedSets = mockDatasets.filter((d) => selectedIds.includes(d.id));
    let totalRows = 0;
    const allKeys = new Set<string>();

    selectedSets.forEach((set) => {
      totalRows += set.rowCount;
      if (set.data.length > 0) {
        Object.keys(set.data[0]).forEach((k) => allKeys.add(k));
      }
    });

    setMergedResult({ count: totalRows, cols: allKeys.size });
    toast({
      title: "Datasets merged successfully! 🔀",
      description: `Combined ${selectedIds.length} datasets into ${totalRows} rows (${allKeys.size} unified columns).`
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <GitMerge className="h-5 w-5 text-primary" />
              Dataset Differential & Merge Workbench
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Select multiple datasets from history to consolidate rows and align schemas.
            </CardDescription>
          </div>
          <Button onClick={handleMerge} size="sm" className="gap-1.5 h-8 text-xs font-bold uppercase tracking-wider bg-primary">
            <Layers className="h-4 w-4" /> Merge Selected Datasets
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mockDatasets.map((ds) => {
            const isSelected = selectedIds.includes(ds.id);
            return (
              <div
                key={ds.id}
                onClick={() => toggleSelect(ds.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border/40 hover:border-border bg-secondary/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground truncate max-w-[180px] font-mono">{ds.name}</span>
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs ${isSelected ? "bg-primary text-white" : "border border-border/60"}`}>
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">{ds.rowCount} total rows stored</p>
              </div>
            );
          })}
        </div>

        {mergedResult && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono flex items-center justify-between">
            <span>Merged Output Master Dataset Ready</span>
            <span className="font-bold">{mergedResult.count} rows • {mergedResult.cols} columns</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
