type RateLimiterOptions = {
  limit: number;
  windowMs: number;
  now?: () => number;
};

// How often expired addresses are dropped even when nobody submits: the privacy policy says an
// address stays in memory for about one hour, so it must not linger until the next submission.
const SWEEP_INTERVAL_MS = 60_000;

// In-memory sliding window, one list of timestamps per key. The state lives in the server
// process, so it resets on every restart: that is acceptable for a spam brake.
export function createRateLimiter({ limit, windowMs, now = Date.now }: RateLimiterOptions) {
  const hits = new Map<string, number[]>();

  function purge(current: number) {
    for (const [entryKey, timestamps] of hits) {
      const recent = timestamps.filter((timestamp) => current - timestamp < windowMs);
      if (recent.length === 0) hits.delete(entryKey);
      else hits.set(entryKey, recent);
    }
  }

  const sweep = setInterval(() => purge(now()), SWEEP_INTERVAL_MS);
  // Never keep the Node process alive for the sweep alone.
  if (typeof sweep === "object") sweep.unref();

  return {
    // Records the attempt and returns true while fewer than `limit` attempts happened inside
    // the window; a refused attempt is not recorded.
    check(key: string): boolean {
      const current = now();
      purge(current);
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
