"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, Award, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DatasetRatingCardProps {
  fillRate?: number;
  uniqueness?: number;
}

export function DatasetRatingCard({ fillRate = 98, uniqueness = 95 }: DatasetRatingCardProps) {
  const score = Math.round((fillRate + uniqueness) / 2);
  const grade = score > 90 ? "A+" : score > 80 ? "A" : "B";

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Synthetic Data Usability Rating Score
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Composite rating based on fill completeness and row entropy.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-amber-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">Production-Ready ML Quality</span>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="text-xl font-mono font-black py-1 px-3 bg-primary/10 text-primary border-primary/20">
            {score}/100 ({grade})
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
