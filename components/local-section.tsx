import { TopographicContours } from "@/components/topographic-contours";

export function LocalSection() {
  return (
    <section
      id="about"
      className="relative grid grid-cols-1 items-center gap-10 overflow-hidden bg-[#eef0ec] px-5 py-16 md:grid-cols-[0.95fr_1.05fr] md:gap-20 md:px-7 md:py-[100px]"
    >
      <div
        aria-hidden="true"
        className="relative min-h-[280px] overflow-hidden rounded-[18px] bg-[#dfe5df] md:min-h-[350px]"
      >
        <div className="absolute inset-[35%_-10%_-12%_-10%] [background:linear-gradient(165deg,#a9b8ad,#466b52)] [clip-path:polygon(0_65%,10%_48%,20%_59%,37%_35%,53%_60%,68%_30%,83%_52%,100%_40%,100%_100%,0_100%)]" />
        <TopographicContours side="left" />
      </div>
      <div>
        <p className="text-[11px] font-bold tracking-[0.13em] text-[#6a7a84] uppercase">
          Proximité
        </p>
        <h2 className="mt-4 font-heading text-[32px] leading-[1.1] font-extrabold tracking-[-0.04em] text-text md:text-[42px] md:tracking-[-0.05em]">
          Nous sommes dans les Vosges.
          <br />
          Et nous venons chez vous.
        </h2>
        <p className="my-[18px] max-w-[590px] text-base text-[#3c4a54] md:text-lg">
          Un interlocuteur, du premier échange au suivi. Une approche qui part de votre réalité, pas
          d&apos;un catalogue de solutions.
        </p>
        <a
          href="#contact"
          className="flex w-fit items-center gap-1.5 text-sm underline decoration-[#9aa59e] underline-offset-4 transition-colors motion-reduce:transition-none hover:text-green"
        >
          En savoir plus sur MetaVosgiens
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
