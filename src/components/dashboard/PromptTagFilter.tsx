"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface PromptTagFilterProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

const CATEGORIES = ["All", "E-Commerce", "Finance", "Healthcare", "SaaS & Tech", "Real Estate", "Logistics"];

export function PromptTagFilter({ activeCategory, onSelectCategory }: PromptTagFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
      <div className="flex items-center text-xs text-muted-foreground mr-1">
        <Tag className="h-3.5 w-3.5 mr-1 text-primary" /> Filter:
      </div>
      {CATEGORIES.map((cat) => (
        <Badge
          key={cat}
          onClick={() => onSelectCategory(cat)}
          variant={activeCategory === cat ? "default" : "outline"}
          className={`cursor-pointer text-xs transition-all ${
            activeCategory === cat ? "bg-primary text-primary-foreground font-bold shadow-sm" : "hover:bg-secondary/50"
          }`}
        >
          {cat}
        </Badge>
      ))}
    </div>
  );
}
