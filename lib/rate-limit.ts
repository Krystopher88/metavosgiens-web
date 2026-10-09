type RateLimiterOptions = {
  limit: number;
  windowMs: number;
  now?: () => number;
};

// In-memory sliding window, one list of timestamps per key. The state lives in the server
// process, so it resets on every restart: that is acceptable for a spam brake.
export function createRateLimiter({ limit, windowMs, now = Date.now }: RateLimiterOptions) {
  const hits = new Map<string, number[]>();

  return {
    // Records the attempt and returns true while fewer than `limit` attempts happened inside
    // the window; a refused attempt is not recorded.
    check(key: string): boolean {
      const current = now();
      for (const [entryKey, timestamps] of hits) {
        const recent = timestamps.filter((timestamp) => current - timestamp < windowMs);
        if (recent.length === 0) hits.delete(entryKey);
        else hits.set(entryKey, recent);
      }
      const recent = hits.get(key) ?? [];
      if (recent.length >= limit) return false;
      hits.set(key, [...recent, current]);
      return true;
    },
    size(): number {
      return hits.size;
    },
  };
}

// The last x-forwarded-for entry is the one appended by the nearest proxy (Caddy), so a visitor
// cannot choose it by sending their own header.
export function clientKey(headers: Headers): string {
  const lastAddress = headers.get("x-forwarded-for")?.split(",").pop()?.trim();
  return lastAddress || "unknown";
}
