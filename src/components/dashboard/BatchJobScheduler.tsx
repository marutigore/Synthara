"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function BatchJobScheduler() {
  const { toast } = useToast();
  const [cron, setCron] = useState("0 0 * * *");

  const handleSchedule = () => {
    toast({
      title: "Batch Job Scheduled! ⏰",
      description: `Recurring generation cron active: ${cron}`,
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Recurring Batch Job Pipeline Scheduler
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Schedule automated recurring scraping & synthetic generation runs.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="p-3 rounded-xl bg-secondary/15 border border-border/30 flex items-center justify-between">
          <span className="text-xs font-mono">Daily Nightly Refresh</span>
          <Badge variant="outline" className="font-mono text-[10px]">0 0 * * *</Badge>
        </div>

        <Button onClick={handleSchedule} size="sm" className="w-full font-bold text-xs uppercase bg-primary">
          <Clock className="h-4 w-4 mr-2" /> Enable Recurring Schedule
        </Button>
      </CardContent>
    </Card>
  );
}
