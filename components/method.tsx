import { ArrowLink } from "@/components/arrow-link";
import { Eyebrow } from "@/components/eyebrow";
import { METHOD_STEPS } from "@/lib/content";
import { SECTION_PADDING, SECTION_TITLE } from "@/lib/design";

export function Method() {
  return (
    <section
      id="method"
      className={`grid grid-cols-1 gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-20 ${SECTION_PADDING}`}
    >
      <div className="md:sticky md:top-[110px]">
        <Eyebrow>Une approche simple</Eyebrow>
        <h2 className={`mt-4 leading-[1.05] text-text ${SECTION_TITLE}`}>
          Vous n&apos;avez pas besoin de savoir quoi construire.
        </h2>
        <div className="mt-6">
          <ArrowLink href="/a-propos#methode">Voir notre méthode en détail</ArrowLink>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
        {METHOD_STEPS.map((step) => (
          <div key={step.number} className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-green text-sm font-bold text-green">
              {step.number}
            </span>
            <span className="font-heading text-[15px] leading-[1.2] font-extrabold text-text">
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
