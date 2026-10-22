// Link-preview crawlers (Facebook, LinkedIn, WhatsApp...) and anything without a user agent.
// In-app browsers of Instagram, Facebook and TikTok are real visitors and carry none of these.
const BOT_MARKERS = [
  "bot",
  "crawler",
  "spider",
  "facebookexternalhit",
  "facebot",
  "meta-externalagent",
  "whatsapp",
  "slurp",
  "preview",
];

export function isPreviewBot(userAgent: string | null): boolean {
  const agent = userAgent?.trim().toLowerCase();
  if (!agent) return true;
  return BOT_MARKERS.some((marker) => agent.includes(marker));
}

type Visit = {
  event: "offer_visit" | "home_visit";
  src: string;
  userAgent: string | null;
  at: Date;
};

// One JSON line per page view, written to the server's standard output. No IP address, no
// identifier, no cookie: only the campaign origin, whether it looks like a robot, and the time.
export function formatVisitLine({ event, src, userAgent, at }: Visit): string {
  return JSON.stringify({
    event,
    src,
    bot: isPreviewBot(userAgent),
    at: at.toISOString(),
  });
}
