"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid } from "lucide-react";

interface MarketplaceCategoryNavProps {
  onSelect?: (cat: string) => void;
}

const CATS = ["Trending", "Financial Data", "E-Commerce Catalogs", "NLP Corpora", "Computer Vision", "Log Telemetry"];

export function MarketplaceCategoryNav({ onSelect }: MarketplaceCategoryNavProps) {
  const [active, setActive] = useState("Trending");

  const handleClick = (c: string) => {
    setActive(c);
    if (onSelect) onSelect(c);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
        <LayoutGrid className="h-3.5 w-3.5 text-primary" /> Categories:
      </span>
      {CATS.map((c) => (
        <Badge
          key={c}
          onClick={() => handleClick(c)}
          variant={active === c ? "default" : "outline"}
          className={`cursor-pointer text-xs transition-all ${
            active === c ? "bg-primary text-primary-foreground font-bold shadow-sm" : "hover:bg-secondary/50"
          }`}
        >
          {c}
        </Badge>
      ))}
    </div>
  );
}
