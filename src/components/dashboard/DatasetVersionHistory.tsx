"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Columns, GitCompare, GitFork, ArrowLeftRight, Clock, Trash2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DatasetVersion {
  id: string;
  version: string;
  datasetName: string;
  createdAt: string;
  rowsCount: number;
  columnsCount: number;
  columnsList: string[];
  description: string;
}

const mockVersions: DatasetVersion[] = [
  {
    id: "v3",
    version: "v1.2.0 (Latest)",
    datasetName: "ecommerce_customer_leads",
    createdAt: "2026-07-14 17:30:00",
    rowsCount: 250,
    columnsCount: 6,
    columnsList: ["id", "customer_name", "email", "total_purchase", "signup_date", "lead_score"],
    description: "Added predictive lead_score column based on web scraping behaviour features."
  },
  {
    id: "v2",
    version: "v1.1.0",
    datasetName: "ecommerce_customer_leads",
    createdAt: "2026-07-13 14:15:00",
    rowsCount: 200,
    columnsCount: 5,
    columnsList: ["id", "customer_name", "email", "total_purchase", "signup_date"],
    description: "Expanded total rows scraped from target shop sites."
  },
  {
    id: "v1",
    version: "v1.0.0",
    datasetName: "ecommerce_customer_leads",
    createdAt: "2026-07-11 09:00:00",
    rowsCount: 50,
    columnsCount: 4,
    columnsList: ["id", "customer_name", "email", "signup_date"],
    description: "Initial schema definition scraped from target directory pages."
  }
];

export function DatasetVersionHistory() {
  const { toast } = useToast();
  const [selectedV1, setSelectedV1] = useState<string>("v2");
  const [selectedV2, setSelectedV2] = useState<string>("v3");
  const [activeCompare, setActiveCompare] = useState(true);

  const v1Data = mockVersions.find((v) => v.id === selectedV1) || mockVersions[1];
  const v2Data = mockVersions.find((v) => v.id === selectedV2) || mockVersions[0];

  const handleRestore = (ver: string) => {
    toast({
      title: "Version snapshot restored",
      description: `Active dataset reverted to version ${ver} successfully.`
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <GitFork className="h-5 w-5 text-primary" />
              Dataset Versioning & Schema Comparison
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Review history snapshots and compare schemas to trace data changes over time.
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5 text-primary">
            3 Snapshots Captured
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Version selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Base Version</label>
            <select
              value={selectedV1}
              onChange={(e) => setSelectedV1(e.target.value)}
              className="w-full bg-secondary/20 border border-border/50 text-foreground text-sm rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-primary"
            >
              {mockVersions.map((v) => (
                <option key={v.id} value={v.id} className="bg-background">
                  {v.version} - {v.createdAt} ({v.rowsCount} rows)
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Target Version</label>
            <select
              value={selectedV2}
              onChange={(e) => setSelectedV2(e.target.value)}
              className="w-full bg-secondary/20 border border-border/50 text-foreground text-sm rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-primary"
            >
              {mockVersions.map((v) => (
                <option key={v.id} value={v.id} className="bg-background">
                  {v.version} - {v.createdAt} ({v.rowsCount} rows)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side by side diff dashboard */}
        {activeCompare && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider pb-1 border-b border-border/10">
              <GitCompare className="h-4 w-4 text-primary animate-pulse" />
              Comparison matrix: {v1Data.version.split(" ")[0]} vs {v2Data.version.split(" ")[0]}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-secondary/5 p-4 rounded-2xl border border-border/30">
              {/* Version 1 Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">{v1Data.version}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleRestore(v1Data.version)} className="h-7 text-xs gap-1 text-primary hover:bg-primary/10">
                    <RotateCcw className="h-3 w-3" /> Restore
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-secondary/30 text-center">
                    <span className="text-[10px] text-muted-foreground block uppercase">Rows</span>
                    <span className="text-sm font-bold text-foreground">{v1Data.rowsCount}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-secondary/30 text-center col-span-2">
                    <span className="text-[10px] text-muted-foreground block uppercase">Created</span>
                    <span className="text-xs font-bold text-foreground font-mono">{v1Data.createdAt.split(" ")[0]}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-muted-foreground block uppercase">Schema Columns ({v1Data.columnsCount})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {v1Data.columnsList.map((col) => (
                      <Badge key={col} variant="outline" className="text-xs font-mono py-0.5 px-2 bg-secondary/20">
                        {col}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  &ldquo;{v1Data.description}&rdquo;
                </p>
              </div>

              {/* Version 2 Info */}
              <div className="space-y-4 md:border-l md:border-border/30 md:pl-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">{v2Data.version}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleRestore(v2Data.version)} className="h-7 text-xs gap-1 text-primary hover:bg-primary/10">
                    <RotateCcw className="h-3 w-3" /> Restore
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-secondary/30 text-center">
                    <span className="text-[10px] text-muted-foreground block uppercase">Rows</span>
                    <span className="text-sm font-bold text-emerald-500">
                      {v2Data.rowsCount} 
                      {v2Data.rowsCount > v1Data.rowsCount && ` (+${v2Data.rowsCount - v1Data.rowsCount})`}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-secondary/30 text-center col-span-2">
                    <span className="text-[10px] text-muted-foreground block uppercase">Created</span>
                    <span className="text-xs font-bold text-foreground font-mono">{v2Data.createdAt.split(" ")[0]}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-muted-foreground block uppercase">Schema Columns ({v2Data.columnsCount})</span>
                  <div className="flex flex-wrap gap-1.5">
                    {v2Data.columnsList.map((col) => {
                      const isNew = !v1Data.columnsList.includes(col);
                      return (
                        <Badge 
                          key={col} 
                          variant="outline" 
                          className={`text-xs font-mono py-0.5 px-2 ${
                            isNew 
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                              : 'bg-secondary/20'
                          }`}
                        >
                          {col} {isNew && "+"}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  &ldquo;{v2Data.description}&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
