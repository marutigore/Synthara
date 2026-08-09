"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GitCommit, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DatasetVersioningTimeline() {
  const versions = [
    { v: "v1.2", tag: "Post-PII Masking & Clean", date: "Just now", hash: "98603a0" },
    { v: "v1.1", tag: "Initial Synthetic Generation", date: "10m ago", hash: "fcb9a27" },
    { v: "v1.0", tag: "Raw Crawled DOM Nodes", date: "1h ago", hash: "fd93e59" },
  ];

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <GitCommit className="h-5 w-5 text-primary" />
          Git-Style Versioning & Commit Snapshot History
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Track dataset version lineage with point-in-time rollback capabilities.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {versions.map((ver) => (
          <div key={ver.v} className="flex items-center justify-between p-3 rounded-xl bg-secondary/15 border border-border/30 text-xs">
            <div className="flex items-center gap-2 font-mono font-bold text-foreground">
              <span className="text-primary">{ver.v}</span>
              <span>({ver.hash})</span>
              <span className="text-muted-foreground font-sans font-normal text-[11px]">— {ver.tag}</span>
            </div>
            <Button size="sm" variant="ghost" className="h-7 text-[10px] gap-1 text-muted-foreground hover:text-foreground">
              <RotateCcw className="h-3 w-3" /> Rollback
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
