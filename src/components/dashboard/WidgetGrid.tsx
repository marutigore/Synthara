'use client';

import React, { useState } from 'react';
import { ArrowUp, ArrowDown, LayoutGrid, Eye, EyeOff, RotateCcw, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Widget {
  id: string;
  title: string;
  visible: boolean;
}

interface WidgetGridProps {
  children: React.ReactNode[];
  titles: string[];
}

export function WidgetGrid({ children, titles }: WidgetGridProps) {
  const defaultWidgets: Widget[] = titles.map((title, idx) => ({
    id: `widget-${idx}`,
    title,
    visible: true,
  }));

  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [isEditing, setIsEditing] = useState(false);

  const moveWidget = (index: number, direction: 'up' | 'down') => {
    const newWidgets = [...widgets];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newWidgets.length) return;
    const temp = newWidgets[index];
    newWidgets[index] = newWidgets[targetIndex];
    newWidgets[targetIndex] = temp;
    setWidgets(newWidgets);
  };

  const toggleVisibility = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w))
    );
  };

  const resetLayout = () => {
    setWidgets(defaultWidgets);
  };

  return (
    <div className="space-y-4">
      {/* Customizer Control Bar */}
      <div className="flex items-center justify-between px-2 py-1 bg-muted/20 rounded-xl border border-border/30">
        <div className="flex items-center gap-2">
          <LayoutGrid className="size-4 text-primary" />
          <span className="text-xs font-bold text-foreground uppercase tracking-wider">
            Customizable Layout Grid
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetLayout}
              className="h-7 px-2 text-[10px] font-bold text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3 mr-1" /> Reset
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="h-7 px-2.5 text-xs font-bold rounded-lg border-border/50"
          >
            {isEditing ? 'Done Customizing' : 'Customize Layout'}
          </Button>
        </div>
      </div>

      {/* Editing Toolbar */}
      {isEditing && (
        <div className="p-3 bg-card border border-primary/20 rounded-2xl shadow-sm space-y-2 animate-in fade-in-0 duration-300">
          <p className="text-[11px] font-semibold text-muted-foreground">Reorder or hide dashboard widgets:</p>
          <div className="flex flex-wrap gap-2">
            {widgets.map((widget, idx) => (
              <div
                key={widget.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted border border-border/40 text-xs font-bold text-foreground"
              >
                <GripVertical className="size-3.5 text-muted-foreground" />
                <span>{widget.title}</span>
                <div className="flex items-center gap-1 ml-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveWidget(idx, 'up')}
                    className="p-0.5 hover:text-primary disabled:opacity-30"
                  >
                    <ArrowUp className="size-3" />
                  </button>
                  <button
                    disabled={idx === widgets.length - 1}
                    onClick={() => moveWidget(idx, 'down')}
                    className="p-0.5 hover:text-primary disabled:opacity-30"
                  >
                    <ArrowDown className="size-3" />
                  </button>
                  <button
                    onClick={() => toggleVisibility(widget.id)}
                    className="p-0.5 hover:text-primary ml-1"
                  >
                    {widget.visible ? <Eye className="size-3 text-emerald-500" /> : <EyeOff className="size-3 text-muted-foreground" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rendered Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {widgets.map((w) => {
          if (!w.visible) return null;
          const originalIdx = parseInt(w.id.replace('widget-', ''), 10);
          return (
            <div key={w.id} className="transition-all duration-300">
              {children[originalIdx]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
