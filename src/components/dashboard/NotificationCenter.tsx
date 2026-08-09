'use client';

import React, { useState } from 'react';
import { Bell, Check, Sparkles, AlertTriangle, CheckCircle2, ShieldCheck, Trash2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'success' | 'warning' | 'info';
  read: boolean;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Dataset Extraction Complete',
      description: 'Scraped 2,450 ecommerce rows from Crawl4AI node sigma.',
      time: '2m ago',
      type: 'success',
      read: false,
    },
    {
      id: '2',
      title: 'Structural Drift Detected',
      description: 'Dataset "E-Commerce Leads 2026" schema has 2 missing keys.',
      time: '15m ago',
      type: 'warning',
      read: false,
    },
    {
      id: '3',
      title: 'PII Anonymization Finished',
      description: 'Masked 412 email addresses and 85 phone numbers.',
      time: '1h ago',
      type: 'info',
      read: true,
    },
    {
      id: '4',
      title: 'API Rate Limit Healthy',
      description: 'Used 2,400 / 10,000 hourly requests (24% utilization).',
      time: '3h ago',
      type: 'info',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted hidden sm:flex h-10 w-10 border border-transparent hover:border-border/50 transition-all"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 sm:w-96 rounded-2xl p-0 shadow-2xl border-border/50 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/30">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            <h4 className="font-headline font-bold text-sm text-foreground">Notifications</h4>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted"
              >
                <Check className="size-3" /> Read all
              </button>
            )}
            <button
              onClick={clearAll}
              className="text-muted-foreground hover:text-destructive p-1 rounded-md hover:bg-muted transition-colors"
              title="Clear all"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-border/20">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              No notifications. You are all caught up!
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 flex items-start gap-3 transition-colors ${
                  !n.read ? 'bg-primary/5' : 'hover:bg-muted/30'
                }`}
              >
                <div className="mt-0.5">
                  {n.type === 'success' && <CheckCircle2 className="size-4 text-emerald-500" />}
                  {n.type === 'warning' && <AlertTriangle className="size-4 text-amber-500" />}
                  {n.type === 'info' && <ShieldCheck className="size-4 text-blue-500" />}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-bold ${!n.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {n.title}
                    </p>
                    <span className="text-[9px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/80 leading-relaxed">{n.description}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 bg-muted/20 border-t border-border/30 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
            Real-Time SSE Alert Feed
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
