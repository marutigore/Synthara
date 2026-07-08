"use client";

import { useEffect, useState } from "react";

interface TextScrambleProps {
  value: string;
  duration?: number;
}

export function TextScramble({ value, duration = 1000 }: TextScrambleProps) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    let active = true;
    const chars = "0123456789%$,.ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = [];
    
    let frame = 0;
    const totalFrames = Math.round((duration / 1000) * 60);

    for (let i = 0; i < value.length; i++) {
      const from = "";
      const to = value[i];
      const start = Math.floor(Math.random() * (totalFrames / 2));
      const end = start + Math.floor(Math.random() * (totalFrames / 2)) + (totalFrames / 3);
      queue.push({ from, to, start, end });
    }

    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (frame >= item.end) {
          complete++;
          output += item.to;
        } else if (frame >= item.start) {
          if (!item.char || Math.random() < 0.28) {
            item.char = chars[Math.floor(Math.random() * chars.length)];
          }
          output += item.char;
        } else {
          output += item.from;
        }
      }
      
      if (active) {
        setDisplayValue(output);
      }

      if (complete === queue.length) {
        return;
      }

      frame++;
      requestAnimationFrame(update);
    };

    update();

    return () => {
      active = false;
    };
  }, [value, duration]);

  return <span>{displayValue || value}</span>;
}
