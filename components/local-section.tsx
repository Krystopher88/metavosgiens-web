import Image from "next/image";
import { TopographicContours } from "@/components/topographic-contours";
import { ArrowLink } from "@/components/arrow-link";
import { Eyebrow } from "@/components/eyebrow";
import { SECTION_PADDING, SECTION_TITLE } from "@/lib/design";

export function LocalSection() {
  return (
    <section
      id="proximite"
      className={`relative grid grid-cols-1 items-center gap-10 overflow-hidden bg-[#eef0ec] md:grid-cols-[0.95fr_1.05fr] md:gap-20 ${SECTION_PADDING}`}
    >
      <div
        aria-hidden="true"
        className="relative min-h-[280px] overflow-hidden rounded-[18px] md:min-h-[350px]"
      >
        <Image
          src="/images/local-vosges.jpg"
          alt=""
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 [background:linear-gradient(165deg,rgba(23,50,77,0.05)_0%,rgba(23,50,77,0.3)_100%)]" />
        <TopographicContours side="left" />
      </div>
      <div>
        <Eyebrow>Proximité</Eyebrow>
        <h2 className={`mt-4 leading-[1.1] text-text ${SECTION_TITLE}`}>
          Je suis dans les Vosges.
          <br className="hidden md:block" /> Et je viens chez vous.
        </h2>
        <p className="my-[18px] max-w-[590px] text-base text-[#3c4a54] md:text-lg">
          MetaVosgiens est une agence vosgienne : je travaille avec les entreprises des Vosges et
          des départements voisins, et je viens chez vous, quand la distance le permet, pour
          comprendre votre activité sur le terrain. Je suis Christopher Bichon, votre seul
          interlocuteur, du premier échange au suivi. Pas de catalogue de solutions : je pars de
          votre réalité.
        </p>
        <ArrowLink href="/a-propos">Qui je suis et comment je travaille</ArrowLink>
      </div>
    </section>
  );
}
