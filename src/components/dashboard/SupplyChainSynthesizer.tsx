'use client';

import React, { useState } from 'react';
import { Truck, Anchor, Package, RefreshCw, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShipmentNode {
  containerId: string;
  originPort: string;
  destPort: string;
  carrier: string;
  status: 'In Transit' | 'Port Congestion' | 'Delivered' | 'Customs Hold';
  delayHours: number;
}

export function SupplyChainSynthesizer() {
  const [shipments, setShipments] = useState<ShipmentNode[]>([
    { containerId: 'MSKU-8492019', originPort: 'Shanghai (CNSHA)', destPort: 'Los Angeles (USLAX)', carrier: 'Maersk Line', status: 'In Transit', delayHours: 0 },
    { containerId: 'CMAU-1029384', originPort: 'Rotterdam (NLRTM)', destPort: 'Singapore (SGSIN)', carrier: 'CMA CGM', status: 'Port Congestion', delayHours: 18 },
    { containerId: 'HLCU-9988776', originPort: 'Hamburg (DEHAM)', destPort: 'New York (USNYC)', carrier: 'Hapag-Lloyd', status: 'Customs Hold', delayHours: 42 },
    { containerId: 'EVER-3344556', originPort: 'Shenzhen (CNSZX)', destPort: 'Long Beach (USLGB)', carrier: 'Evergreen Marine', status: 'Delivered', delayHours: 0 },
  ]);

  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const refreshShipments = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setShipments((prev) =>
        prev.map((s) => ({
          ...s,
          delayHours: Math.floor(Math.random() * 24),
          status: Math.random() > 0.4 ? 'In Transit' : 'Port Congestion',
        }))
      );
      setIsSynthesizing(false);
    }, 600);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-blue-500/5 border-blue-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Truck className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Supply Chain Logistics & Container Synthesizer
            </h4>
            <p className="text-xs text-muted-foreground">
              Synthesizes global container telemetry, port congestion delays, and SKU dispatch flows.
            </p>
          </div>
        </div>

        <Button
          onClick={refreshShipments}
          disabled={isSynthesizing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isSynthesizing ? 'animate-spin' : ''}`} />
          {isSynthesizing ? 'Updating...' : 'Synthesize Logistics'}
        </Button>
      </div>

      {/* Shipments Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Container ID</th>
              <th className="p-3">Origin → Destination</th>
              <th className="p-3">Carrier Line</th>
              <th className="p-3">Delay Impact</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {shipments.map((s) => (
              <tr key={s.containerId} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 font-bold text-primary">{s.containerId}</td>
                <td className="p-3 text-foreground font-semibold flex items-center gap-1.5">
                  <MapPin className="size-3 text-muted-foreground" /> {s.originPort} → {s.destPort}
                </td>
                <td className="p-3 text-muted-foreground">{s.carrier}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    s.delayHours > 20 ? 'bg-red-500/20 text-red-500' : s.delayHours > 0 ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {s.delayHours > 0 ? `+${s.delayHours}h Delay` : 'On Schedule'}
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-muted text-muted-foreground border border-border/40">
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs text-blue-500 font-semibold">
        <span className="flex items-center gap-2">
          <Anchor className="size-4" /> 4 Global Maritime Corridors Active • Logistics Pipeline Healthy
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Average Latency: 14.5h</span>
      </div>
    </div>
  );
}
