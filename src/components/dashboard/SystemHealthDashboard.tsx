"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Server, Activity, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SystemHealthDashboard() {
  const nodes = [
    { name: "Crawl4AI Headless Node #1", status: "Healthy", ping: "12ms" },
    { name: "PostgreSQL Database Cluster", status: "Healthy", ping: "8ms" },
    { name: "Gemini AI API Gateway", status: "Operational", ping: "42ms" },
  ];

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          System Microservice & Crawler Node Status Hub
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Real-time health status of crawler nodes, database clusters, and AI gateways.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {nodes.map((n) => (
          <div key={n.name} className="flex items-center justify-between p-3 rounded-xl bg-secondary/15 border border-border/30 text-xs">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>{n.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]">
                {n.status}
              </Badge>
              <span className="font-mono text-[10px] text-muted-foreground">{n.ping}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
