import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
      <svg width={22} height={18} viewBox="0 0 52 42">
        <polyline
          points="2,34 12,14 20,24 30,6 40,22 50,12"
          fill="none"
          stroke="#ffffff"
          strokeWidth={4.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="2,38 12,20 20,28 30,15 40,26 50,18"
          fill="none"
          stroke="#6fa87d"
          strokeWidth={3.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.9}
        />
      </svg>
    </div>,
    { ...size },
  );
}
