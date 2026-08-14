'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Compass, CheckCircle2, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GpsWaypoint {
  id: string;
  driverToken: string;
  lat: number;
  lng: number;
  speedKmh: number;
  h3Index: string;
  geofenceZone: string;
}

export function GeospatialGisSynthesizer() {
  const [waypoints, setWaypoints] = useState<GpsWaypoint[]>([
    { id: '1', driverToken: 'DRIVER-4091', lat: 37.7749, lng: -122.4194, speedKmh: 42, h3Index: '8928308280fffff', geofenceZone: 'Downtown SF Hub' },
    { id: '2', driverToken: 'DRIVER-4092', lat: 37.7833, lng: -122.4167, speedKmh: 28, h3Index: '89283082813ffff', geofenceZone: 'Financial District' },
    { id: '3', driverToken: 'DRIVER-4093', lat: 37.7694, lng: -122.4461, speedKmh: 55, h3Index: '8928308282bffff', geofenceZone: 'Golden Gate Park' },
  ]);

  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const moveWaypoints = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setWaypoints((prev) =>
        prev.map((w) => ({
          ...w,
          lat: parseFloat((w.lat + (Math.random() - 0.5) * 0.01).toFixed(4)),
          lng: parseFloat((w.lng + (Math.random() - 0.5) * 0.01).toFixed(4)),
          speedKmh: Math.floor(Math.random() * 30 + 20),
        }))
      );
      setIsSynthesizing(false);
    }, 600);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-emerald-500/5 border-emerald-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Compass className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Geospatial GIS Trajectory & Spatial H3 Synthesizer
            </h4>
            <p className="text-xs text-muted-foreground">
              Synthesizes GPS latitude/longitude trajectories, Uber H3 spatial indexing, & geofence telemetry.
            </p>
          </div>
        </div>

        <Button
          onClick={moveWaypoints}
          disabled={isSynthesizing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
        >
          <Navigation className={`size-3.5 mr-1.5 ${isSynthesizing ? 'animate-spin' : ''}`} />
          {isSynthesizing ? 'Calculating GPS...' : 'Simulate Fleet Trajectory'}
        </Button>
      </div>

      {/* Waypoints Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Driver Token</th>
              <th className="p-3">GPS Coordinates (Lat, Lng)</th>
              <th className="p-3">Speed (km/h)</th>
              <th className="p-3">Uber H3 Spatial Hex Index</th>
              <th className="p-3">Geofence Polygon Zone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {waypoints.map((w) => (
              <tr key={w.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 font-bold text-primary">{w.driverToken}</td>
                <td className="p-3 text-foreground font-semibold flex items-center gap-1">
                  <MapPin className="size-3 text-emerald-500" /> {w.lat}, {w.lng}
                </td>
                <td className="p-3 font-mono font-bold text-emerald-500">{w.speedKmh} km/h</td>
                <td className="p-3 text-muted-foreground font-mono text-[10px]">{w.h3Index}</td>
                <td className="p-3 text-foreground font-bold">{w.geofenceZone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-500 font-semibold">
        <span className="flex items-center gap-2">
          <Layers className="size-4" /> Spatial H3 Resolution: 9 (100m Precision) • Geofence Integrity: 100%
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Fleet Active</span>
      </div>
    </div>
  );
}
