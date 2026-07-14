import { z } from "zod";

/**
 * Prepares LLM prompt instructions to enforce rigid JSON outputs matching the Zod structures.
 * Minimizes unstructured response formatting anomalies from Gemini/DeepSeek models.
 */
export interface SchemaField {
  name: string;
  type: string;
  description?: string;
}

export function generateStructuredPrompt(
  userPrompt: string,
  schema: SchemaField[],
  numRows: number
): string {
  const schemaStr = schema
    .map((f) => `- "${f.name}" (${f.type})${f.description ? `: ${f.description}` : ""}`)
    .join("\n");

  return `${userPrompt}

You MUST return the output strictly as a valid JSON object containing a "data" array with exactly ${numRows} items. 
No conversational text, markdown wrapping (such as \`\`\`json), or trailing explanations. Just return the raw parseable JSON structure.

JSON Response Schema Requirement:
{
  "data": [
    {
      ${schema.map((f) => `"${f.name}": <value matching type ${f.type}>`).join(",\n      ")}
    }
  ]
}

Target Column Specifications:
${schemaStr}`;
}

export function validateStructuredData(
  parsedJson: any,
  schema: SchemaField[]
): boolean {
  if (!parsedJson || typeof parsedJson !== "object" || !Array.isArray(parsedJson.data)) {
    return false;
  }

  // Verify that elements contain the expected keys
  return parsedJson.data.every((row: any) => {
    if (!row || typeof row !== "object") return false;
    return schema.every((field) => field.name in row);
  });
}
