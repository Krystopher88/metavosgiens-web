import { Eyebrow } from "@/components/eyebrow";
import { SECTION_PADDING, SECTION_TITLE } from "@/lib/design";

type MethodStep = {
  number: string;
  title: string;
  body: string;
};

const METHOD_STEPS: MethodStep[] = [
  {
    number: "01",
    title: "Comprendre",
    body: "On commence par comprendre votre entreprise et ce qui vous pose problème.",
  },
  {
    number: "02",
    title: "Trouver",
    body: "On cherche ce qui peut réellement vous aider.",
  },
  {
    number: "03",
    title: "Construire",
    body: "Nous mettons en place la solution adaptée et nous vous accompagnons ensuite.",
  },
];

export function Method() {
  return (
    <section
      className={`grid grid-cols-1 gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-20 ${SECTION_PADDING}`}
    >
      <div className="md:sticky md:top-[110px]">
        <Eyebrow>Une approche simple</Eyebrow>
        <h2 className={`mt-4 leading-[1.05] text-text ${SECTION_TITLE}`}>
          Vous n&apos;avez pas besoin de savoir quoi construire.
        </h2>
      </div>
      <div className="flex flex-col gap-7">
        {METHOD_STEPS.map((step) => (
          <div key={step.number} className="border-t border-[#cfd5d0] pt-5">
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#82918a]">
              {step.number}
            </span>
            <h3 className="mt-3 mb-2 font-heading text-[22px] font-extrabold text-text md:text-[25px]">
              {step.title}
            </h3>
            <p className="max-w-[470px] text-[#5a6870]">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
