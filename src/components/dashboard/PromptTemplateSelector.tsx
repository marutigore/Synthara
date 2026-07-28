"use client";

import React from "react";
import { PROMPT_TEMPLATES, PromptTemplate } from "@/lib/constants/prompt-templates";
import { Sparkles, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PromptTemplateSelectorProps {
  onSelectTemplate: (template: PromptTemplate) => void;
}

export function PromptTemplateSelector({ onSelectTemplate }: PromptTemplateSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-muted-foreground/70">
        <BookOpen className="h-3.5 w-3.5 text-primary" />
        Preset Industry Templates
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {PROMPT_TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            type="button"
            onClick={() => onSelectTemplate(tmpl)}
            className="p-3 rounded-xl border border-border/40 bg-secondary/10 hover:border-primary/40 hover:bg-primary/5 transition-all text-left group flex flex-col justify-between space-y-2"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[9px] font-mono py-0 px-1.5 bg-secondary/40">
                  {tmpl.category}
                </Badge>
                <Sparkles className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{tmpl.title}</p>
            </div>
            <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">{tmpl.prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
