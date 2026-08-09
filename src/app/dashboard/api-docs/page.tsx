import React from 'react';
import { ApiPlayground } from '@/components/dashboard/ApiPlayground';
import { Code, Terminal, Zap } from 'lucide-react';

export default function ApiDocsPage() {
  return (
    <div className="space-y-6 py-4 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Code className="size-6 text-primary" />
          Interactive API Explorer & Documentation
        </h1>
        <p className="text-xs text-muted-foreground font-medium">
          Test REST endpoints live in browser, generate cURL commands, and view response schemas.
        </p>
      </div>

      <ApiPlayground />
    </div>
  );
}
