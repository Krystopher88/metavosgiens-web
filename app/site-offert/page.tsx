import type { Metadata } from "next";
import { Check, ChevronDown } from "lucide-react";
import { ArrowIcon } from "@/components/arrow-icon";
import { OfferForm } from "@/components/offer-form";
import { TopographicContours } from "@/components/topographic-contours";
import { Button } from "@/components/ui/button";
import { SECTION_PADDING } from "@/lib/design";
import { OFFER_PATH } from "@/lib/offer";
import { OFFER_CONTENT } from "@/lib/offer-content";
import { pageMetadata } from "@/lib/seo";

// Landing page reached from posts and emails: not indexed and not in the sitemap while the
// test runs. The title and image replace the site's template (no em dash, own share image).
export const metadata: Metadata = {
  ...pageMetadata({
    title: OFFER_CONTENT.title,
    fullTitle: OFFER_CONTENT.fullTitle,
    description: OFFER_CONTENT.description,
    path: OFFER_PATH,
    image: { url: `${OFFER_PATH}/opengraph-image`, alt: OFFER_CONTENT.heading },
  }),
  robots: { index: false },
};

const SECTION_HEADING = "font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text";

export default function SiteOffertPage() {
  const [headingStart, headingEnd] = OFFER_CONTENT.heading.split(" offert ");

  return (
    <main>
      <section className={`relative overflow-hidden ${SECTION_PADDING}`}>
        <div className="hidden md:contents">
          <TopographicContours side="right" />
        </div>
        <div className="relative max-w-[760px]">
          <h1 className="font-heading text-[38px] leading-[1.05] font-extrabold tracking-[-0.045em] text-text sm:text-[46px] md:text-[56px] md:tracking-[-0.055em]">
            {headingStart} <span className="text-green">offert</span> {headingEnd}
          </h1>
          <p className="mt-6 max-w-[640px] text-base text-[#3c4a54] md:text-lg">
            {OFFER_CONTENT.intro}
          </p>
          <div className="mt-8">
            <Button asChild className="h-11 px-5 text-base">
              <a href="#candidature">
                {OFFER_CONTENT.cta}
                <ArrowIcon />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className={`grid grid-cols-1 gap-12 bg-[#eef0ec] md:grid-cols-2 md:gap-16 ${SECTION_PADDING}`}>
        <div>
          <h2 className={SECTION_HEADING}>{OFFER_CONTENT.receive.title}</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {OFFER_CONTENT.receive.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-[#3c4a54] md:text-lg">
                <Check
                  size={22}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-green"
                  strokeWidth={2.4}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={SECTION_HEADING}>{OFFER_CONTENT.inReturn.title}</h2>
          <ul className="mt-6 flex flex-col gap-4 border-l-[3px] border-navy pl-5">
            {OFFER_CONTENT.inReturn.items.map((item) => (
              <li key={item} className="text-base text-[#3c4a54] md:text-lg">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={SECTION_PADDING}>
        <h2 className={SECTION_HEADING}>{OFFER_CONTENT.steps.title}</h2>
        <ol className="relative mt-8 flex max-w-[640px] flex-col gap-8">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[19px] w-px bg-[#cfd5d0]"
          />
          {OFFER_CONTENT.steps.items.map((item, index) => (
            <li key={item} className="relative flex items-start gap-5">
              <span
                aria-hidden="true"
                className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 border-green bg-background text-sm font-bold text-green"
              >
                {index + 1}
              </span>
              <p className="pt-2 text-base text-[#3c4a54] md:text-lg">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`bg-[#eef0ec] ${SECTION_PADDING}`}>
        <h2 className={SECTION_HEADING}>{OFFER_CONTENT.faq.title}</h2>
        <div className="mt-6 max-w-[760px]">
          {OFFER_CONTENT.faq.items.map((item) => (
            <details key={item.question} className="group border-t border-[#cfd5d0] last:border-b">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-3 font-heading text-[18px] font-extrabold text-text outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-green transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p className="pb-4 text-base text-[#3c4a54] md:text-lg">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="candidature" className={`scroll-mt-16 ${SECTION_PADDING}`}>
        <div className="mx-auto max-w-[640px]">
          <h2 className="font-heading text-[34px] font-extrabold tracking-[-0.045em] text-text sm:text-[40px]">
            {OFFER_CONTENT.formTitle}
          </h2>
          <div className="mt-8">
            <OfferForm />
          </div>
        </div>
      </section>
    </main>
  );
}
