'use client';

import React, { useState } from 'react';
import { Eye, Box, Download, RefreshCw, Layers, Sliders, CheckCircle2, Scan, FileJson, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BoundingBox {
  id: string;
  label: string;
  confidence: number;
  color: string;
  x: number; // percentage (0 - 100)
  y: number;
  width: number;
  height: number;
}

export function VisionDatasetSynthesizer() {
  const [selectedFormat, setSelectedFormat] = useState<'yolo' | 'coco' | 'voc'>('yolo');
  const [isGenerating, setIsGenerating] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7);

  const [boxes, setBoxes] = useState<BoundingBox[]>([
    { id: 'bb-1', label: 'autonomous_vehicle', confidence: 0.94, color: '#3b82f6', x: 18, y: 35, width: 32, height: 40 },
    { id: 'bb-2', label: 'pedestrian', confidence: 0.88, color: '#10b981', x: 58, y: 25, width: 14, height: 48 },
    { id: 'bb-3', label: 'traffic_light_green', confidence: 0.96, color: '#8b5cf6', x: 78, y: 15, width: 12, height: 28 },
    { id: 'bb-4', label: 'cyclist', confidence: 0.82, color: '#f59e0b', x: 38, y: 55, width: 18, height: 35 },
  ]);

  const generateNewScene = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const classes = [
        { label: 'autonomous_vehicle', color: '#3b82f6' },
        { label: 'pedestrian', color: '#10b981' },
        { label: 'traffic_signal', color: '#8b5cf6' },
        { label: 'delivery_robot', color: '#f43f5e' },
        { label: 'road_barrier', color: '#f59e0b' },
      ];

      const newCount = Math.floor(Math.random() * 3 + 3);
      const generated: BoundingBox[] = Array.from({ length: newCount }).map((_, i) => {
        const cls = classes[Math.floor(Math.random() * classes.length)];
        const width = Math.floor(Math.random() * 20 + 15);
        const height = Math.floor(Math.random() * 25 + 20);
        const x = Math.floor(Math.random() * (90 - width) + 5);
        const y = Math.floor(Math.random() * (85 - height) + 10);
        const conf = parseFloat((Math.random() * 0.2 + 0.8).toFixed(2));
        return { id: `bb-${Date.now()}-${i}`, label: cls.label, color: cls.color, confidence: conf, x, y, width, height };
      });

      setBoxes(generated);
      setIsGenerating(false);
    }, 600);
  };

  const filteredBoxes = boxes.filter((b) => b.confidence >= confidenceThreshold);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-blue-500/5 border-blue-500/20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <Scan className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Multi-Modal Vision & Bounding Box Synthesizer
              <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-500 bg-blue-500/10">
                CV / YOLOv8 / COCO
              </Badge>
            </h4>
            <p className="text-xs text-muted-foreground">
              Synthesize 2D bounding boxes, polygon segmentation masks, and multi-class object detection datasets.
            </p>
          </div>
        </div>

        <Button
          onClick={generateNewScene}
          disabled={isGenerating}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
        >
          {isGenerating ? <RefreshCw className="size-3.5 mr-1.5 animate-spin" /> : <Sparkles className="size-3.5 mr-1.5" />}
          {isGenerating ? 'Synthesizing Vision Frame...' : 'Generate New Scene'}
        </Button>
      </div>

      {/* Interactive Visual Canvas */}
      <div className="relative h-64 bg-background/90 rounded-2xl border border-border/60 overflow-hidden shadow-inner flex items-center justify-center select-none">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

        {/* Synthetic Frame Metadata Overlay */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <Badge className="bg-background/80 backdrop-blur-sm border-border/60 text-[10px] font-mono text-muted-foreground">
            FRAME_1920x1080_SYNTH
          </Badge>
          <Badge className="bg-emerald-500/20 text-emerald-500 text-[10px] font-mono">
            {filteredBoxes.length} Objects Detected
          </Badge>
        </div>

        {/* Rendered Bounding Boxes */}
        {filteredBoxes.map((box) => (
          <div
            key={box.id}
            className="absolute transition-all duration-500 rounded border-2 shadow-sm flex flex-col justify-between p-1"
            style={{
              left: `${box.x}%`,
              top: `${box.y}%`,
              width: `${box.width}%`,
              height: `${box.height}%`,
              borderColor: box.color,
              backgroundColor: `${box.color}15`,
            }}
          >
            <div
              className="text-[9px] font-mono font-bold text-white px-1 py-0.5 rounded shadow-sm self-start whitespace-nowrap"
              style={{ backgroundColor: box.color }}
            >
              {box.label} ({Math.round(box.confidence * 100)}%)
            </div>
            <div className="text-[8px] font-mono text-muted-foreground self-end bg-background/70 px-1 rounded">
              [{box.x.toFixed(0)}, {box.y.toFixed(0)}, {box.width.toFixed(0)}, {box.height.toFixed(0)}]
            </div>
          </div>
        ))}
      </div>

      {/* Controls & Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider flex items-center gap-1">
              <Sliders className="size-3 text-blue-500" />
              Confidence Cutoff
            </span>
            <span className="font-mono font-bold text-blue-500">{Math.round(confidenceThreshold * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="0.95"
            step="0.05"
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1">
          <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Active Annotations</span>
          <div className="text-2xl font-mono font-bold text-foreground">{filteredBoxes.length}</div>
          <div className="text-[10px] text-muted-foreground">Coordinates normalized [0.0 - 1.0]</div>
        </div>

        <div className="p-3.5 bg-muted/40 rounded-xl border border-border/40 space-y-1.5">
          <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Export Format</span>
          <div className="flex items-center gap-1">
            {(['yolo', 'coco', 'voc'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`flex-1 py-1 text-xs font-mono font-bold uppercase rounded-lg transition-colors ${
                  selectedFormat === fmt
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-background text-muted-foreground hover:text-foreground border border-border/60'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Code Export Preview */}
      <div className="p-3.5 bg-background border border-border/60 rounded-xl space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1.5">
            <FileJson className="size-3.5 text-blue-500" />
            {selectedFormat.toUpperCase()} Annotation Output Preview
          </span>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
            <CheckCircle2 className="size-3" /> Ready for PyTorch / Ultralytics Training
          </span>
        </div>
        <div className="text-[11px] font-mono text-blue-400 bg-muted/30 p-2.5 rounded-lg overflow-x-auto whitespace-pre">
          {selectedFormat === 'yolo' &&
            filteredBoxes
              .map(
                (b, idx) =>
                  `${idx} ${(b.x / 100 + b.width / 200).toFixed(4)} ${(b.y / 100 + b.height / 200).toFixed(4)} ${(b.width / 100).toFixed(4)} ${(b.height / 100).toFixed(4)} # ${b.label}`
              )
              .join('\n')}
          {selectedFormat === 'coco' &&
            JSON.stringify(
              {
                images: [{ id: 1, file_name: 'synthetic_scene_001.jpg', width: 1920, height: 1080 }],
                annotations: filteredBoxes.map((b, i) => ({
                  id: i + 1,
                  image_id: 1,
                  category_id: i + 1,
                  bbox: [b.x * 19.2, b.y * 10.8, b.width * 19.2, b.height * 10.8],
                  area: b.width * 19.2 * b.height * 10.8,
                  iscrowd: 0,
                })),
              },
              null,
              2
            )}
          {selectedFormat === 'voc' &&
            `<annotation>\n  <filename>synthetic_scene_001.jpg</filename>\n  <size><width>1920</width><height>1080</height></size>\n${filteredBoxes
              .map((b) => `  <object><name>${b.label}</name><bndbox><xmin>${(b.x * 19.2).toFixed(0)}</xmin><ymin>${(b.y * 10.8).toFixed(0)}</ymin></bndbox></object>`)
              .join('\n')}\n</annotation>`}
        </div>
      </div>
    </div>
  );
}
