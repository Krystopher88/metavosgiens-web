const PROOF_CASES = [
  {
    kicker: "Processus complexe",
    headline: "21 jours de travail répartis entre plusieurs étapes.",
    body: "Analyse, traitement, traduction et validation ont été réunis dans un processus assisté et contrôlé.",
  },
  {
    kicker: "Acquisition & marketing",
    headline: "De l'analyse d'un prospect à la préparation des contenus.",
    body: "Recherche concurrentielle, personas, stratégie et production de contenus réunies dans un même processus.",
  },
  {
    kicker: "Outil métier",
    headline: "Quand les logiciels existants ne correspondent plus au métier.",
    body: "Conception d'un outil adapté aux règles, aux données et à la façon réelle de travailler.",
  },
] as const;

export function ProofCases() {
  return (
    <section id="proof" className="bg-navy px-5 py-16 md:px-7 md:py-[100px]">
      <div className="mb-8 flex items-end justify-between gap-10 md:mb-[38px]">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#6a7a84]">
            Des problèmes réels. Des solutions concrètes.
          </p>
          <h2 className="font-heading text-[34px] font-extrabold tracking-[-0.045em] text-white sm:text-[40px] md:text-[50px] md:tracking-[-0.055em]">
            Trois exemples,
            <br className="hidden sm:block" /> trois transformations.
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PROOF_CASES.map((proofCase) => (
          <article
            key={proofCase.kicker}
            className="flex min-h-[300px] flex-col rounded-[15px] bg-white p-[27px] text-text"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-[#6c7b82]">
              {proofCase.kicker}
            </p>
            <h3 className="my-4 font-heading text-[26px] font-extrabold tracking-[-0.04em]">
              {proofCase.headline}
            </h3>
            <p className="max-w-[410px] text-[#56656d]">{proofCase.body}</p>
            <span className="mt-auto text-[13px] font-bold text-green">Voir le cas</span>
          </article>
        ))}
      </div>
    </section>
  );
}
