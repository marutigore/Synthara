'use client';

import React from 'react';

interface SparklineProps {
  data?: number[];
  color?: string;
  height?: number;
  width?: number;
}

export function Sparkline({
  data = [12, 18, 14, 22, 19, 28, 34],
  color = '#3b82f6',
  height = 36,
  width = 90,
}: SparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;
  const lastPoint = points[points.length - 1].split(',');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      {/* Area Fill */}
      <path d={areaD} fill={`url(#spark-grad-${color})`} />
      {/* Line Path */}
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Last Value Pulsing Dot */}
      <circle cx={lastPoint[0]} cy={lastPoint[1]} r="3" fill={color} className="animate-ping opacity-75" />
      <circle cx={lastPoint[0]} cy={lastPoint[1]} r="2.5" fill={color} />
    </svg>
  );
}
