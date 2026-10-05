import { ArrowLink } from "@/components/arrow-link";
import { ContactCtaButton } from "@/components/contact-cta-button";
import { Eyebrow } from "@/components/eyebrow";
import { TopographicContours } from "@/components/topographic-contours";
import { SECTION_PADDING, SECTION_TITLE } from "@/lib/design";
import type { ServicePageContent } from "@/lib/services";

const SECTION_HEADING = "font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text";

type ServicePageProps = {
  content: ServicePageContent;
};

export function ServicePage({ content }: ServicePageProps) {
  return (
    <main>
      <section className={`relative overflow-hidden ${SECTION_PADDING}`}>
        <div className="hidden xl:block">
          <TopographicContours side="right" />
        </div>
        <div className="relative max-w-[640px]">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className={`mt-4 leading-[1.05] text-text ${SECTION_TITLE}`}>{content.heading}</h1>
          <p className="mt-6 text-lg text-[#3c4a54]">{content.lead}</p>
          <div className="mt-8">
            <ContactCtaButton />
          </div>
        </div>
      </section>

      <section className={`bg-[#eef0ec] ${SECTION_PADDING}`}>
        <h2 className={SECTION_HEADING}>{content.situations.title}</h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
          {content.situations.items.map((item) => (
            <li
              key={item}
              className="max-w-[460px] border-l-[3px] border-green pl-4 font-heading text-[19px] leading-[1.25] font-extrabold text-text"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={SECTION_PADDING}>
        <h2 className={SECTION_HEADING}>{content.offer.title}</h2>
        <p className="mt-3 max-w-[560px] text-base text-[#3c4a54] md:text-lg">
          {content.offer.intro}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          {content.offer.items.map((item) => (
            <div key={item.title} className="border-t border-[#cfd5d0] pt-4">
              <h3 className="font-heading text-[18px] font-extrabold text-text">{item.title}</h3>
              <p className="mt-1 max-w-[440px] text-[#5a6870]">{item.body}</p>
            </div>
          ))}
        </div>
        {content.offer.example && (
          <div className="mt-10 max-w-[640px] border-l-[3px] border-green pl-4">
            <p className="text-base text-[#3c4a54] md:text-lg">{content.offer.example.text}</p>
            <div className="mt-3">
              <ArrowLink href={content.offer.example.href}>{content.offer.example.label}</ArrowLink>
            </div>
          </div>
        )}
      </section>

      <section className={`bg-navy ${SECTION_PADDING}`}>
        <h2 className={`${SECTION_TITLE} text-white`}>{content.steps.title}</h2>
        <ol className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-4">
          {content.steps.items.map((step, index) => (
            <li key={step.title}>
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#6fa87d] text-sm font-bold text-[#6fa87d]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-[17px] leading-[1.2] font-extrabold text-white">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[260px] text-sm text-[#d5dddf]">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {content.extra && (
        <section className={SECTION_PADDING}>
          <div className="max-w-[640px]">
            <h2 className={SECTION_HEADING}>{content.extra.title}</h2>
            <p className="mt-3 text-base text-[#3c4a54] md:text-lg">{content.extra.body}</p>
          </div>
        </section>
      )}

      <section className={`bg-[#eef0ec] ${SECTION_PADDING}`}>
        <h2 className={SECTION_HEADING}>Questions fréquentes</h2>
        <div className="mt-8 grid max-w-[760px] grid-cols-1 gap-8">
          {content.faq.map((entry) => (
            <div key={entry.question}>
              <h3 className="font-heading text-[18px] font-extrabold text-text">
                {entry.question}
              </h3>
              <p className="mt-2 text-base text-[#3c4a54] md:text-lg">{entry.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={SECTION_PADDING}>
        <div className="max-w-[640px]">
          <h2 className={SECTION_HEADING}>Parlons de votre projet</h2>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
            Le premier échange est gratuit et sans engagement. Cette page est publiée par
            Christopher Bichon, fondateur de MetaVosgiens, votre seul interlocuteur.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-[22px] gap-y-4">
            <ContactCtaButton />
            <ArrowLink href="/a-propos">Qui je suis et comment je travaille</ArrowLink>
          </div>
          <p className="mt-10 text-base text-[#3c4a54] md:text-lg">{content.related.text}</p>
          <div className="mt-2">
            <ArrowLink href={content.related.href}>{content.related.label}</ArrowLink>
          </div>
        </div>
      </section>
    </main>
  );
}
