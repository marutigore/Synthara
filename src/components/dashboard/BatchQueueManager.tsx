"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListPlus, Play, Trash2, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QueueItem {
  id: string;
  prompt: string;
  rows: number;
  status: "pending" | "running" | "completed";
}

export function BatchQueueManager() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [newPrompt, setNewPrompt] = useState("");
  const [newRows, setNewRows] = useState(25);

  const handleAddToQueue = () => {
    if (!newPrompt.trim()) return;
    const newItem: QueueItem = {
      id: Math.random().toString(36).substring(2, 7),
      prompt: newPrompt.trim(),
      rows: newRows,
      status: "pending"
    };
    setQueue([...queue, newItem]);
    setNewPrompt("");
  };

  const handleRemoveItem = (id: string) => {
    setQueue(queue.filter((i) => i.id !== id));
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <ListPlus className="h-5 w-5 text-primary" />
          Batch Generation Queue & Pipeline Manager
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Queue up sequential generation jobs for multi-dataset synthesis pipelines.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Add job prompt to batch queue..."
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            className="flex-1 h-9 bg-background border border-border/50 rounded-xl px-3 text-xs outline-none focus:ring-1 focus:ring-primary font-medium"
          />
          <input
            type="number"
            value={newRows}
            onChange={(e) => setNewRows(Number(e.target.value))}
            className="w-20 h-9 bg-background border border-border/50 rounded-xl px-3 text-xs text-center font-mono outline-none focus:ring-1 focus:ring-primary"
          />
          <Button onClick={handleAddToQueue} size="sm" className="h-9 px-4 text-xs font-bold uppercase tracking-wider bg-primary">
            + Queue Job
          </Button>
        </div>

        <div className="space-y-2">
          {queue.length === 0 ? (
            <p className="text-xs text-muted-foreground italic text-center py-6 border border-dashed border-border/40 rounded-xl">
              No pending jobs queued.
            </p>
          ) : (
            queue.map((item, idx) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/15 border border-border/30 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-muted-foreground">#{idx + 1}</span>
                  <span className="font-medium text-foreground truncate max-w-[260px]">{item.prompt}</span>
                  <Badge variant="outline" className="text-[10px] font-mono">{item.rows} rows</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[10px]">
                    <Clock className="h-3 w-3 mr-1" /> Pending
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="h-7 w-7 text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
