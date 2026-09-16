import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={`text-[11px] font-bold tracking-[0.13em] text-[#6a7a84] uppercase ${className ?? ""}`}
    >
      {children}
    </p>
  );
}
