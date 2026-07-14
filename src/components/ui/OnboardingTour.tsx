"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Sparkles, Database, Brain, History } from "lucide-react";
import { Button } from "@/components/ui/button";

const TOUR_STEPS = [
  {
    title: "Welcome to Synthara AI! 🚀",
    description:
      "Let us show you around. Synthara helps you scrape, clean, and generate high-quality datasets using AI.",
    icon: Sparkles,
  },
  {
    title: "Generate Datasets",
    description:
      "Enter a natural language query, select your AI model, and Synthara will scrape and structure data into clean CSV datasets.",
    icon: Database,
  },
  {
    title: "Train ML Models",
    description:
      "Use your generated datasets to train classification and regression models directly in your browser with TensorFlow.js.",
    icon: Brain,
  },
  {
    title: "Track Your History",
    description:
      "All your generated datasets are saved automatically. Access, compare, and export them anytime from the History page.",
    icon: History,
  },
];

export function OnboardingTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasCompletedTour = localStorage.getItem("synthara-tour-completed");
    if (!hasCompletedTour) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("synthara-tour-completed", "true");
  };

  if (!isVisible) return null;

  const step = TOUR_STEPS[currentStep];
  const StepIcon = step.icon;
  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Tour Card */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-2xl shadow-primary/10 p-8 animate-in zoom-in-95 fade-in duration-300">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>

          {/* Step indicator */}
          <div className="flex gap-1.5 mb-6">
            {TOUR_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? "w-8 bg-primary"
                    : idx < currentStep
                    ? "w-4 bg-primary/40"
                    : "w-4 bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-5">
            <StepIcon className="size-7 text-primary" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            {step.description}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleClose}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip tour
            </button>
            <Button onClick={handleNext} size="sm" className="gap-2">
              {isLastStep ? "Get Started" : "Next"}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
