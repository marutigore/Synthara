"use client";

import React, { useRef, useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface VirtualizedTableProps {
  columns: Array<{ name: string; type: string }>;
  data: Array<Record<string, any>>;
  rowHeight?: number;
  viewportHeight?: number;
}

export function VirtualizedTable({
  columns,
  data,
  rowHeight = 52,
  viewportHeight = 400
}: VirtualizedTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollTop(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const totalHeight = data.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
  const endIndex = Math.min(data.length - 1, Math.floor((scrollTop + viewportHeight) / rowHeight) + 2);

  const visibleRows = data.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * rowHeight;

  return (
    <div className="rounded-xl border border-border/50 overflow-hidden bg-card/50">
      <div 
        ref={containerRef} 
        className="overflow-y-auto overflow-x-auto relative scrollbar-thin"
        style={{ height: `${viewportHeight}px` }}
      >
        <Table className="w-full border-collapse">
          <TableHeader className="sticky top-0 bg-background/95 backdrop-blur-md z-20 border-b border-border/60">
            <TableRow>
              {columns.map((col) => (
                <TableHead 
                  key={col.name} 
                  className="px-6 py-3.5 text-xs font-black uppercase tracking-wider text-muted-foreground whitespace-nowrap"
                >
                  {col.name} <span className="text-[9px] font-medium text-primary/60 font-mono">({col.type})</span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody style={{ height: `${totalHeight}px`, position: "relative" }}>
            {data.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  className="text-center py-20 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/30 italic"
                >
                  No Rows Found
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((row, idx) => {
                const globalIndex = startIndex + idx;
                return (
                  <TableRow 
                    key={globalIndex} 
                    className="absolute w-full flex items-center hover:bg-secondary/15 transition-colors border-b border-border/20"
                    style={{ 
                      height: `${rowHeight}px`, 
                      top: `${offsetY + (idx * rowHeight)}px`,
                      left: 0,
                      display: "table-row" 
                    }}
                  >
                    {columns.map((col) => {
                      const val = row[col.name];
                      const valStr = val === null || val === undefined || String(val).trim() === "" 
                        ? "null" 
                        : String(val);
                      const isNull = valStr === "null";

                      return (
                        <TableCell 
                          key={col.name} 
                          className="px-6 py-3 text-sm truncate font-medium max-w-[280px]"
                          title={valStr}
                        >
                          {isNull ? (
                            <span className="text-muted-foreground/40 italic text-xs">null</span>
                          ) : (
                            valStr
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
