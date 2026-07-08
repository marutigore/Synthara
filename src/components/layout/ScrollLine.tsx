"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 4000 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight || 4000,
      });
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(window.scrollY / scrollHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { width, height } = dimensions;
  const midX = width / 2;

  // Graceful curves down the page connecting sections
  const pathData = `
    M ${midX} 10
    C ${width * 0.8} ${height * 0.15}, ${width * 0.1} ${height * 0.35}, ${midX} ${height * 0.5}
    C ${width * 0.9} ${height * 0.65}, ${width * 0.15} ${height * 0.85}, ${midX} ${height - 50}
  `;

  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathData]);

  const strokeDashoffset = pathLength - pathLength * scrollProgress;

  const [point, setPoint] = useState({ x: midX, y: 10 });
  useEffect(() => {
    if (pathRef.current && pathLength > 0) {
      try {
        const p = pathRef.current.getPointAtLength(pathLength * scrollProgress);
        setPoint({ x: p.x, y: p.y });
      } catch (e) {}
    }
  }, [scrollProgress, pathLength]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full"
        style={{ height: `${height}px` }}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        <path
          d={pathData}
          className="stroke-muted-foreground/10"
          strokeWidth="2"
          strokeDasharray="4 8"
        />

        <path
          ref={pathRef}
          d={pathData}
          stroke="url(#neon-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
          className="opacity-70"
          style={{
            filter: "drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.8)) drop-shadow(0px 0px 16px rgba(139, 92, 246, 0.4))",
          }}
        />

        <path
          d={pathData}
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
        />

        <circle
          cx={point.x}
          cy={point.y}
          r="6"
          fill="#ffffff"
          className="animate-pulse"
          style={{
            filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 1)) drop-shadow(0px 0px 20px rgba(139, 92, 246, 0.8))",
          }}
        />

        <defs>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
