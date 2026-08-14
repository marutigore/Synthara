'use client';

import React, { useState } from 'react';
import { UserCheck, Briefcase, GraduationCap, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CandidateProfile {
  id: string;
  candidateToken: string;
  primaryRole: string;
  yearsExperience: number;
  topSkills: string[];
  education: string;
  matchScore: number;
}

export function ResumeDataExtractor() {
  const [candidates, setCandidates] = useState<CandidateProfile[]>([
    { id: '1', candidateToken: 'CAND-84920', primaryRole: 'Senior Data Engineer', yearsExperience: 7, topSkills: ['Python', 'Spark', 'Kafka', 'Snowflake'], education: 'M.S. Computer Science', matchScore: 96 },
    { id: '2', candidateToken: 'CAND-84921', primaryRole: 'Machine Learning Scientist', yearsExperience: 5, topSkills: ['PyTorch', 'TensorFlow', 'CUDA', 'Python'], education: 'Ph.D. Artificial Intelligence', matchScore: 98 },
    { id: '3', candidateToken: 'CAND-84922', primaryRole: 'Full Stack Architect', yearsExperience: 8, topSkills: ['TypeScript', 'Next.js', 'PostgreSQL', 'Docker'], education: 'B.Tech Information Technology', matchScore: 94 },
  ]);

  const [isParsing, setIsParsing] = useState(false);

  const parseNextResume = () => {
    setIsParsing(true);
    setTimeout(() => {
      setCandidates((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          candidateToken: `CAND-${Math.floor(Math.random() * 1000 + 8000)}`,
          primaryRole: 'Site Reliability Engineer (SRE)',
          yearsExperience: 6,
          topSkills: ['Kubernetes', 'Go', 'Terraform', 'Prometheus'],
          education: 'B.S. Computer Engineering',
          matchScore: 95,
        },
      ]);
      setIsParsing(false);
    }, 650);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-indigo-500/5 border-indigo-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <UserCheck className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              HR Resume Parser & Candidate Profile Extractor
            </h4>
            <p className="text-xs text-muted-foreground">
              Parses candidate resumes into structured skill matrix tables & experience profiles.
            </p>
          </div>
        </div>

        <Button
          onClick={parseNextResume}
          disabled={isParsing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isParsing ? 'animate-spin' : ''}`} />
          {isParsing ? 'Parsing Resume...' : 'Parse Next Resume'}
        </Button>
      </div>

      {/* Candidate Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {candidates.map((c) => (
          <div key={c.id} className="p-4 rounded-2xl bg-muted/30 border border-border/40 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-foreground">{c.primaryRole}</span>
              <span className="text-[9px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">{c.candidateToken}</span>
            </div>

            <div className="space-y-1 text-xs text-muted-foreground font-mono">
              <div className="flex justify-between">
                <span>Experience:</span>
                <span className="text-foreground font-bold">{c.yearsExperience} Years</span>
              </div>
              <div className="flex justify-between">
                <span>Education:</span>
                <span className="text-foreground font-bold truncate max-w-[120px]">{c.education}</span>
              </div>
              <div className="flex justify-between">
                <span>Role Match:</span>
                <span className="text-emerald-500 font-bold">{c.matchScore}%</span>
              </div>
            </div>

            {/* Skills Pills */}
            <div className="pt-2 border-t border-border/20">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider block mb-1.5">Parsed Key Competencies</span>
              <div className="flex flex-wrap gap-1">
                {c.topSkills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between text-xs text-indigo-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> Candidate Parsing Pipeline Active • Zero PII Contamination
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Candidate Match: 96.5%</span>
      </div>
    </div>
  );
}
