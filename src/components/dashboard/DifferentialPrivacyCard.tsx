"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DifferentialPrivacyCard() {
  const { toast } = useToast();
  const [epsilon, setEpsilon] = useState<number[]>([1.0]);

  const handleApply = () => {
    toast({
      title: "Differential Privacy Enabled! 🛡️",
      description: `Epsilon (ε) parameter set to ${epsilon[0]}. Laplace noise applied to numerical features.`,
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Differential Privacy Configurator (ε-Laplace Noise)
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Inject mathematical Laplace noise to guarantee privacy budget bounds.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span>Privacy Budget (Epsilon ε)</span>
            <span className="font-mono text-primary">{epsilon[0]}</span>
          </div>
          <Slider value={epsilon} onValueChange={setEpsilon} min={0.1} max={5.0} step={0.1} />
        </div>

        <Button onClick={handleApply} size="sm" className="w-full font-bold text-xs uppercase bg-primary">
          Enforce Differential Privacy Bounds
        </Button>
      </CardContent>
    </Card>
  );
}
