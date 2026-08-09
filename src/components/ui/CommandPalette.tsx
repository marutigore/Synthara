'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  Database,
  History,
  Settings,
  HelpCircle,
  Zap,
  Bot,
  Activity,
  FileText,
  BarChart,
  ShieldAlert,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Settings';
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands: CommandItem[] = [
    {
      id: 'nav-dashboard',
      title: 'Go to Intelligence Overview',
      category: 'Navigation',
      icon: Activity,
      action: () => router.push('/dashboard'),
      shortcut: 'G D',
    },
    {
      id: 'nav-generate',
      title: 'Generate Synthetic Dataset',
      category: 'Actions',
      icon: Sparkles,
      action: () => router.push('/dashboard/generate'),
      shortcut: 'G S',
    },
    {
      id: 'nav-preview',
      title: 'Preview Data & CSV Tables',
      category: 'Navigation',
      icon: Database,
      action: () => router.push('/dashboard/preview'),
    },
    {
      id: 'nav-history',
      title: 'View Job Execution History',
      category: 'Navigation',
      icon: History,
      action: () => router.push('/dashboard/history'),
    },
    {
      id: 'nav-datavis',
      title: 'Data Visualization & Nivo Charts',
      category: 'Navigation',
      icon: BarChart,
      action: () => router.push('/dashboard/datavisualization'),
    },
    {
      id: 'nav-train',
      title: 'In-Browser Model Training',
      category: 'Navigation',
      icon: Bot,
      action: () => router.push('/dashboard/train'),
    },
    {
      id: 'nav-market',
      title: 'Browse Dataset Marketplace',
      category: 'Navigation',
      icon: Zap,
      action: () => router.push('/dashboard/market'),
    },
    {
      id: 'nav-settings',
      title: 'Open System Settings & Vault',
      category: 'Settings',
      icon: Settings,
      action: () => router.push('/dashboard/settings'),
    },
    {
      id: 'action-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`,
      category: 'Settings',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      shortcut: 'T T',
    },
    {
      id: 'nav-help',
      title: 'Help Center & Documentation',
      category: 'Navigation',
      icon: HelpCircle,
      action: () => router.push('/help'),
    },
  ];

  const filtered = commands.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: CommandItem) => {
    item.action();
    setOpen(false);
    setQuery('');
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-in fade-in-0 duration-200">
      <div className="w-full max-w-xl rounded-2xl bg-card border border-border/60 shadow-2xl overflow-hidden flex flex-col">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-border/40 gap-3">
          <Search className="size-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Type a command or search... (Press ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none text-base font-medium"
          />
          <kbd className="px-2 py-0.5 rounded-lg bg-muted text-muted-foreground text-xs font-mono border border-border/50">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, index) => {
              const IconComponent = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-foreground font-bold shadow-md'
                      : 'text-foreground hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="size-4 opacity-80" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {item.category}
                    </span>
                    {item.shortcut && (
                      <kbd
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-muted/40 border-t border-border/30 flex justify-between items-center text-xs text-muted-foreground">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span className="font-mono text-[10px]">Synthara Command v2.0</span>
        </div>
      </div>
    </div>
  );
}
