"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SchemaCodeExporterProps {
  schema: Array<{ name: string; type: string }>;
  tableName?: string;
}

export function SchemaCodeExporter({ schema, tableName = "synthara_dataset" }: SchemaCodeExporterProps) {
  const { toast } = useToast();
  const [lang, setLang] = useState<"python" | "typescript" | "sql">("python");
  const [copied, setCopied] = useState(false);

  if (!schema || schema.length === 0) return null;

  let codeSnippet = "";

  if (lang === "python") {
    const colDict = schema.map((c) => `    "${c.name}": "${c.type === 'number' ? 'float64' : 'object'}"`).join(",\n");
    codeSnippet = `# Python Pandas Schema Definition\nimport pandas as pd\n\nschema_dtypes = {\n${colDict}\n}\n\ndf = pd.DataFrame(columns=schema_dtypes.keys()).astype(schema_dtypes)`;
  } else if (lang === "typescript") {
    const fields = schema.map((c) => `  ${c.name}: ${c.type === 'number' ? 'number' : c.type === 'boolean' ? 'boolean' : 'string'};`).join("\n");
    codeSnippet = `// TypeScript Interface Definition\nexport interface DatasetRecord {\n${fields}\n}`;
  } else {
    const sqlCols = schema.map((c) => `  "${c.name}" ${c.type === 'number' ? 'NUMERIC' : c.type === 'boolean' ? 'BOOLEAN' : 'VARCHAR(255)'}`).join(",\n");
    codeSnippet = `-- SQL DDL Create Table Statement\nCREATE TABLE "${tableName}" (\n  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n${sqlCols},\n  "created_at" TIMESTAMP DEFAULT NOW()\n);`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    toast({ title: "Code Copied! 📋", description: `Copied ${lang.toUpperCase()} schema definition.` });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="modern-card border-none shadow-sm bg-card/60">
      <CardHeader className="pb-3 border-b border-border/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Schema Code Generator Snippets
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Generate Python Pandas, TypeScript, or SQL DDL type definitions from dataset schema.
            </CardDescription>
          </div>
          <Button onClick={handleCopy} size="sm" className="gap-1.5 h-8 text-xs font-bold uppercase tracking-wider bg-primary">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy Code"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex gap-2">
          <Button variant={lang === "python" ? "default" : "outline"} size="sm" onClick={() => setLang("python")} className="h-7 text-xs font-mono">
            Python
          </Button>
          <Button variant={lang === "typescript" ? "default" : "outline"} size="sm" onClick={() => setLang("typescript")} className="h-7 text-xs font-mono">
            TypeScript
          </Button>
          <Button variant={lang === "sql" ? "default" : "outline"} size="sm" onClick={() => setLang("sql")} className="h-7 text-xs font-mono">
            SQL DDL
          </Button>
        </div>

        <pre className="p-4 rounded-xl bg-secondary/30 border border-border/40 text-xs font-mono overflow-x-auto text-foreground">
          <code>{codeSnippet}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
