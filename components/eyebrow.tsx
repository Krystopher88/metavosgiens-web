import type { ReactNode } from "react";

type EyebrowVariant = "onLight" | "onDark";

// #6a7a84 (the original color) reads at 3.7-4.1:1 against the light backgrounds
// this is used on, and 3:1 against navy — both below WCAG AA's 4.5:1 for small
// text. These are darkened/lightened versions of the same hue that clear 4.5:1.
const VARIANT_COLOR: Record<EyebrowVariant, string> = {
  onLight: "#5d6b74",
  onDark: "#8e9ca4",
};

type EyebrowProps = {
  children: ReactNode;
  variant?: EyebrowVariant;
  className?: string;
};

export function Eyebrow({ children, variant = "onLight", className }: EyebrowProps) {
  return (
    <p
      className={`text-[11px] font-bold tracking-[0.13em] uppercase ${className ?? ""}`}
      style={{ color: VARIANT_COLOR[variant] }}
    >
      {children}
    </p>
  );
}
