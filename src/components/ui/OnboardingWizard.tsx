'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Key,
  Database,
  Brain,
  Download,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const steps = [
  {
    step: 1,
    title: 'Welcome to Synthara AI',
    subtitle: 'Autonomous Web Scraping & Synthetic Data Engine',
    description:
      'Transform natural language prompts or target URLs into structured, GDPR-ready CSV datasets using containerized Crawl4AI Docker nodes and AI schema models.',
    icon: Sparkles,
    badge: 'Overview',
    actionText: 'Get Started',
  },
  {
    step: 2,
    title: 'Configure Your API Key Vault',
    subtitle: 'Secure Browser-Side Web Crypto Storage',
    description:
      'Store your OpenRouter, DeepSeek, or Gemini API keys safely with zero-knowledge browser encryption in your personal security vault.',
    icon: Key,
    badge: 'Security',
    actionText: 'Configure Keys',
  },
  {
    step: 3,
    title: 'Create Your First Synthesis Job',
    subtitle: 'Scrape, Clean & Anonymize Data',
    description:
      'Use the Generator Forge to specify fields, set sampling temperature, enable Laplace noise differential privacy, and automatically clean PII.',
    icon: Database,
    badge: 'Synthesis',
    actionText: 'Open Generator',
  },
  {
    step: 4,
    title: 'Train ML Models & Export Data',
    subtitle: 'Multi-Format Export & In-Browser Training',
    description:
      'Offload model training directly to Web Workers via TensorFlow.js or export your datasets in CSV, SQL DDL, JSONL, and encrypted ZIP archives.',
    icon: Brain,
    badge: 'Deployment',
    actionText: 'Finish Onboarding',
  },
];

export function OnboardingWizard() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const hasSeenWizard = localStorage.getItem('synthara_wizard_completed');
    if (!hasSeenWizard) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('synthara_wizard_completed', 'true');
    setOpen(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleClose();
      router.push('/dashboard/generate');
    }
  };

  if (!open) return null;

  const current = steps[currentStep];
  const IconComponent = current.icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
      <div className="w-full max-w-xl bg-card border border-border/60 shadow-2xl rounded-3xl overflow-hidden relative flex flex-col">
        {/* Top Progress Indicator */}
        <div className="h-1.5 w-full bg-muted flex">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-full flex-1 transition-all duration-500 ${
                idx <= currentStep ? 'bg-primary' : 'bg-transparent'
              }`}
            />
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-muted transition-colors z-10"
        >
          <X className="size-5" />
        </button>

        {/* Modal Body */}
        <div className="p-8 space-y-6 text-left">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <IconComponent className="size-7 animate-bounce" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
              Step {current.step} of {steps.length} — {current.badge}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-black tracking-tight text-foreground">
              {current.title}
            </h2>
            <p className="text-sm font-bold text-primary">{current.subtitle}</p>
            <p className="text-xs text-muted-foreground leading-relaxed pt-2">
              {current.description}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-muted/40 border border-border/30 flex items-center gap-3">
            <CheckCircle2 className="size-5 text-emerald-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-foreground">
              Instant setup ready. Docker Crawler status: <span className="text-emerald-500 font-bold">100% Operational</span>
            </span>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 bg-muted/20 border-t border-border/30 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="text-xs font-bold text-muted-foreground hover:text-foreground"
          >
            Skip Guided Tour
          </Button>

          <Button
            onClick={handleNext}
            className="h-11 px-6 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:scale-105 transition-all text-xs"
          >
            {current.actionText} <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
