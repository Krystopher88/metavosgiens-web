import Image from "next/image";
import { Phone } from "lucide-react";
import { ArrowLink } from "@/components/arrow-link";
import { ContactCtaButton } from "@/components/contact-cta-button";
import { Eyebrow } from "@/components/eyebrow";
import { TopographicContours } from "@/components/topographic-contours";
import { SECTION_PADDING, SECTION_TITLE } from "@/lib/design";
import { SITE } from "@/lib/content";
import type { ServicePageContent } from "@/lib/services";

const SECTION_HEADING = "font-heading text-[24px] font-extrabold tracking-[-0.03em] text-text";

type ServicePageProps = {
  content: ServicePageContent;
};

export function ServicePage({ content }: ServicePageProps) {
  return (
    <main>
      <section className="grid grid-cols-1 gap-8 px-5 py-10 md:min-h-[520px] md:grid-cols-[1fr_1.1fr] md:gap-10 md:px-7 md:pt-[42px] md:pb-5">
        <div className="flex flex-col justify-center md:py-[40px] md:pb-16">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-heading text-[38px] leading-[1.05] font-extrabold tracking-[-0.045em] text-text sm:text-[46px] md:text-[44px] md:tracking-[-0.055em] lg:text-[56px]">
            {content.heading}
          </h1>
          <p className="mt-5 max-w-[560px] text-base text-[#3c4a54] md:text-lg">{content.lead}</p>
          <div className="mt-7">
            <ContactCtaButton />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="relative min-h-[300px] overflow-hidden rounded-bl-[26px] md:min-h-[460px]"
        >
          <Image
            src={content.heroImage.src}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 55vw, 100vw"
            className={`object-cover ${content.heroImage.position}`}
          />
          <div className="absolute inset-0 [background:linear-gradient(160deg,rgba(23,50,77,0.05)_0%,rgba(23,50,77,0.15)_55%,rgba(23,50,77,0.55)_100%)]" />
          <TopographicContours side="right" />
        </div>
      </section>

      <section
        className={`relative grid grid-cols-1 gap-10 overflow-hidden bg-[#eef0ec] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 ${SECTION_PADDING}`}
      >
        <div className="hidden lg:contents">
          <TopographicContours side="left" />
        </div>
        <h2 className={`relative leading-[1.1] text-text ${SECTION_TITLE}`}>
          {content.situations.title}
        </h2>
        <ul className="relative grid grid-cols-1 gap-6">
          {content.situations.items.map((item) => (
            <li
              key={item}
              className="max-w-[520px] border-l-[3px] border-green pl-5 font-heading text-[22px] leading-[1.25] font-extrabold text-text"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={SECTION_PADDING}>
        <div className="max-w-[640px]">
          <h2 className={SECTION_HEADING}>{content.offer.title}</h2>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">{content.offer.intro}</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
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

      <section className={`relative overflow-hidden bg-navy ${SECTION_PADDING}`}>
        <TopographicContours side="right" />
        <div className="relative max-w-[640px]">
          <h2 className={`leading-[1.1] text-white ${SECTION_TITLE}`}>{content.steps.title}</h2>
          <p className="mt-3 text-base text-[#d5dddf] md:text-lg">{content.steps.intro}</p>
        </div>
        <ol className="relative mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-4">
          {content.steps.items.map((step, index) => (
            <li key={step.title}>
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-[#6fa87d] bg-navy text-sm font-bold text-[#6fa87d]"
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
        <div className="relative mt-10">
          <a
            href="/a-propos#methode"
            className="text-sm text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white motion-reduce:transition-none"
          >
            Voir ma méthode en détail
          </a>
        </div>
      </section>

      {content.extra && (
        <section className={SECTION_PADDING}>
          <div className="max-w-[640px]">
            <h2 className={SECTION_HEADING}>{content.extra.title}</h2>
            <p className="mt-3 text-base text-[#3c4a54] md:text-lg">{content.extra.body}</p>
            {content.extra.link && (
              <div className="mt-4">
                <ArrowLink href={content.extra.link.href}>{content.extra.link.label}</ArrowLink>
              </div>
            )}
          </div>
        </section>
      )}

      <section
        className={`grid grid-cols-1 gap-10 bg-[#eef0ec] md:grid-cols-[0.95fr_1.05fr] md:gap-20 ${SECTION_PADDING}`}
      >
        <div className="md:sticky md:top-[110px] md:self-start">
          <h2 className={`leading-[1.1] text-text ${SECTION_TITLE}`}>Questions fréquentes</h2>
          <p className="mt-4 max-w-[420px] text-base text-[#3c4a54] md:text-lg">
            Une autre question ? Posez-la lors du premier échange, il est gratuit et sans
            engagement.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {content.faq.map((entry) => (
            <div key={entry.question} className="border-t border-[#cfd5d0] pt-5">
              <h3 className="font-heading text-[19px] leading-[1.25] font-extrabold text-text">
                {entry.question}
              </h3>
              <p className="mt-2 text-base text-[#3c4a54] md:text-lg">{entry.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className={`grid grid-cols-1 items-center gap-10 md:grid-cols-[0.95fr_1.05fr] md:gap-20 ${SECTION_PADDING}`}
      >
        <div
          aria-hidden="true"
          className="relative min-h-[280px] overflow-hidden rounded-[18px] md:min-h-[400px]"
        >
          <Image
            src={content.closingImage.src}
            alt=""
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className={`object-cover ${content.closingImage.position}`}
          />
          <div className="absolute inset-0 [background:linear-gradient(165deg,rgba(23,50,77,0.05)_0%,rgba(23,50,77,0.3)_100%)]" />
          <TopographicContours side="left" />
        </div>
        <div>
          <h2 className={SECTION_HEADING}>Parlons de votre projet</h2>
          <p className="mt-3 text-base text-[#3c4a54] md:text-lg">
            Le premier échange est gratuit et sans engagement. Cette page est publiée par
            Christopher Bichon, fondateur de MetaVosgiens, votre seul interlocuteur.
          </p>
          <p className="mt-4 flex items-center gap-2 text-base text-[#3c4a54] md:text-lg">
            <Phone size={20} aria-hidden="true" />
            <a
              href={`tel:${SITE.contactPhoneHref}`}
              className="rounded-sm underline underline-offset-2 outline-none hover:text-green focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {SITE.contactPhone}
            </a>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-[22px] gap-y-4">
            <ContactCtaButton />
            <ArrowLink href="/a-propos">Qui je suis et comment je travaille</ArrowLink>
          </div>
          {content.related.map((link) => (
            <div key={link.href} className="mt-8">
              <p className="text-base text-[#3c4a54] md:text-lg">{link.text}</p>
              <div className="mt-2">
                <ArrowLink href={link.href}>{link.label}</ArrowLink>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
