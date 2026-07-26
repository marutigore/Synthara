"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText, Database, Code, FileSpreadsheet, Check } from "lucide-react";
import { generateSqlInserts, generateJsonl, generateTsv, downloadFile } from "@/lib/utils/exporter";
import { useToast } from "@/hooks/use-toast";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  datasetName: string;
  data: Array<Record<string, any>>;
  csv: string;
}

export function ExportModal({ isOpen, onClose, datasetName, data, csv }: ExportModalProps) {
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState<"csv" | "sql" | "jsonl" | "tsv">("csv");

  const handleExport = () => {
    if (!data || data.length === 0) return;

    const baseName = (datasetName || "dataset").replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();

    switch (selectedFormat) {
      case "csv":
        downloadFile(csv || "", `${baseName}.csv`, "text/csv;charset=utf-8;");
        break;
      case "sql":
        const sql = generateSqlInserts(baseName, data);
        downloadFile(sql, `${baseName}.sql`, "text/plain;charset=utf-8;");
        break;
      case "jsonl":
        const jsonl = generateJsonl(data);
        downloadFile(jsonl, `${baseName}.jsonl`, "application/x-jsonlines;charset=utf-8;");
        break;
      case "tsv":
        const tsv = generateTsv(data);
        downloadFile(tsv, `${baseName}.tsv`, "text/tab-separated-values;charset=utf-8;");
        break;
    }

    toast({
      title: "File exported! 📥",
      description: `Downloaded ${baseName}.${selectedFormat} successfully.`
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Export Dataset Hub
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Select your preferred file format for export and downstream integration.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 py-4">
          <button
            onClick={() => setSelectedFormat("csv")}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
              selectedFormat === "csv"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/40 hover:bg-secondary/20 text-muted-foreground"
            }`}
          >
            <FileSpreadsheet className="h-6 w-6" />
            <span className="text-xs font-bold">CSV Format</span>
            <span className="text-[10px] opacity-70">Standard tabular data</span>
          </button>

          <button
            onClick={() => setSelectedFormat("sql")}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
              selectedFormat === "sql"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/40 hover:bg-secondary/20 text-muted-foreground"
            }`}
          >
            <Database className="h-6 w-6" />
            <span className="text-xs font-bold">SQL Inserts</span>
            <span className="text-[10px] opacity-70">Database seed script</span>
          </button>

          <button
            onClick={() => setSelectedFormat("jsonl")}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
              selectedFormat === "jsonl"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/40 hover:bg-secondary/20 text-muted-foreground"
            }`}
          >
            <Code className="h-6 w-6" />
            <span className="text-xs font-bold">JSONL Format</span>
            <span className="text-[10px] opacity-70">LLM fine-tuning lines</span>
          </button>

          <button
            onClick={() => setSelectedFormat("tsv")}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
              selectedFormat === "tsv"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/40 hover:bg-secondary/20 text-muted-foreground"
            }`}
          >
            <FileText className="h-6 w-6" />
            <span className="text-xs font-bold">TSV Format</span>
            <span className="text-[10px] opacity-70">Tab separated stream</span>
          </button>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} size="sm" className="h-9 text-xs">
            Cancel
          </Button>
          <Button onClick={handleExport} size="sm" className="h-9 text-xs font-bold uppercase tracking-wider bg-primary gap-1">
            <Download className="h-4 w-4" /> Download .{selectedFormat}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
