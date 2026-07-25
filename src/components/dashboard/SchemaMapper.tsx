"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ColumnMeta {
  name: string;
  type: string;
  description?: string;
}

interface SchemaMapperProps {
  columns: ColumnMeta[];
  onTypeChange: (colName: string, newType: string) => void;
  onSave?: () => void;
}

export function SchemaMapper({ columns, onTypeChange, onSave }: SchemaMapperProps) {
  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              Column Schema Field Mapper
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Verify database column types and maps before generating your CSV tables.
            </CardDescription>
          </div>
          {onSave && (
            <Button size="sm" onClick={onSave} className="gap-1.5 h-8 text-xs font-bold uppercase tracking-wider">
              <Check className="h-4 w-4" /> Save Mappings
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {columns.map((col) => (
            <div key={col.name} className="flex items-center justify-between p-3.5 rounded-xl bg-secondary/15 border border-border/30 hover:border-primary/20 transition-all">
              <div className="space-y-1">
                <span className="font-bold text-sm text-foreground block font-mono">{col.name}</span>
                {col.description && (
                  <p className="text-[10px] text-muted-foreground line-clamp-1">{col.description}</p>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-[10px] font-mono py-0.5 px-2 bg-secondary/40">
                  {col.type}
                </Badge>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <select
                  value={col.type}
                  onChange={(e) => onTypeChange(col.name, e.target.value)}
                  className="bg-card text-xs font-semibold h-8 rounded-lg px-2 outline-none border border-border/50 focus:ring-1 focus:ring-primary"
                >
                  <option value="string">string</option>
                  <option value="number">number</option>
                  <option value="boolean">boolean</option>
                  <option value="datetime">datetime</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
