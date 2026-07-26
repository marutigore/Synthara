"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wand2, Sparkles, Check, RefreshCw, Trash2, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DataCleanerProps {
  data: Array<Record<string, any>>;
  onCleanedData: (cleaned: Array<Record<string, any>>) => void;
}

export function DataCleaner({ data, onCleanedData }: DataCleanerProps) {
  const { toast } = useToast();
  const [trimStrings, setTrimStrings] = useState(true);
  const [fillMissing, setFillMissing] = useState(true);
  const [missingPlaceholder, setMissingPlaceholder] = useState("N/A");
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [cleanedStats, setCleanedStats] = useState<{ trimmed: number; filled: number; dupesRemoved: number } | null>(null);

  const handleRunCleaning = () => {
    if (!data || data.length === 0) return;

    let result = [...data];
    let trimmedCount = 0;
    let filledCount = 0;
    let dupesCount = 0;

    // 1. Trim strings & fill missing values
    result = result.map((row) => {
      const newRow: Record<string, any> = {};
      for (const [key, val] of Object.entries(row)) {
        let cleanVal = val;

        if (trimStrings && typeof cleanVal === "string") {
          const original = cleanVal;
          cleanVal = cleanVal.trim();
          if (cleanVal !== original) trimmedCount++;
        }

        if (fillMissing && (cleanVal === null || cleanVal === undefined || cleanVal === "")) {
          cleanVal = missingPlaceholder;
          filledCount++;
        }

        newRow[key] = cleanVal;
      }
      return newRow;
    });

    // 2. Remove duplicate rows
    if (removeDuplicates) {
      const initialLen = result.length;
      const seen = new Set<string>();
      result = result.filter((row) => {
        const str = JSON.stringify(row);
        if (seen.has(str)) return false;
        seen.add(str);
        return true;
      });
      dupesCount = initialLen - result.length;
    }

    setCleanedStats({ trimmed: trimmedCount, filled: filledCount, dupesRemoved: dupesCount });
    onCleanedData(result);

    toast({
      title: "Data cleaning complete! ✨",
      description: `Processed ${result.length} rows (${trimmedCount} trimmed, ${filledCount} imputed, ${dupesCount} dupes removed).`,
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              Automated Data Cleaning & Imputation Pipeline
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Sanitize text formatting, handle missing entries, and drop duplicate records.
            </CardDescription>
          </div>
          <Button onClick={handleRunCleaning} size="sm" className="gap-1.5 h-8 text-xs font-bold uppercase tracking-wider bg-primary">
            <Sparkles className="h-4 w-4" /> Run Cleaning Pipeline
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Option 1: Trim */}
          <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-xs font-bold text-foreground cursor-pointer" htmlFor="trim-toggle">
                Trim Whitespace
              </label>
              <p className="text-[10px] text-muted-foreground">Remove leading & trailing space</p>
            </div>
            <input
              id="trim-toggle"
              type="checkbox"
              checked={trimStrings}
              onChange={(e) => setTrimStrings(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
          </div>

          {/* Option 2: Fill Missing */}
          <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 flex items-center justify-between gap-2">
            <div className="space-y-0.5">
              <label className="text-xs font-bold text-foreground cursor-pointer" htmlFor="fill-toggle">
                Impute Missing Values
              </label>
              <p className="text-[10px] text-muted-foreground">Replace nulls with placeholder</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={missingPlaceholder}
                onChange={(e) => setMissingPlaceholder(e.target.value)}
                className="w-16 h-7 text-xs bg-background border border-border/50 rounded px-2 text-center"
              />
              <input
                id="fill-toggle"
                type="checkbox"
                checked={fillMissing}
                onChange={(e) => setFillMissing(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Option 3: Remove Dupes */}
          <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-xs font-bold text-foreground cursor-pointer" htmlFor="dupe-toggle">
                Deduplicate Rows
              </label>
              <p className="text-[10px] text-muted-foreground">Drop exact duplicate records</p>
            </div>
            <input
              id="dupe-toggle"
              type="checkbox"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
          </div>
        </div>

        {cleanedStats && (
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex flex-wrap items-center justify-between text-xs text-primary gap-2">
            <span className="font-bold flex items-center gap-1.5">
              <Check className="h-4 w-4" /> Pipeline Results Applied:
            </span>
            <div className="flex gap-3 font-mono text-[11px]">
              <span>Trimmed: {cleanedStats.trimmed}</span>
              <span>•</span>
              <span>Imputed: {cleanedStats.filled}</span>
              <span>•</span>
              <span>Duplicates Removed: {cleanedStats.dupesRemoved}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
