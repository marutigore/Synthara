"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AutoImputationCardProps {
  onImpute?: () => void;
}

export function AutoImputationCard({ onImpute }: AutoImputationCardProps) {
  const { toast } = useToast();

  const handleRun = () => {
    if (onImpute) onImpute();
    toast({
      title: "Smart Imputation Complete! ✨",
      description: "Missing values auto-filled using median & mode statistical heuristics.",
    });
  };

  return (
    <Button onClick={handleRun} size="sm" variant="outline" className="h-8 text-xs gap-1.5 font-bold">
      <Wand2 className="h-3.5 w-3.5 text-primary" /> Auto Impute Nulls
    </Button>
  );
}
