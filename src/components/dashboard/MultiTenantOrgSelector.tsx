"use client";

import React, { useState } from "react";
import { Building2, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MultiTenantOrgSelector() {
  const [org, setOrg] = useState("Enterprise Core Team");

  return (
    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-secondary/20 border border-border/30 text-xs font-medium cursor-pointer hover:bg-secondary/40 transition-all">
      <Building2 className="h-4 w-4 text-primary" />
      <span>{org}</span>
      <Badge variant="outline" className="text-[9px] uppercase tracking-wider border-primary/30 text-primary">Pro</Badge>
    </div>
  );
}
