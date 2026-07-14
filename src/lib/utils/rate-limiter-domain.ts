/**
 * Domain-specific crawler throttle utility.
 * Enforces customizable rate limits per target domain during web scrapes.
 */

interface DomainAccessRecord {
  lastAccessTime: number;
  minDelayMs: number;
}

const domainRegistry = new Map<string, DomainAccessRecord>();
const DEFAULT_DELAY_MS = 1500; // 1.5 seconds default polite crawl delay

function getDomainHost(url: string): string {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return "unknown";
  }
}

export async function throttleDomainRequest(url: string, customDelayMs?: number): Promise<void> {
  const host = getDomainHost(url);
  if (host === "unknown") return;

  const delayLimit = customDelayMs ?? DEFAULT_DELAY_MS;
  const now = Date.now();
  const record = domainRegistry.get(host);

  if (record) {
    const elapsed = now - record.lastAccessTime;
    if (elapsed < record.minDelayMs) {
      const waitTime = record.minDelayMs - elapsed;
      console.log(`[RateLimiter] Throttling crawler for ${host} - sleeping ${waitTime}ms`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  // Update record with current timestamp
  domainRegistry.set(host, {
    lastAccessTime: Date.now(),
    minDelayMs: delayLimit
  });
}
