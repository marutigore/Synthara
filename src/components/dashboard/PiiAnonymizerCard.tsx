"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";
import { sanitizeDatasetPii } from "@/lib/utils/pii-masker";
import { useToast } from "@/hooks/use-toast";

interface PiiAnonymizerCardProps {
  data: Array<Record<string, any>>;
  onAnonymizedData: (anonymized: Array<Record<string, any>>) => void;
}

export function PiiAnonymizerCard({ data, onAnonymizedData }: PiiAnonymizerCardProps) {
  const { toast } = useToast();
  const [maskEmail, setMaskEmail] = useState(true);
  const [maskPhone, setMaskPhone] = useState(true);
  const [maskIp, setMaskIp] = useState(true);
  const [maskedCount, setMaskedCount] = useState<number | null>(null);

  const handleApplyMasking = () => {
    if (!data || data.length === 0) return;

    const { sanitizedRows, count } = sanitizeDatasetPii(data, {
      maskEmail,
      maskPhone,
      maskIp,
    });

    setMaskedCount(count);
    onAnonymizedData(sanitizedRows);

    toast({
      title: "PII Anonymization applied! 🛡️",
      description: `Masked ${count} sensitive fields matching GDPR privacy policies.`,
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              AI PII Masking & Data Anonymization Engine
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Redact personally identifiable information (emails, phone numbers, IP addresses) for GDPR/CCPA compliance.
            </CardDescription>
          </div>
          <Button onClick={handleApplyMasking} size="sm" className="gap-1.5 h-8 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700">
            <Lock className="h-4 w-4" /> Apply Privacy Masking
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-secondary/15 border border-border/30 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Mask Email Addresses</span>
            <input
              type="checkbox"
              checked={maskEmail}
              onChange={(e) => setMaskEmail(e.target.checked)}
              className="h-4 w-4 rounded border-border text-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-secondary/15 border border-border/30 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Mask Phone Numbers</span>
            <input
              type="checkbox"
              checked={maskPhone}
              onChange={(e) => setMaskPhone(e.target.checked)}
              className="h-4 w-4 rounded border-border text-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-secondary/15 border border-border/30 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Mask IP Addresses</span>
            <input
              type="checkbox"
              checked={maskIp}
              onChange={(e) => setMaskIp(e.target.checked)}
              className="h-4 w-4 rounded border-border text-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>

        {maskedCount !== null && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <EyeOff className="h-4 w-4" /> Anonymization Active
            </span>
            <span className="font-bold">{maskedCount} values obfuscated</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
