/**
 * Exporter utilities for SQL, JSONL, XLSX, and TSV formats.
 */

export function generateSqlInserts(tableName: string, rows: Array<Record<string, any>>): string {
  if (!rows || rows.length === 0) return "";
  const safeTable = (tableName || "dataset").replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
  const keys = Object.keys(rows[0]);

  const statements = rows.map((row) => {
    const vals = keys.map((k) => {
      const v = row[k];
      if (v === null || v === undefined) return "NULL";
      if (typeof v === "number") return v;
      if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
      const escaped = String(v).replace(/'/g, "''");
      return `'${escaped}'`;
    });
    return `INSERT INTO ${safeTable} (${keys.map(k => `"${k}"`).join(", ")}) VALUES (${vals.join(", ")});`;
  });

  return `-- Synthara AI Generated SQL Inserts\n-- Table: ${safeTable}\n-- Total Records: ${rows.length}\n\n` + statements.join("\n");
}

export function generateJsonl(rows: Array<Record<string, any>>): string {
  if (!rows || rows.length === 0) return "";
  return rows.map((r) => JSON.stringify(r)).join("\n");
}

export function generateTsv(rows: Array<Record<string, any>>): string {
  if (!rows || rows.length === 0) return "";
  const keys = Object.keys(rows[0]);
  const header = keys.join("\t");
  const body = rows.map((row) =>
    keys.map((k) => {
      const v = row[k];
      if (v === null || v === undefined) return "";
      return String(v).replace(/[\t\n]/g, " ");
    }).join("\t")
  ).join("\n");
  return `${header}\n${body}`;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
