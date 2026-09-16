"use client";

import { SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { Door } from "@/components/problem-doors";
import { ArrowIcon } from "@/components/arrow-icon";
import { Eyebrow } from "@/components/eyebrow";

type ProblemOverlayProps = {
  door: Door;
  onNavigate: () => void;
};

// The Sheet locks body scroll while open, so a scroll attempted before the
// close's exit transition (and Radix's scroll-lock release) finishes gets cut
// short. onNavigate closes the Sheet without restoring focus to the door card
// (see problem-doors.tsx) — restoring it would re-scroll the page back there,
// fighting this scroll to #contact.
function handleContactLinkClick(onNavigate: () => void) {
  return () => {
    onNavigate();
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", "#contact");
    }, 250);
  };
}

export function ProblemOverlay({ door, onNavigate }: ProblemOverlayProps) {
  return (
    <div className="px-6 pt-[54px] pb-10 sm:px-[42px] sm:pt-[58px]">
      <Eyebrow>{door.kicker}</Eyebrow>
      <SheetTitle className="mt-1 font-heading text-[36px] font-extrabold tracking-[-0.05em] sm:text-[52px] sm:tracking-[-0.06em]">
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
        <a href="#contact" onClick={handleContactLinkClick(onNavigate)}>
          {door.cta}
          <ArrowIcon size={18} />
        </a>
      </Button>

      <div>
        <a
          href="#contact"
          onClick={handleContactLinkClick(onNavigate)}
          className="text-sm text-[#5d6a62] underline underline-offset-4 transition-colors motion-reduce:transition-none hover:text-green"
        >
          Je ne sais pas encore de quoi j&apos;ai besoin
        </a>
      </div>
    </div>
  );
}
