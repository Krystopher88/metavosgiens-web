import { Button } from "@/components/ui/button";
import { TopographicContours } from "@/components/topographic-contours";

export function Hero() {
  return (
    <section className="grid grid-cols-1 gap-8 px-5 py-10 md:min-h-[650px] md:grid-cols-[1fr_1.15fr] md:gap-10 md:px-7 md:pt-[42px] md:pb-5">
      <div className="flex flex-col justify-center md:py-[50px] md:pb-20">
        <p className="text-[11px] font-bold tracking-[0.13em] text-[#6a7a84] uppercase">
          Des idées d&apos;aujourd&apos;hui pour les entreprises de demain
        </p>
        <h1 className="mt-4 font-heading text-[40px] leading-[1.05] font-extrabold tracking-[-0.03em] text-text sm:text-[56px] md:text-[72px] md:tracking-[-0.065em]">
          Votre entreprise a un problème ?
          <br />
          <span className="text-green">Construisons la solution.</span>
        </h1>
        <p className="mt-5 max-w-[590px] text-base text-[#3c4a54] md:text-lg">
          De votre présence en ligne à vos outils métier, nous construisons ce dont votre entreprise
          a réellement besoin.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-[22px]">
          <Button asChild>
            <a href="#contact">
              Parler de mon besoin
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Button>
          <a
            href="#about"
            className="flex items-center gap-1.5 text-sm underline decoration-[#9aa59e] underline-offset-4 transition-colors motion-reduce:transition-none hover:text-green"
          >
            Découvrir notre approche
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
      </div>
      <div
        aria-hidden="true"
        className="relative min-h-[320px] overflow-hidden rounded-bl-[26px] bg-[linear-gradient(135deg,#e8ebe7_0%,#d8dfda_44%,#97aa9e_100%)] md:min-h-[590px]"
      >
        <div className="absolute inset-[20%_-5%_-8%_5%] saturate-[.7] [clip-path:polygon(0_55%,9%_48%,18%_60%,32%_36%,48%_55%,61%_24%,77%_49%,90%_34%,100%_58%,100%_100%,0_100%)] [background:linear-gradient(160deg,#cfd8d1_2%,#708477_40%,#294839_75%)]" />
        <TopographicContours side="right" />
        <div className="absolute right-7 bottom-7 text-[10px] tracking-[0.12em] text-white">
          VOSGES
          <br />
          <span className="tracking-[0.05em] opacity-80">Territoire d&apos;opportunités</span>
        </div>
      </div>
    </section>
  );
}
