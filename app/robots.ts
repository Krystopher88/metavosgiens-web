import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

// AI crawlers are explicitly allowed, on top of the default "*" rule — MetaVosgiens
// wants to be findable and cited by AI assistants, not just traditional search.
const AI_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_USER_AGENTS, allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
