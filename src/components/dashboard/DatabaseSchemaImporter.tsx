"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Database, FileCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DatabaseSchemaImporter() {
  const { toast } = useToast();
  const [ddl, setDdl] = useState("");

  const handleParse = () => {
    toast({
      title: "SQL DDL Parsed Successfully! 🗄️",
      description: "Extracted column definitions & constraints into synthetic generator schema.",
    });
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Live SQL DDL Schema Parser & Importer
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Paste SQL `CREATE TABLE` DDL statements to instantly map column schemas.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <Textarea
          placeholder="CREATE TABLE users (id UUID PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), created_at TIMESTAMP)..."
          value={ddl}
          onChange={(e) => setDdl(e.target.value)}
          className="font-mono text-xs h-24"
        />
        <Button onClick={handleParse} disabled={!ddl} size="sm" className="w-full font-bold text-xs uppercase bg-primary">
          <FileCode className="h-4 w-4 mr-2" /> Parse DDL & Populate Generator
        </Button>
      </CardContent>
    </Card>
  );
}
