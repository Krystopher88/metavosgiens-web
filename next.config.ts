import type { NextConfig } from "next";

// Report-Only: violations are logged in the browser console, nothing is blocked.
// 'unsafe-inline' stays in script-src because the pages are prerendered statically,
// so there is no per-request nonce to put on the inline scripts.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://eu-assets.i.posthog.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://eu.i.posthog.com https://eu-assets.i.posthog.com",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

// HSTS without includeSubDomains or preload: subdomains of metavosgiens.com have not
// been audited, and a preload entry cannot be withdrawn quickly.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  agentRules: false,
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Short addresses shown in the campaign posts, one per network so each keeps its own origin:
  // /offert for TikTok (the bio link is not clickable), then Facebook, LinkedIn and Instagram.
  // Temporary (307): the campaign is time-limited.
  // /bonjour is printed on business cards and flyers (QR code) and lands on the home page, so it
  // must outlive the campaign: it is the one short address that is not removed at its end.
  async redirects() {
    return [
      { source: "/offert", destination: "/site-offert?src=tt", permanent: false },
      { source: "/offert-fb", destination: "/site-offert?src=fb", permanent: false },
      { source: "/offert-li", destination: "/site-offert?src=li", permanent: false },
      { source: "/offert-ig", destination: "/site-offert?src=ig", permanent: false },
      { source: "/bonjour", destination: "/?src=papier", permanent: false },
    ];
  },
};

export default nextConfig;
