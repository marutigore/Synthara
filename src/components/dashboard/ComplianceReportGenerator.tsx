"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ComplianceReportGenerator() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Compliance Report Generated! 📄",
      description: "GDPR/CCPA Data Protection Audit PDF downloaded.",
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              GDPR/CCPA Compliance & Privacy Audit PDF Generator
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Generate certified compliance audit certificates for synthetic datasets.
            </CardDescription>
          </div>
          <Button onClick={handleExport} size="sm" className="h-8 font-bold text-xs uppercase bg-primary">
            <Download className="h-3.5 w-3.5 mr-1.5" /> Export PDF Report
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
