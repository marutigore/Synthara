"use client";

export interface UsageQuota {
  used: number;
  limit: number;
  resetDate: string;
}

export function getScraperUsage(): UsageQuota {
  if (typeof window === "undefined") {
    return { used: 3, limit: 10, resetDate: "1st of next month" };
  }

  const saved = localStorage.getItem("synthara-scraper-usage");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
  }

  const initial: UsageQuota = {
    used: 3,
    limit: 10,
    resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString()
  };
  localStorage.setItem("synthara-scraper-usage", JSON.stringify(initial));
  return initial;
}

export function incrementScraperUsage(): boolean {
  if (typeof window === "undefined") return true;

  const quota = getScraperUsage();
  if (quota.used >= quota.limit) {
    return false;
  }

  quota.used += 1;
  localStorage.setItem("synthara-scraper-usage", JSON.stringify(quota));
  return true;
}

export function resetScraperUsage(): void {
  if (typeof window === "undefined") return;

  const initial: UsageQuota = {
    used: 0,
    limit: 10,
    resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString()
  };
  localStorage.setItem("synthara-scraper-usage", JSON.stringify(initial));
}
