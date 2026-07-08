"use client";

import { useEffect, useRef } from "react";

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Array<{ x: number; y: number; age: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationFrameId: number;

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;

      // Update ages and filter
      for (let i = 0; i < points.length; i++) {
        points[i].age += 1;
      }
      pointsRef.current = points.filter((p) => p.age < 20);

      const activePoints = pointsRef.current;

      if (activePoints.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < activePoints.length; i++) {
          const p1 = activePoints[i - 1];
          const p2 = activePoints[i];
          const opacity = 1 - (p2.age / 20);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Outer purple glow
          ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.45})`;
          ctx.lineWidth = 8;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(147, 51, 234, 0.8)";
          ctx.stroke();

          // Inner white core
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
          ctx.lineWidth = 2.5;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99] w-full h-full"
    />
  );
}
