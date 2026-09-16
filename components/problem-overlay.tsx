"use client";

import { SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowIcon, type Door } from "@/components/problem-doors";

type ProblemOverlayProps = {
  door: Door;
};

export function ProblemOverlay({ door }: ProblemOverlayProps) {
  return (
    <div className="px-[42px] pt-[58px] pb-10">
      <p className="text-[11px] font-bold tracking-[0.13em] text-[#6a7a84] uppercase">
        {door.kicker}
      </p>
      <SheetTitle className="mt-1 font-heading text-[52px] font-extrabold tracking-[-0.06em]">
        {door.panelTitle}
      </SheetTitle>

      <div className="mt-6">
        {door.questions.map((question, index) => (
          <div
            key={question}
            className="flex items-center gap-3 border-b border-[#d9dfda] py-[13px]"
          >
            <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full bg-[#e8ece7] text-[13px] text-text">
              {index + 1}
            </span>
            <span className="text-[15px] text-text">{question}</span>
          </div>
        ))}
      </div>

      <SheetDescription className="mt-[27px] mb-[18px] text-[17px] text-text">
        {door.description}
      </SheetDescription>

      <div className="mb-7 flex flex-wrap gap-2">
        {door.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#cad4ce] px-[11px] py-[7px] text-[11px] text-[#5d6a62]"
          >
            {tag}
          </span>
        ))}
      </div>

      <Button asChild className="mb-4">
        <a href="#contact">
          {door.cta}
          <ArrowIcon />
        </a>
      </Button>

      <div>
        <a
          href="#contact"
          className="text-sm text-[#5d6a62] underline underline-offset-4 transition-colors motion-reduce:transition-none hover:text-green"
        >
          Je ne sais pas encore de quoi j&apos;ai besoin
        </a>
      </div>
    </div>
  );
}
