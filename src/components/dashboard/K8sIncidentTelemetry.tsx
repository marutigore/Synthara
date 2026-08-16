'use client';

import React, { useState } from 'react';
import { Server, AlertTriangle, Cpu, HardDrive, Activity, RefreshCw, CheckCircle2, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface K8sIncident {
  id: string;
  podName: string;
  namespace: string;
  nodeName: string;
  reason: 'OOMKilled' | 'ImagePullBackOff' | 'CrashLoopBackOff' | 'CPU Throttled' | 'Evicted';
  cpuUsage: string;
  memoryUsage: string;
  restartCount: number;
  severity: 'P1 — Critical' | 'P2 — High' | 'P3 — Warning';
}

export function K8sIncidentTelemetry() {
  const [incidents, setIncidents] = useState<K8sIncident[]>([
    { id: '1', podName: 'api-gateway-5f8b9-xk4r2', namespace: 'production', nodeName: 'gke-node-pool-a1', reason: 'OOMKilled', cpuUsage: '120m / 250m', memoryUsage: '512Mi / 512Mi', restartCount: 7, severity: 'P1 — Critical' },
    { id: '2', podName: 'ml-inference-d9a12-v8n3p', namespace: 'ml-serving', nodeName: 'gke-gpu-pool-b2', reason: 'CPU Throttled', cpuUsage: '1980m / 2000m', memoryUsage: '3.8Gi / 4Gi', restartCount: 0, severity: 'P2 — High' },
    { id: '3', podName: 'data-worker-7c3e1-q2m8x', namespace: 'batch-jobs', nodeName: 'gke-node-pool-c3', reason: 'CrashLoopBackOff', cpuUsage: '45m / 500m', memoryUsage: '128Mi / 1Gi', restartCount: 14, severity: 'P1 — Critical' },
    { id: '4', podName: 'redis-cache-0', namespace: 'infrastructure', nodeName: 'gke-node-pool-a1', reason: 'Evicted', cpuUsage: '10m / 100m', memoryUsage: '2Gi / 2Gi', restartCount: 1, severity: 'P3 — Warning' },
  ]);

  const [isSimulating, setIsSimulating] = useState(false);

  const simulateChaos = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIncidents((prev) =>
        prev.map((i) => ({
          ...i,
          restartCount: i.restartCount + Math.floor(Math.random() * 3),
        }))
      );
      setIsSimulating(false);
    }, 650);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-violet-500/5 border-violet-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500 border border-violet-500/20">
            <Server className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Kubernetes SRE Incident & Chaos Telemetry Generator
            </h4>
            <p className="text-xs text-muted-foreground">
              Simulates pod crashes (OOMKilled, CrashLoopBackOff), CPU throttling, and node eviction events.
            </p>
          </div>
        </div>

        <Button
          onClick={simulateChaos}
          disabled={isSimulating}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/20"
        >
          <Flame className={`size-3.5 mr-1.5 ${isSimulating ? 'animate-bounce' : ''}`} />
          {isSimulating ? 'Injecting Chaos...' : 'Simulate Pod Failures'}
        </Button>
      </div>

      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Pod Name & Namespace</th>
              <th className="p-3">Failure Reason</th>
              <th className="p-3">CPU / Memory</th>
              <th className="p-3">Restarts</th>
              <th className="p-3">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {incidents.map((i) => (
              <tr key={i.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="font-bold text-foreground">{i.podName}</div>
                  <div className="text-[10px] text-muted-foreground">{i.namespace} / {i.nodeName}</div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    i.reason === 'OOMKilled' || i.reason === 'CrashLoopBackOff' ? 'bg-red-500/20 text-red-500' :
                    i.reason === 'CPU Throttled' ? 'bg-amber-500/20 text-amber-500' : 'bg-muted text-muted-foreground'
                  }`}>
                    {i.reason}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-[10px]"><Cpu className="size-3 inline mr-1 text-muted-foreground" />{i.cpuUsage}</div>
                  <div className="text-[10px]"><HardDrive className="size-3 inline mr-1 text-muted-foreground" />{i.memoryUsage}</div>
                </td>
                <td className="p-3 font-bold text-red-500">{i.restartCount}x</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${
                    i.severity.includes('P1') ? 'bg-red-500/20 text-red-500 animate-pulse' :
                    i.severity.includes('P2') ? 'bg-orange-500/20 text-orange-500' : 'bg-amber-500/20 text-amber-500'
                  }`}>
                    {i.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-between text-xs text-violet-500 font-semibold">
        <span className="flex items-center gap-2">
          <Activity className="size-4" /> Prometheus Metrics Exporting • PagerDuty Webhook Alert Armed
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Cluster Health: Degraded</span>
      </div>
    </div>
  );
}
