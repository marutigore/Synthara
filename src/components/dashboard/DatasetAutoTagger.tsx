"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tags, ShieldAlert, Cpu } from "lucide-react";

interface DatasetAutoTaggerProps {
  schema: Array<{ name: string; type: string }>;
}

export function DatasetAutoTagger({ schema }: DatasetAutoTaggerProps) {
  if (!schema || schema.length === 0) return null;

  const names = schema.map((s) => s.name.toLowerCase()).join(" ");

  const tags: string[] = [];

  if (names.includes("price") || names.includes("cost") || names.includes("revenue") || names.includes("amount")) {
    tags.push("Financial Ledger");
  }
  if (names.includes("email") || names.includes("user") || names.includes("name") || names.includes("phone")) {
    tags.push("User Telemetry");
  }
  if (names.includes("sku") || names.includes("product") || names.includes("stock") || names.includes("inventory")) {
    tags.push("E-Commerce Catalog");
  }
  if (names.includes("status") || names.includes("log") || names.includes("timestamp") || names.includes("event")) {
    tags.push("System Logs");
  }

  if (tags.length === 0) tags.push("General Synthetic Dataset");

  return (
    <div className="flex items-center gap-2 pt-2 border-t border-border/10">
      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
        <Tags className="h-3.5 w-3.5 text-primary" /> Auto Categories:
      </span>
      <div className="flex flex-wrap gap-1">
        {tags.map((t) => (
          <Badge key={t} variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">
            {t}
          </Badge>
        ))}
      </div>
    </div>
  );
}
