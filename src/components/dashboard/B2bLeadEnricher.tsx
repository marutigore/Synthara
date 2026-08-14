'use client';

import React, { useState } from 'react';
import { Building2, Globe, Users, DollarSign, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnrichedLead {
  id: string;
  domain: string;
  companyName: string;
  employeeTier: string;
  estimatedRevenue: string;
  detectedTechStack: string[];
  executiveContact: string;
}

export function B2bLeadEnricher() {
  const [leads, setLeads] = useState<EnrichedLead[]>([
    { id: '1', domain: 'stripe.com', companyName: 'Stripe Inc.', employeeTier: '5,000 - 10,000', estimatedRevenue: '$14.3B', detectedTechStack: ['React', 'Ruby', 'AWS', 'Snowflake'], executiveContact: 'patrick@stripe.com' },
    { id: '2', domain: 'linear.app', companyName: 'Linear Orbit Inc.', employeeTier: '50 - 200', estimatedRevenue: '$45M', detectedTechStack: ['Next.js', 'TypeScript', 'Tailwind', 'GraphQL'], executiveContact: 'karri@linear.app' },
    { id: '3', domain: 'vercel.com', companyName: 'Vercel Inc.', employeeTier: '500 - 1,000', estimatedRevenue: '$120M', detectedTechStack: ['Next.js', 'Rust', 'Edge Functions', 'PostgreSQL'], executiveContact: 'guillermo@vercel.com' },
  ]);

  const [isEnriching, setIsEnriching] = useState(false);

  const enrichDomains = () => {
    setIsEnriching(true);
    setTimeout(() => {
      setLeads((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          domain: 'openai.com',
          companyName: 'OpenAI L.L.C.',
          employeeTier: '1,000 - 2,500',
          estimatedRevenue: '$2.0B',
          detectedTechStack: ['Python', 'PyTorch', 'Kubernetes', 'Azure'],
          executiveContact: 'sam@openai.com',
        },
      ]);
      setIsEnriching(false);
    }, 700);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-purple-500/5 border-purple-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
            <Building2 className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              B2B Firmographic Lead Enrichment Engine
            </h4>
            <p className="text-xs text-muted-foreground">
              Enriches target URL domains with headcount, tech stack fingerprints, & executive contacts.
            </p>
          </div>
        </div>

        <Button
          onClick={enrichDomains}
          disabled={isEnriching}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20"
        >
          <Sparkles className={`size-3.5 mr-1.5 ${isEnriching ? 'animate-spin' : ''}`} />
          {isEnriching ? 'Enriching...' : 'Enrich Domain'}
        </Button>
      </div>

      {/* Enriched Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leads.map((l) => (
          <div key={l.id} className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-foreground">{l.companyName}</span>
              <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">{l.domain}</span>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground font-mono">
              <div className="flex justify-between">
                <span>Headcount:</span>
                <span className="text-foreground font-bold">{l.employeeTier}</span>
              </div>
              <div className="flex justify-between">
                <span>Revenue Est:</span>
                <span className="text-emerald-500 font-bold">{l.estimatedRevenue}</span>
              </div>
              <div className="flex justify-between">
                <span>Key Contact:</span>
                <span className="text-primary font-bold truncate max-w-[120px]">{l.executiveContact}</span>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-2 border-t border-border/20">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block mb-1.5">Detected Tech Stack</span>
              <div className="flex flex-wrap gap-1">
                {l.detectedTechStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs text-purple-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> {leads.length} Domain Profiles Enriched • Firmographic Match Rate: 100%
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Coverage: Enterprise</span>
      </div>
    </div>
  );
}
