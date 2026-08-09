"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Sliders } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DataNoiseInjectorProps {
  data: Array<Record<string, any>>;
  onDataUpdate?: (newData: Array<Record<string, any>>) => void;
}

export function DataNoiseInjector({ data, onDataUpdate }: DataNoiseInjectorProps) {
  const { toast } = useToast();
  const [noiseLevel, setNoiseLevel] = useState<number[]>([5]);

  const handleInjectNoise = () => {
    if (!data || data.length === 0) return;
    const rate = noiseLevel[0] / 100;
    const modified = data.map((row) => {
      const copy = { ...row };
      Object.keys(copy).forEach((key) => {
        if (Math.random() < rate) {
          if (typeof copy[key] === "number") {
            copy[key] = Math.round(copy[key] * (1 + (Math.random() * 0.2 - 0.1)));
          } else if (typeof copy[key] === "string" && copy[key].length > 3) {
            copy[key] = copy[key] + "_noise";
          }
        }
      });
      return copy;
    });

    if (onDataUpdate) onDataUpdate(modified);
    toast({
      title: "Synthetic Noise Injected! 🧪",
      description: `Applied ${noiseLevel[0]}% perturbation variance for ML stress testing.`,
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Synthetic Data Noise & Perturbation Injector
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Inject controlled synthetic noise (typos, numerical variance) to test ML model robustness.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span>Noise Variance Ratio</span>
            <span className="font-mono text-primary">{noiseLevel[0]}%</span>
          </div>
          <Slider
            value={noiseLevel}
            onValueChange={setNoiseLevel}
            max={30}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        <Button onClick={handleInjectNoise} size="sm" className="w-full font-bold text-xs uppercase tracking-wider bg-primary">
          <Sliders className="h-4 w-4 mr-2" /> Inject Synthetic Perturbations
        </Button>
      </CardContent>
    </Card>
  );
}
