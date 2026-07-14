"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, Play, Plus, Trash2, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScheduledJob {
  id: string;
  name: string;
  query: string;
  frequency: string;
  time: string;
  enabled: boolean;
  nextRun: string;
}

export function ScheduleJobForm({ defaultQuery = "" }: { defaultQuery?: string }) {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<ScheduledJob[]>([]);
  const [name, setName] = useState("");
  const [query, setQuery] = useState(defaultQuery);
  const [frequency, setFrequency] = useState("Daily");
  const [time, setTime] = useState("09:00");

  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  useEffect(() => {
    const saved = localStorage.getItem("synthara-scheduled-jobs");
    if (saved) {
      setJobs(JSON.parse(saved));
    } else {
      const initial: ScheduledJob[] = [
        {
          id: "job-1",
          name: "Daily Shop Product Tracker",
          query: "Scrape daily price indexes of Shopify apparel stores",
          frequency: "Daily",
          time: "08:00",
          enabled: true,
          nextRun: "Tomorrow at 08:00 AM"
        },
        {
          id: "job-2",
          name: "Weekly AI Research Digest",
          query: "Scrape recent arXiv deep learning papers",
          frequency: "Weekly (Mondays)",
          time: "12:00",
          enabled: false,
          nextRun: "Next Monday at 12:00 PM"
        }
      ];
      setJobs(initial);
      localStorage.setItem("synthara-scheduled-jobs", JSON.stringify(initial));
    }
  }, []);

  const saveJobs = (newJobs: ScheduledJob[]) => {
    setJobs(newJobs);
    localStorage.setItem("synthara-scheduled-jobs", JSON.stringify(newJobs));
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !query.trim()) {
      toast({
        title: "Incomplete details",
        description: "Please specify both a job name and target query.",
        variant: "destructive"
      });
      return;
    }

    const newJob: ScheduledJob = {
      id: `job-${Date.now()}`,
      name: name.trim(),
      query: query.trim(),
      frequency,
      time,
      enabled: true,
      nextRun: frequency === "Daily" ? "Tomorrow at " + time : "Next scheduled interval"
    };

    const updated = [...jobs, newJob];
    saveJobs(updated);
    setName("");
    toast({
      title: "Scraper task scheduled",
      description: `Recurring crawler job '${newJob.name}' created.`
    });
  };

  const toggleJob = (id: string) => {
    const updated = jobs.map((job) =>
      job.id === id ? { ...job, enabled: !job.enabled } : job
    );
    saveJobs(updated);
    const target = updated.find(j => j.id === id);
    toast({
      title: target?.enabled ? "Schedule enabled" : "Schedule paused",
      description: `'${target?.name}' recurring updates ${target?.enabled ? "resumed" : "halted"}.`
    });
  };

  const deleteJob = (id: string) => {
    const target = jobs.find(j => j.id === id);
    const updated = jobs.filter((job) => job.id !== id);
    saveJobs(updated);
    toast({
      title: "Job removed",
      description: `Scheduled job '${target?.name}' was deleted.`
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm">
      <CardHeader className="pb-3 border-b border-border/10">
        <div>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Automated Crawler Scheduling (Cron)
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Schedule queries to scrape sites periodically, compile new rows, and rebuild your target datasets.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Creation Form */}
        <form onSubmit={handleAddJob} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-secondary/10 p-4 rounded-xl border border-border/40">
          <div className="space-y-1.5 md:col-span-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Job Name</label>
            <Input
              type="text"
              placeholder="e.g. Price Monitor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-card text-xs md:text-sm h-10 border-border/50 focus:ring-primary rounded-xl"
            />
          </div>

          <div className="space-y-1.5 md:col-span-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Scrape Query</label>
            <Input
              type="text"
              placeholder="Query description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-card text-xs md:text-sm h-10 border-border/50 focus:ring-primary rounded-xl"
            />
          </div>

          <div className="space-y-1.5 col-span-1 grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-card border border-border/50 text-foreground text-xs md:text-sm h-10 rounded-xl px-2 outline-none"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Run Time</label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-card text-xs md:text-sm h-10 border-border/50 px-2 rounded-xl"
              />
            </div>
          </div>

          <Button type="submit" className="h-10 rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider bg-primary gap-1">
            <Plus className="h-4 w-4" /> Schedule Job
          </Button>
        </form>

        {/* Scheduled Tasks List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            Active Schedules ({jobs.length})
          </h4>
          <div className="divide-y divide-border/20 border border-border/50 rounded-xl overflow-hidden bg-card">
            {jobs.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No active schedules. Use the form above to deploy one.
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/10 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground">{job.name}</span>
                      <Badge variant="outline" className="text-[10px] uppercase font-mono py-0.5 px-2 bg-secondary/50">
                        {job.frequency} @ {job.time}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate max-w-lg">{job.query}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
                      <Clock className="h-3 w-3" /> Next run: {job.nextRun}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <Switch
                      checked={job.enabled}
                      onCheckedChange={() => toggleJob(job.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteJob(job.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-rose-500 rounded-lg hover:bg-rose-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
