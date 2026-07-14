/**
 * Estimator-based Token-Aware HTML cleaner and text chunker.
 * Keeps scraped data within LLM input limits.
 */

export function cleanHtmlBoilerplate(html: string): string {
  if (!html) return "";

  let clean = html;

  // 1. Remove script, style, svg, header, footer, nav, and form blocks
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  clean = clean.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, "");
  clean = clean.replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, "");
  clean = clean.replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, "");
  clean = clean.replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, "");
  clean = clean.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "");

  // 2. Remove all HTML comments
  clean = clean.replace(/<!--[\s\S]*?-->/g, "");

  // 3. Remove inline styles and classes to save tokens
  clean = clean.replace(/\sstyle="[^"]*"/gi, "");
  clean = clean.replace(/\sclass="[^"]*"/gi, "");
  clean = clean.replace(/\sid="[^"]*"/gi, "");

  // 4. Strip excessive whitespace and line breaks
  clean = clean.replace(/\s+/g, " ");
  clean = clean.trim();

  return clean;
}

export function estimateTokenCount(text: string): number {
  if (!text) return 0;
  // Fallback heuristic: 1 token is roughly 4 characters in English
  return Math.ceil(text.length / 4);
}

export function chunkTextByTokens(text: string, maxTokens: number = 12000): string[] {
  const cleanText = cleanHtmlBoilerplate(text);
  const words = cleanText.split(" ");
  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentTokenCount = 0;

  for (const word of words) {
    const wordTokenEstimate = estimateTokenCount(word) + 1; // +1 for space
    if (currentTokenCount + wordTokenEstimate > maxTokens) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk.join(" "));
      }
      currentChunk = [word];
      currentTokenCount = wordTokenEstimate;
    } else {
      currentChunk.push(word);
      currentTokenCount += wordTokenEstimate;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(" "));
  }

  return chunks;
}
