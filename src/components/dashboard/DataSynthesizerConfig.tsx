"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sliders, Sparkles, Flame } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DataSynthesizerConfig() {
  const { toast } = useToast();
  const [temp, setTemp] = useState<number[]>([0.7]);
  const [entropy, setEntropy] = useState<number[]>([80]);

  const handleApply = () => {
    toast({
      title: "Synthesizer Configuration Saved! 🎛️",
      description: `Sampling Temperature: ${temp[0]}, Entropy Weight: ${entropy[0]}%`,
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Sliders className="h-5 w-5 text-primary" />
          Synthetic Data Sampling Strategy & Temperature Tuner
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Control generative stochasticity and entropy weights for LLM sampling.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-amber-500" /> Temperature</span>
            <span className="font-mono text-primary">{temp[0]}</span>
          </div>
          <Slider value={temp} onValueChange={setTemp} min={0.1} max={1.5} step={0.05} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-purple-500" /> Entropy Diversity Ratio</span>
            <span className="font-mono text-primary">{entropy[0]}%</span>
          </div>
          <Slider value={entropy} onValueChange={setEntropy} min={10} max={100} step={5} />
        </div>

        <Button onClick={handleApply} size="sm" className="w-full font-bold text-xs uppercase tracking-wider bg-primary">
          Apply Sampling Hyperparameters
        </Button>
      </CardContent>
    </Card>
  );
}
