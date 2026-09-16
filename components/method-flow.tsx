"use client";

import { useEffect, useRef, useState } from "react";

type FlowStep = {
  number: string;
  title: string;
  body: string;
};

type MethodFlowProps = {
  steps: readonly FlowStep[];
};

const ROW_SIZE = 4;

export function MethodFlow({ steps }: MethodFlowProps) {
  const [visible, setVisible] = useState<boolean[]>(() => steps.map(() => false));
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          setVisible((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Mobile: vertical timeline, scrollable, revealed as it enters view */}
      <div className="relative md:hidden">
        <div aria-hidden="true" className="absolute top-2 bottom-2 left-[19px] w-px bg-[#cfd5d0]" />
        <div className="flex flex-col gap-10">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                refs.current[index] = el;
              }}
              data-index={index}
              className={`relative flex gap-5 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
                visible[index] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-green bg-[#f7f6f2] text-sm font-bold text-green">
                {step.number}
              </span>
              <div className="pt-1">
                <h3 className="font-heading text-[19px] font-extrabold text-text">{step.title}</h3>
                <p className="mt-2 text-[#5a6870]">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal flow, wraps into rows, no scroll needed to see it all */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-14">
        {steps.map((step, index) => {
          const isFirstInRow = index % ROW_SIZE === 0;
          return (
            <div key={step.number} className="relative pl-0">
              {!isFirstInRow && (
                <div
                  aria-hidden="true"
                  className="absolute top-[22px] right-1/2 h-px w-[calc(100%+24px)] bg-[#cfd5d0]"
                />
              )}
              <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-green bg-[#f7f6f2] text-sm font-bold text-green">
                {step.number}
              </span>
              <h3 className="mt-4 font-heading text-[17px] leading-[1.2] font-extrabold text-text">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[260px] text-sm text-[#5a6870]">{step.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
