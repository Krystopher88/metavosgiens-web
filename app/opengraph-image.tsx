import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#17324d",
        padding: 80,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <svg width="90" height="72" viewBox="0 0 52 42">
          <polyline
            points="2,34 12,14 20,24 30,6 40,22 50,12"
            fill="none"
            stroke="#6fa87d"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="2,38 12,20 20,28 30,15 40,26 50,18"
            fill="none"
            stroke="#ffffff"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.8}
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -3,
          }}
        >
          MetaVosgiens
        </div>
      </div>
      <svg width={520} height={20} viewBox="0 0 200 14" style={{ marginTop: 14 }}>
        <polyline
          points="1,10 34,4 68,11 102,3 136,10 168,4 199,9"
          fill="none"
          stroke="#6fa87d"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          display: "flex",
          marginTop: 36,
          fontSize: 34,
          color: "#d8dfda",
          letterSpacing: -0.5,
        }}
      >
        {SITE.tagline}
      </div>
    </div>,
    { ...size },
  );
}
