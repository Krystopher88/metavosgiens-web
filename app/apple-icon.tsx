import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3f6b52",
      }}
    >
      <svg width={112} height={90} viewBox="0 0 52 42">
        <polyline
          points="2,34 12,14 20,24 30,6 40,22 50,12"
          fill="none"
          stroke="#ffffff"
          strokeWidth={3.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="2,38 12,20 20,28 30,15 40,26 50,18"
          fill="none"
          stroke="#6fa87d"
          strokeWidth={2.9}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.9}
        />
      </svg>
    </div>,
    { ...size },
  );
}
