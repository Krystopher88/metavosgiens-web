import type { Metadata } from "next";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { ArrowIcon } from "@/components/arrow-icon";
import { OfferForm } from "@/components/offer-form";
import { TopographicContours } from "@/components/topographic-contours";
import { Button } from "@/components/ui/button";
import { SECTION_PADDING, SECTION_TITLE } from "@/lib/design";
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
      <section className="grid grid-cols-1 gap-8 px-5 py-10 md:min-h-[520px] md:grid-cols-[1fr_1.1fr] md:gap-10 md:px-7 md:pt-[42px] md:pb-5">
        <div className="flex flex-col justify-center md:py-[40px] md:pb-16">
          <h1 className="font-heading text-[38px] leading-[1.05] font-extrabold tracking-[-0.045em] text-text sm:text-[46px] md:text-[40px] md:tracking-[-0.055em] lg:text-[50px]">
            {headingStart} <span className="text-green">offert</span> {headingEnd}
          </h1>
          <p className="mt-6 max-w-[560px] text-base text-[#3c4a54] md:text-lg">
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
        <div
          aria-hidden="true"
          className="relative min-h-[300px] overflow-hidden rounded-bl-[26px] md:min-h-[460px]"
        >
          <Image
            src="/images/hero-vosges.jpg"
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 [background:linear-gradient(160deg,rgba(23,50,77,0.05)_0%,rgba(23,50,77,0.15)_55%,rgba(23,50,77,0.55)_100%)]" />
          <TopographicContours side="right" />
        </div>
      </section>

      <section className={`grid grid-cols-1 gap-12 bg-[#eef0ec] md:grid-cols-2 md:gap-16 ${SECTION_PADDING}`}>
        <div>
          <h2 className={SECTION_HEADING}>{OFFER_CONTENT.receive.title}</h2>
          <div className="mt-6 flex flex-col gap-8">
            {OFFER_CONTENT.receive.groups.map((group) => (
              <div key={group.title}>
                <h3 className="font-heading text-[17px] font-extrabold text-text">{group.title}</h3>
                <ul className="mt-3 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base text-[#3c4a54] md:text-lg"
                    >
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
            ))}
          </div>
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

      <section className={`bg-navy ${SECTION_PADDING}`}>
        <h2 className={`leading-[1.1] text-white ${SECTION_TITLE}`}>{OFFER_CONTENT.steps.title}</h2>
        <ol className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-4">
          {OFFER_CONTENT.steps.items.map((item, index) => (
            <li key={item}>
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#6fa87d] bg-navy text-sm font-bold text-[#6fa87d]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 max-w-[260px] font-heading text-[18px] leading-[1.3] font-extrabold text-white">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className={`relative grid grid-cols-1 gap-10 overflow-hidden bg-[#eef0ec] md:grid-cols-[0.95fr_1.05fr] md:gap-20 ${SECTION_PADDING}`}
      >
        <div className="hidden lg:contents">
          <TopographicContours side="left" />
        </div>
        <div className="relative md:sticky md:top-[110px] md:self-start">
          <h2 className={`leading-[1.1] text-text ${SECTION_TITLE}`}>{OFFER_CONTENT.faq.title}</h2>
        </div>
        <div className="relative">
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

      <section
        id="candidature"
        className={`grid scroll-mt-16 grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16 ${SECTION_PADDING}`}
      >
        <div
          aria-hidden="true"
          className="relative hidden overflow-hidden rounded-[18px] md:block"
        >
          <Image
            src="/images/about-proximite.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 40vw, 1px"
            className="object-cover"
          />
          <div className="absolute inset-0 [background:linear-gradient(165deg,rgba(23,50,77,0.05)_0%,rgba(23,50,77,0.3)_100%)]" />
          <TopographicContours side="left" />
        </div>
        <div className="max-w-[640px]">
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
