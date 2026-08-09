"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AiPromptEnhancerProps {
  prompt: string;
  onEnhanced: (newPrompt: string) => void;
}

export function AiPromptEnhancer({ prompt, onEnhanced }: AiPromptEnhancerProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleEnhance = () => {
    if (!prompt) return;
    setLoading(true);
    setTimeout(() => {
      const enhanced = prompt + " Ensure high cardinality, zero null values, realistic statistical distributions, and standard ISO datetime timestamps.";
      onEnhanced(enhanced);
      setLoading(false);
      toast({
        title: "Prompt Refined! ✨",
        description: "Added schema constraints and statistical distribution requirements.",
      });
    }, 600);
  };

  return (
    <Button onClick={handleEnhance} disabled={loading || !prompt} size="sm" variant="outline" className="h-8 text-xs font-bold gap-1.5 border-primary/30 text-primary">
      <Wand2 className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Enhance Prompt with AI
    </Button>
  );
}
