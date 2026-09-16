"use client";

import { useState } from "react";
import { TopographicContours, type TopographicEmphasis } from "@/components/topographic-contours";

type PromiseItem = {
  label: string;
  emphasis: TopographicEmphasis;
};

const PROMISES: PromiseItem[] = [
  { label: "Être visible", emphasis: "focus" },
  { label: "Gagner du temps", emphasis: "compact" },
  { label: "Développer votre activité", emphasis: "expand" },
  { label: "Faire évoluer votre façon de travailler", emphasis: "shift" },
];

export function IntroPromises() {
  const [hovered, setHovered] = useState<TopographicEmphasis | null>(null);

  return (
    <>
      <TopographicContours side="right" emphasis={hovered} />
      <div className="relative mt-7 flex max-w-[640px] flex-wrap gap-3">
        {PROMISES.map((promise) => (
          <span
            key={promise.label}
            onMouseEnter={() => setHovered(promise.emphasis)}
            onMouseLeave={() => setHovered(null)}
            className="rounded-[14px] border border-[#c9d1cb] bg-white px-4 py-2 text-sm font-bold text-text transition-colors motion-reduce:transition-none"
          >
            {promise.label}
          </span>
        ))}
      </div>
    </>
  );
}
