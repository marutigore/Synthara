'use client';

import React, { useState } from 'react';
import { Mic, Volume2, UserCheck, Play, RefreshCw, CheckCircle2, FileAudio, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TranscriptSegment {
  id: string;
  speaker: 'Speaker 01 (Agent)' | 'Speaker 02 (Customer)';
  startTime: string;
  endTime: string;
  transcript: string;
  confidenceScore: number;
}

export function SpeechTranscriptSynthesizer() {
  const [segments, setSegments] = useState<TranscriptSegment[]>([
    { id: '1', speaker: 'Speaker 01 (Agent)', startTime: '00:00:01.200', endTime: '00:00:04.500', transcript: 'Thank you for calling Synthara enterprise support. How can I assist with your data pipeline today?', confidenceScore: 0.98 },
    { id: '2', speaker: 'Speaker 02 (Customer)', startTime: '00:00:05.100', endTime: '00:00:09.800', transcript: 'Hi! We are experiencing schema drift on our e-commerce pricing table after the latest crawl.', confidenceScore: 0.96 },
    { id: '3', speaker: 'Speaker 01 (Agent)', startTime: '00:00:10.200', endTime: '00:00:14.000', transcript: 'I see that. Let me run an automated ALTER TABLE schema migration to align the types.', confidenceScore: 0.99 },
  ]);

  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const synthesizeNewSegment = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setSegments((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          speaker: 'Speaker 02 (Customer)',
          startTime: '00:00:14.500',
          endTime: '00:00:18.200',
          transcript: 'Awesome, the migration succeeded and the 100,000 synthetic rows are passing validation!',
          confidenceScore: 0.97,
        },
      ]);
      setIsSynthesizing(false);
    }, 650);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-emerald-500/5 border-emerald-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <Mic className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Audio Speech-to-Text & Diarized Transcript Synthesizer
            </h4>
            <p className="text-xs text-muted-foreground">
              Synthesizes multi-speaker conversational transcripts with Whisper-format millisecond timestamps and diarization.
            </p>
          </div>
        </div>

        <Button
          onClick={synthesizeNewSegment}
          disabled={isSynthesizing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
        >
          <Sparkles className={`size-3.5 mr-1.5 ${isSynthesizing ? 'animate-spin' : ''}`} />
          {isSynthesizing ? 'Synthesizing Audio...' : 'Synthesize Next Turn'}
        </Button>
      </div>

      {/* Transcript Turn-by-Turn Bubble View */}
      <div className="space-y-3 font-sans">
        {segments.map((s) => (
          <div
            key={s.id}
            className={`p-4 rounded-2xl border transition-all ${
              s.speaker.includes('Agent')
                ? 'bg-muted/40 border-border/40'
                : 'bg-emerald-500/5 border-emerald-500/20'
            }`}
          >
            <div className="flex justify-between items-center text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">{s.speaker}</span>
                <span className="text-[10px] font-mono text-muted-foreground bg-background/50 px-1.5 py-0.5 rounded border border-border/30">
                  {s.startTime} → {s.endTime}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-500 font-bold">
                {(s.confidenceScore * 100).toFixed(0)}% Confidence
              </span>
            </div>
            <p className="text-xs text-foreground font-medium leading-relaxed">
              "{s.transcript}"
            </p>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-500 font-semibold">
        <span className="flex items-center gap-2">
          <FileAudio className="size-4" /> OpenAI Whisper & SRT Export Format Ready • 2 Diarized Speakers
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Sampling Rate: 16 kHz Mono</span>
      </div>
    </div>
  );
}
