"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, Database, Code } from "lucide-react";

interface ExportFormatSelectorProps {
  onExport: (format: "csv" | "json" | "sql" | "tsv") => void;
}

export function ExportFormatSelector({ onExport }: ExportFormatSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => onExport("csv")} size="sm" variant="outline" className="h-8 text-xs gap-1 font-mono">
        <FileText className="h-3.5 w-3.5 text-blue-500" /> CSV
      </Button>
      <Button onClick={() => onExport("json")} size="sm" variant="outline" className="h-8 text-xs gap-1 font-mono">
        <Code className="h-3.5 w-3.5 text-amber-500" /> JSONL
      </Button>
      <Button onClick={() => onExport("sql")} size="sm" variant="outline" className="h-8 text-xs gap-1 font-mono">
        <Database className="h-3.5 w-3.5 text-emerald-500" /> SQL
      </Button>
      <Button onClick={() => onExport("tsv")} size="sm" variant="outline" className="h-8 text-xs gap-1 font-mono">
        <Download className="h-3.5 w-3.5 text-purple-500" /> TSV
      </Button>
    </div>
  );
}
