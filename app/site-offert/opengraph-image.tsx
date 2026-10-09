import { ImageResponse } from "next/og";
import { OFFER_CONTENT } from "@/lib/offer-content";
import { OG_IMAGE_SIZE } from "@/lib/seo";

export const alt = OFFER_CONTENT.heading;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

// Contour lines: the territorial code of the charter, abstract and on the right edge.
const CONTOURS = [
  { rx: 330, ry: 190, rotate: -14, opacity: 0.5 },
  { rx: 270, ry: 150, rotate: -10, opacity: 0.4 },
  { rx: 210, ry: 112, rotate: -6, opacity: 0.3 },
  { rx: 150, ry: 76, rotate: -2, opacity: 0.22 },
];

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#17324d",
        padding: 80,
        position: "relative",
      }}
    >
      <svg
        width={1200}
        height={630}
        viewBox="0 0 1200 630"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {CONTOURS.map((contour) => (
          <ellipse
            key={contour.rx}
            cx={1010}
            cy={430}
            rx={contour.rx}
            ry={contour.ry}
            fill="none"
            stroke="#8aab98"
            strokeWidth={2}
            opacity={contour.opacity}
            transform={`rotate(${contour.rotate} 1010 430)`}
          />
        ))}
      </svg>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="68" height="54" viewBox="0 0 52 42">
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
          style={{ display: "flex", fontSize: 54, fontWeight: 800, color: "#ffffff", letterSpacing: -2 }}
        >
          MetaVosgiens
        </div>
      </div>

      <div
        style={{
          display: "flex",
          maxWidth: 900,
          fontSize: 76,
          lineHeight: 1.08,
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: -2,
        }}
      >
        {OFFER_CONTENT.heading}
      </div>
    </div>,
    { ...size },
  );
}
