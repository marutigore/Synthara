'use client';

import React, { useState } from 'react';
import { HeartPulse, ShieldCheck, Activity, FileCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EhrRecord {
  patientId: string;
  age: number;
  gender: string;
  icd10Code: string;
  diagnosis: string;
  bloodPressure: string;
  prescriptions: string;
  hipaaCompliant: boolean;
}

export function HipaaEhrSynthesizer() {
  const [records, setRecords] = useState<EhrRecord[]>([
    { patientId: 'SYN-EHR-9081', age: 45, gender: 'Female', icd10Code: 'E11.9', diagnosis: 'Type 2 diabetes mellitus', bloodPressure: '128/82 mmHg', prescriptions: 'Metformin 500mg', hipaaCompliant: true },
    { patientId: 'SYN-EHR-9082', age: 62, gender: 'Male', icd10Code: 'I10', diagnosis: 'Essential (primary) hypertension', bloodPressure: '138/88 mmHg', prescriptions: 'Lisinopril 10mg', hipaaCompliant: true },
    { patientId: 'SYN-EHR-9083', age: 34, gender: 'Female', icd10Code: 'J45.909', diagnosis: 'Unspecified asthma, uncomplicated', bloodPressure: '118/76 mmHg', prescriptions: 'Albuterol HFA', hipaaCompliant: true },
  ]);

  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const synthesizeEhr = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setRecords((prev) => [
        ...prev,
        {
          patientId: `SYN-EHR-${Math.floor(Math.random() * 1000 + 9000)}`,
          age: Math.floor(Math.random() * 40 + 20),
          gender: Math.random() > 0.5 ? 'Male' : 'Female',
          icd10Code: 'E78.5',
          diagnosis: 'Hyperlipidemia, unspecified',
          bloodPressure: '124/80 mmHg',
          prescriptions: 'Atorvastatin 20mg',
          hipaaCompliant: true,
        },
      ]);
      setIsSynthesizing(false);
    }, 650);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-rose-500/5 border-rose-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <HeartPulse className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              HIPAA Safe Harbor Patient EHR Synthesizer
            </h4>
            <p className="text-xs text-muted-foreground">
              Generates de-identified Electronic Health Records with ICD-10 diagnosis codes & lab metrics.
            </p>
          </div>
        </div>

        <Button
          onClick={synthesizeEhr}
          disabled={isSynthesizing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isSynthesizing ? 'animate-spin' : ''}`} />
          {isSynthesizing ? 'Synthesizing...' : 'Synthesize Patient EHR'}
        </Button>
      </div>

      {/* EHR Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Patient Token</th>
              <th className="p-3">Demographics</th>
              <th className="p-3">ICD-10 Code & Diagnosis</th>
              <th className="p-3">Vital Metrics</th>
              <th className="p-3">Prescription</th>
              <th className="p-3">HIPAA Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {records.map((r) => (
              <tr key={r.patientId} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 font-bold text-primary">{r.patientId}</td>
                <td className="p-3 text-foreground font-semibold">{r.age} yrs • {r.gender}</td>
                <td className="p-3">
                  <span className="font-mono font-bold text-rose-500">{r.icd10Code}</span>
                  <div className="text-[10px] text-muted-foreground font-sans">{r.diagnosis}</div>
                </td>
                <td className="p-3 text-muted-foreground">{r.bloodPressure}</td>
                <td className="p-3 text-muted-foreground">{r.prescriptions}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center gap-1 w-fit">
                    <ShieldCheck className="size-3" /> De-Identified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between text-xs text-rose-500 font-semibold">
        <span className="flex items-center gap-2">
          <FileCheck className="size-4" /> HIPAA 18 Safe Harbor Identifiers Stripped • Zero Direct Identifiers
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">De-Identification: 100%</span>
      </div>
    </div>
  );
}
