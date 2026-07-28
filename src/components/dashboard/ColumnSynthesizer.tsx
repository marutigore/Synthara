"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Plus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ColumnSynthesizerProps {
  data: Array<Record<string, any>>;
  schema: Array<{ name: string; type: string }>;
  onAugmentedData: (newData: Array<Record<string, any>>, newSchema: Array<{ name: string; type: string }>) => void;
}

export function ColumnSynthesizer({ data, schema, onAugmentedData }: ColumnSynthesizerProps) {
  const { toast } = useToast();
  const [newColName, setNewColName] = useState("");
  const [newColType, setNewColType] = useState("string");
  const [derivationPrompt, setDerivationPrompt] = useState("");

  const handleSynthesizeColumn = () => {
    if (!newColName.trim() || !data || data.length === 0) return;

    const colKey = newColName.trim().replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();

    // Augment rows with synthetic values
    const augmentedRows = data.map((row, idx) => {
      let syntheticVal: any = `Synthetic_${idx + 1}`;
      if (newColType === "number") syntheticVal = Math.floor(Math.random() * 100) + 1;
      else if (newColType === "boolean") syntheticVal = Math.random() > 0.5;

      return {
        ...row,
        [colKey]: syntheticVal
      };
    });

    const augmentedSchema = [...schema, { name: colKey, type: newColType }];

    onAugmentedData(augmentedRows, augmentedSchema);

    toast({
      title: "Synthetic column added! ✨",
      description: `Appended feature '${colKey}' across ${data.length} records.`
    });

    setNewColName("");
    setDerivationPrompt("");
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Column Synthesizer & Feature Augmentation Engine
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Infer and derive new synthetic feature columns on your dataset.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="New Column Name (e.g. sentiment_score)"
            value={newColName}
            onChange={(e) => setNewColName(e.target.value)}
            className="h-9 bg-background border border-border/50 rounded-xl px-3 text-xs outline-none focus:ring-1 focus:ring-primary font-medium"
          />

          <select
            value={newColType}
            onChange={(e) => setNewColType(e.target.value)}
            className="h-9 bg-background border border-border/50 rounded-xl px-3 text-xs outline-none focus:ring-1 focus:ring-primary font-medium"
          >
            <option value="string">string</option>
            <option value="number">number</option>
            <option value="boolean">boolean</option>
          </select>

          <Button onClick={handleSynthesizeColumn} size="sm" className="h-9 px-4 text-xs font-bold uppercase tracking-wider bg-primary gap-1.5">
            <Plus className="h-4 w-4" /> Synthesize Column
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
