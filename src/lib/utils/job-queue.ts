"use client";

export interface QueuedJob {
  id: string;
  name: string;
  query: string;
  status: "queued" | "running" | "completed" | "failed";
  progress: number;
  error?: string;
  startedAt: string;
  engine: string;
}

export function getJobsQueue(): QueuedJob[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("synthara-background-jobs");
  return saved ? JSON.parse(saved) : [];
}

export function saveJobsQueue(jobs: QueuedJob[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("synthara-background-jobs", JSON.stringify(jobs));
  // Fire storage event to trigger reactive hooks across components
  window.dispatchEvent(new Event("storage"));
}

export function registerNewQueueJob(name: string, query: string, engine: string = "Crawl4AI Engine"): QueuedJob {
  const newJob: QueuedJob = {
    id: `job-${Math.random().toString(36).substring(2, 6)}`,
    name,
    query,
    status: "queued",
    progress: 0,
    startedAt: new Date().toLocaleTimeString(),
    engine
  };

  const current = getJobsQueue();
  saveJobsQueue([...current, newJob]);
  return newJob;
}

export function updateQueueJobStatus(id: string, progress: number, status: QueuedJob["status"], error?: string): void {
  const current = getJobsQueue();
  const updated = current.map((j) => {
    if (j.id === id) {
      return { ...j, progress, status, error };
    }
    return j;
  });
  saveJobsQueue(updated);
}
