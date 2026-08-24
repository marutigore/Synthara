'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, MousePointer2, Wifi, Activity, Sparkles, MessageSquare, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface PeerUser {
  id: string;
  name: string;
  avatar: string;
  color: string;
  status: 'active' | 'idle';
  currentAction: string;
  cursorPos: { x: number; y: number };
}

export function LiveCollaborationCursors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [peers, setPeers] = useState<PeerUser[]>([
    {
      id: 'usr-1',
      name: 'Sarah Chen (Data Eng)',
      avatar: 'SC',
      color: '#3b82f6',
      status: 'active',
      currentAction: 'Refining Schema: order_items',
      cursorPos: { x: 28, y: 42 },
    },
    {
      id: 'usr-2',
      name: 'Alex Rivera (ML Ops)',
      avatar: 'AR',
      color: '#10b981',
      status: 'active',
      currentAction: 'Running PII Anonymizer on dataset #84',
      cursorPos: { x: 68, y: 30 },
    },
    {
      id: 'usr-3',
      name: 'Elena Rostova (Lead AI)',
      avatar: 'ER',
      color: '#8b5cf6',
      status: 'active',
      currentAction: 'Exporting Snowflake Iceberg parquet',
      cursorPos: { x: 50, y: 75 },
    },
  ]);

  const [myCursor, setMyCursor] = useState<{ x: number; y: number }>({ x: 15, y: 20 });
  const [latencyMs, setLatencyMs] = useState(18);

  // Simulate remote peer cursor motion
  useEffect(() => {
    const interval = setInterval(() => {
      setPeers((prev) =>
        prev.map((peer) => {
          const deltaX = (Math.random() - 0.5) * 8;
          const deltaY = (Math.random() - 0.5) * 8;
          const newX = Math.max(5, Math.min(90, peer.cursorPos.x + deltaX));
          const newY = Math.max(10, Math.min(85, peer.cursorPos.y + deltaY));
          return { ...peer, cursorPos: { x: newX, y: newY } };
        })
      );
      setLatencyMs(Math.floor(Math.random() * 8 + 14));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMyCursor({ x, y });
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-violet-500/5 border-violet-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500 border border-violet-500/20">
            <Users className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Real-Time Collaboration & Multiplayer Cursors
              <Badge variant="outline" className="text-[10px] border-violet-500/30 text-violet-500 bg-violet-500/10">
                Supabase Realtime
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Live presence channels, cursor telemetry, and collaborative dataset crafting.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-500 font-mono">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>WebSocket Live ({latencyMs}ms)</span>
          </div>
        </div>
      </div>

      {/* Online Team Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/40 rounded-xl border border-border/40">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Active Workspace Peers:</span>
          <div className="flex items-center -space-x-2">
            {peers.map((peer) => (
              <div
                key={peer.id}
                className="relative group"
                title={`${peer.name} — ${peer.currentAction}`}
              >
                <div
                  className="size-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-background shadow-sm"
                  style={{ backgroundColor: peer.color }}
                >
                  {peer.avatar}
                </div>
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 border-2 border-background" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <span className="font-bold text-foreground">{peers.length + 1} users</span> currently syncing this session
        </div>
      </div>

      {/* Interactive Multiplayer Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative h-64 bg-background/80 rounded-2xl border border-border/60 overflow-hidden cursor-crosshair select-none p-4 shadow-inner"
      >
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

        {/* Dataset Table Mockup in Background */}
        <div className="absolute inset-4 rounded-xl border border-border/40 bg-card/60 p-3 pointer-events-none space-y-2">
          <div className="flex items-center justify-between border-b border-border/30 pb-2">
            <span className="text-xs font-bold text-foreground">dataset_customer_transactions_v2.parquet</span>
            <Badge variant="outline" className="text-[9px]">4.8K Rows</Badge>
          </div>
          <div className="grid grid-cols-4 gap-2 text-[10px] font-mono text-muted-foreground">
            <div className="p-1.5 bg-muted/40 rounded">customer_id</div>
            <div className="p-1.5 bg-muted/40 rounded">amount_usd</div>
            <div className="p-1.5 bg-muted/40 rounded">risk_score</div>
            <div className="p-1.5 bg-muted/40 rounded">status</div>
          </div>
          <div className="text-[10px] text-muted-foreground/60 italic pt-6 text-center">
            Hover over the workspace canvas to broadcast your cursor coordinates in real-time.
          </div>
        </div>

        {/* Remote Peer Cursors */}
        {peers.map((peer) => (
          <div
            key={peer.id}
            className="absolute transition-all duration-700 ease-out pointer-events-none z-20"
            style={{
              left: `${peer.cursorPos.x}%`,
              top: `${peer.cursorPos.y}%`,
            }}
          >
            <MousePointer2
              className="size-4 -rotate-45 drop-shadow-md"
              style={{ color: peer.color, fill: peer.color }}
            />
            <div
              className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-md whitespace-nowrap mt-1 -ml-2"
              style={{ backgroundColor: peer.color }}
            >
              {peer.name.split(' ')[0]}
            </div>
          </div>
        ))}
      </div>

      {/* Live Peer Action Stream */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
          Live Peer Action Stream
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {peers.map((peer) => (
            <div
              key={peer.id}
              className="p-3 bg-muted/30 border border-border/40 rounded-xl space-y-1 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ backgroundColor: peer.color }} />
                <span className="font-bold text-foreground">{peer.name}</span>
              </div>
              <div className="text-muted-foreground text-[11px] truncate">{peer.currentAction}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
