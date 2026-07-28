"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Columns, ArrowLeftRight, Check, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DatasetDiffViewerProps {
  versionA?: { name: string; rows: number; cols: number };
  versionB?: { name: string; rows: number; cols: number };
}

export function DatasetDiffViewer({
  versionA = { name: "Version v1.0 (Initial Scrape)", rows: 25, cols: 6 },
  versionB = { name: "Version v1.1 (Cleaned & Augmented)", rows: 25, cols: 7 }
}: DatasetDiffViewerProps) {
  const rowDiff = versionB.rows - versionA.rows;
  const colDiff = versionB.cols - versionA.cols;

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Columns className="h-5 w-5 text-primary" />
          Dataset Comparative Diff Viewer
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Inspect side-by-side structural differences between dataset iteration snapshots.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-secondary/15 border border-border/30 space-y-2">
            <span className="text-xs font-bold text-foreground block font-mono">{versionA.name}</span>
            <div className="flex gap-4 text-xs font-mono text-muted-foreground">
              <span>Rows: <strong className="text-foreground">{versionA.rows}</strong></span>
              <span>Cols: <strong className="text-foreground">{versionA.cols}</strong></span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground block font-mono">{versionB.name}</span>
              <Badge className="bg-primary/20 text-primary text-[10px]">Active Version</Badge>
            </div>
            <div className="flex gap-4 text-xs font-mono text-muted-foreground">
              <span>Rows: <strong className="text-foreground">{versionB.rows}</strong> ({rowDiff >= 0 ? `+${rowDiff}` : rowDiff})</span>
              <span>Cols: <strong className="text-foreground">{versionB.cols}</strong> ({colDiff >= 0 ? `+${colDiff}` : colDiff})</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
