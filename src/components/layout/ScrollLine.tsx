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
  const [lineSparks, setLineSparks] = useState<
    Array<{ x: number; y: number; r: number; delay: string; speed: string; bright: boolean; tendril?: string }>
  >([]);
  const [starNodes, setStarNodes] = useState<
    Array<{ x: number; y: number; delay: string }>
  >([]);

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
        const count = 160; // 160 sparks distributed along the drawn line
        const drawnLength = pathLength * scrollProgress;

        for (let i = 0; i < count; i++) {
          const lengthAtPoint = (i / (count - 1)) * drawnLength;
          if (lengthAtPoint > 0) {
            const pathPt = pathRef.current.getPointAtLength(lengthAtPoint);
            const seed = (i * 7919) % 360;

            // Deterministically alternate left and right sides
            const isLeft = i % 2 === 0;
            const sideSign = isLeft ? -1 : 1;

            // Horizontal offset (dx): 5px to 45px on both sides of the line
            const dx = sideSign * (5 + (seed % 41));
            // Vertical offset (dy): small drift (-8px to +8px) to keep them vertically aligned with path point
            const dy = ((seed * 7) % 17) - 8;

            // ~1 in 5 sparks is a larger "bright orb"; the rest are fine dust
            const bright = seed % 5 === 0;
            const sx = pathPt.x + dx;
            const sy = pathPt.y + dy;

            // ~1 in 3 sparks gets a jagged lightning tendril connecting it back to the line
            let tendril: string | undefined;
            if (seed % 3 === 0) {
              const midX = pathPt.x + dx * (0.45 + ((seed * 3) % 10) * 0.02);
              const midY = pathPt.y + dy * (0.45 + ((seed * 5) % 10) * 0.02) + (((seed * 11) % 9) - 4);
              tendril = `M ${pathPt.x} ${pathPt.y} L ${midX} ${midY} L ${sx} ${sy}`;
            }

            tempSparks.push({
              x: sx,
              y: sy,
              r: bright ? 3 + (seed % 4) * 0.8 : 1.2 + (seed % 4) * 0.5,
              delay: `${(seed % 5) * 0.4}s`,
              speed: `${1.2 + (seed % 3) * 0.4}s`,
              bright,
              tendril,
            });
          }
        }
        setLineSparks(tempSparks);

        // Periodic bright star-flare nodes along the line itself (spaced by arc length)
        const tempStars = [];
        const nodeSpacing = 190; // px of path length between flares
        for (let len = nodeSpacing; len <= drawnLength; len += nodeSpacing) {
          const p = pathRef.current.getPointAtLength(len);
          const seed = Math.floor(len) % 360;
          tempStars.push({ x: p.x, y: p.y, delay: `${(seed % 5) * 0.3}s` });
        }
        setStarNodes(tempStars);
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

        {/* Jagged lightning tendrils connecting sparks back to the line */}
        {lineSparks
          .filter((s) => s.tendril)
          .map((spark, idx) => (
            <path
              key={`tendril-${idx}`}
              d={spark.tendril}
              fill="none"
              stroke="#8fc3ff"
              strokeWidth="0.75"
              className="animate-pulse"
              style={{
                animationDelay: spark.delay,
                animationDuration: spark.speed,
                opacity: 0.55,
                filter: "drop-shadow(0px 0px 2px rgba(139, 195, 255, 0.8))",
              }}
            />
          ))}

        {/* Periodic star-flare nodes along the drawn line */}
        {starNodes.map((node, idx) => (
          <g
            key={`star-${idx}`}
            className="animate-pulse"
            style={{ animationDelay: node.delay, animationDuration: "2.4s" }}
          >
            <path
              d={`M ${node.x} ${node.y - 10} L ${node.x} ${node.y + 10} M ${node.x - 10} ${node.y} L ${node.x + 10} ${node.y}`}
              stroke="#ffffff"
              strokeWidth="0.9"
              style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.9))" }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="2.2"
              fill="#ffffff"
              style={{
                filter: "drop-shadow(0px 0px 6px rgba(255, 255, 255, 1)) drop-shadow(0px 0px 12px rgba(59, 130, 246, 0.7))",
              }}
            />
          </g>
        ))}

        {/* Shimmering spark dots along the drawn line — bright orbs + fine dust */}
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
              filter: spark.bright
                ? "drop-shadow(0px 0px 5px rgba(255, 255, 255, 1)) drop-shadow(0px 0px 12px rgba(59, 130, 246, 0.8))"
                : "drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.85)) drop-shadow(0px 0px 6px rgba(59, 130, 246, 0.6))",
            }}
          />
        ))}

        <defs>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
