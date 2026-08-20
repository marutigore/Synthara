'use client';

import React, { useState, useEffect } from 'react';
import { Network, Share2, Play, GitMerge, Server, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Node {
  id: string;
  label: string;
  type: 'Person' | 'Account' | 'Device';
  x: number;
  y: number;
}

interface Edge {
  source: string;
  target: string;
  label: string;
}

export function SyntheticGraphNetworkVisualizer() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateFraudRing = () => {
    setIsGenerating(true);
    // Simulate generating a synthetic fraud ring network
    setTimeout(() => {
      const centerX = 150;
      const centerY = 100;
      
      const newNodes: Node[] = [
        { id: 'n1', label: 'Compromised IP', type: 'Device', x: centerX, y: centerY },
        { id: 'n2', label: 'User A', type: 'Person', x: centerX - 80, y: centerY - 60 },
        { id: 'n3', label: 'User B', type: 'Person', x: centerX + 80, y: centerY - 60 },
        { id: 'n4', label: 'Offshore Acct', type: 'Account', x: centerX, y: centerY + 80 },
      ];

      const newEdges: Edge[] = [
        { source: 'n2', target: 'n1', label: 'Logs In From' },
        { source: 'n3', target: 'n1', label: 'Logs In From' },
        { source: 'n2', target: 'n4', label: 'Transfers To' },
        { source: 'n3', target: 'n4', label: 'Transfers To' },
      ];

      setNodes(newNodes);
      setEdges(newEdges);
      setIsGenerating(false);
    }, 800);
  };

  useEffect(() => {
    generateFraudRing();
  }, []);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-indigo-500/5 border-indigo-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
      
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Network className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Synthetic Graph Network Visualizer
            </h4>
            <p className="text-xs text-muted-foreground">
              Generate complex Node/Edge relationships for graph databases (Neo4j, AWS Neptune).
            </p>
          </div>
        </div>

        <Button
          onClick={generateFraudRing}
          disabled={isGenerating}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
        >
          {isGenerating ? (
            <Activity className="size-3.5 mr-1.5 animate-pulse" />
          ) : (
            <Share2 className="size-3.5 mr-1.5" />
          )}
          {isGenerating ? 'Simulating Ring...' : 'Generate Fraud Ring'}
        </Button>
      </div>

      <div className="relative h-[220px] w-full bg-background/50 rounded-2xl border border-border/40 overflow-hidden flex items-center justify-center">
        {/* Graph Canvas Simulation */}
        {isGenerating ? (
          <div className="flex flex-col items-center gap-2 text-indigo-500">
            <Server className="size-8 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest">Synthesizing Topology...</span>
          </div>
        ) : (
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 300 220">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
              </marker>
            </defs>
            {/* Edges */}
            {edges.map((edge, idx) => {
              const sourceNode = nodes.find(n => n.id === edge.source);
              const targetNode = nodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;
              
              const midX = (sourceNode.x + targetNode.x) / 2;
              const midY = (sourceNode.y + targetNode.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke="#6366f1"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                    markerEnd="url(#arrowhead)"
                  />
                  <rect x={midX - 25} y={midY - 8} width="50" height="16" rx="4" fill="#1e1e2e" stroke="#313244" strokeWidth="1" />
                  <text x={midX} y={midY + 3} fontSize="6" fill="#a6adc8" textAnchor="middle" fontWeight="bold">
                    {edge.label}
                  </text>
                </g>
              );
            })}
            
            {/* Nodes */}
            {nodes.map(node => (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle r="16" fill="#1e1e2e" stroke="#6366f1" strokeWidth="2" />
                {node.type === 'Device' && <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#6366f1" opacity="0.8" />}
                {node.type === 'Person' && <circle cx="0" cy="-2" r="3" fill="#6366f1" opacity="0.8" /><path d="M -6 6 Q 0 0 6 6" stroke="#6366f1" fill="none" strokeWidth="2" />}
                {node.type === 'Account' && <circle r="6" fill="none" stroke="#10b981" strokeWidth="2" />}
                
                <text y="26" fontSize="8" fill="#cdd6f4" textAnchor="middle" fontWeight="bold">
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-muted/40 rounded-xl border border-border/40 flex justify-between items-center">
          <span className="text-xs text-muted-foreground font-semibold">Generated Nodes</span>
          <span className="font-mono text-sm font-bold text-foreground">{nodes.length}</span>
        </div>
        <div className="p-3 bg-muted/40 rounded-xl border border-border/40 flex justify-between items-center">
          <span className="text-xs text-muted-foreground font-semibold">Generated Edges</span>
          <span className="font-mono text-sm font-bold text-foreground">{edges.length}</span>
        </div>
      </div>
    </div>
  );
}
