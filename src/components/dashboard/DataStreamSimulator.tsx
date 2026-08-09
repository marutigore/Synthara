"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Play, Square } from "lucide-react";

export function DataStreamSimulator() {
  const [active, setActive] = useState(false);

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Real-Time Streaming Data Generator & Event Producer
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Simulate high-velocity continuous event streams (10 events/sec).
            </CardDescription>
          </div>
          <Button onClick={() => setActive(!active)} size="sm" variant={active ? "destructive" : "default"} className="h-8 text-xs font-bold gap-1 bg-primary">
            {active ? <Square className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {active ? "Stop Stream" : "Start Live Stream"}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
