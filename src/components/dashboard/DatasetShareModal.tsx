"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DatasetShareModalProps {
  datasetId: string;
}

export function DatasetShareModal({ datasetId }: DatasetShareModalProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/dashboard/history?id=${datasetId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: "Share Link Copied! 🔗", description: "Public URL copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={copyLink} variant="outline" size="sm" className="h-8 text-xs gap-1.5 font-semibold">
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
      {copied ? "Copied Link" : "Share Dataset"}
    </Button>
  );
}
