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

  // Graceful curves down the page connecting sections (constrained to center 30% width swing)
  const pathData = `
    M ${midX} 10
    C ${midX + Math.min(250, width * 0.15)} ${height * 0.15}, ${midX - Math.min(250, width * 0.15)} ${height * 0.35}, ${midX} ${height * 0.5}
    C ${midX + Math.min(250, width * 0.15)} ${height * 0.65}, ${midX - Math.min(250, width * 0.15)} ${height * 0.85}, ${midX} ${height - 50}
  `;

  const [pathLength, setPathLength] = useState(0);
  const [lineSparks, setLineSparks] = useState<Array<{ x: number; y: number; r: number; delay: string; speed: string }>>([]);

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

        // Deterministically generate sparks along the drawn line to avoid jitter on scroll
        const tempSparks = [];
        const count = 20; // 20 sparks distributed along the drawn line
        const drawnLength = pathLength * scrollProgress;
        
        for (let i = 0; i < count; i++) {
          const lengthAtPoint = (i / (count - 1)) * drawnLength;
          if (lengthAtPoint > 0) {
            const pathPt = pathRef.current.getPointAtLength(lengthAtPoint);
            const seed = (i * 7919) % 360;
            const angle = (seed * Math.PI) / 180;
            const distance = 6 + (seed % 12); // 6px to 18px offset from line
            
            tempSparks.push({
              x: pathPt.x + Math.cos(angle) * distance,
              y: pathPt.y + Math.sin(angle) * distance,
              r: 0.8 + (seed % 3) * 0.5,
              delay: `${(seed % 5) * 0.4}s`,
              speed: `${1.2 + (seed % 3) * 0.4}s`,
            });
          }
        }
        setLineSparks(tempSparks);
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

        {/* Small lightning/spark dots orbiting around the lead node */}
        {[
          { r: 2, dx: -10, dy: -8, delay: "0s", speed: "1.2s" },
          { r: 1.5, dx: 12, dy: 10, delay: "0.2s", speed: "1.5s" },
          { r: 2.5, dx: -7, dy: 12, delay: "0.4s", speed: "1s" },
          { r: 1.2, dx: 14, dy: -6, delay: "0.15s", speed: "1.8s" },
          { r: 2, dx: -5, dy: -12, delay: "0.3s", speed: "1.4s" },
          { r: 1.8, dx: 8, dy: -10, delay: "0.5s", speed: "1.6s" }
        ].map((spark, idx) => (
          <circle
            key={`lead-spark-${idx}`}
            cx={point.x + spark.dx}
            cy={point.y + spark.dy}
            r={spark.r}
            fill="#ffffff"
            className="animate-pulse"
            style={{
              animationDelay: spark.delay,
              animationDuration: spark.speed,
              filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.9)) drop-shadow(0px 0px 8px rgba(139, 92, 246, 0.6))",
            }}
          />
        ))}

        {/* Shimmering spark dots along the drawn line */}
        {lineSparks.map((spark, idx) => (
          <circle
            key={`line-spark-${idx}`}
            cx={spark.x}
            cy={spark.y}
            r={spark.r}
            fill="#ffffff"
            className="animate-pulse"
            style={{
              animationDelay: spark.delay,
              animationDuration: spark.speed,
              filter: "drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.8)) drop-shadow(0px 0px 6px rgba(139, 92, 246, 0.4))",
            }}
          />
        ))}

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
