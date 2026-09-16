type LogoVariant = "onLight" | "onDark";

const VARIANT_COLORS: Record<
  LogoVariant,
  { word: string; strokePrimary: string; strokeSecondary: string }
> = {
  onLight: { word: "#17212b", strokePrimary: "#3f6b52", strokeSecondary: "#6fa87d" },
  onDark: { word: "#ffffff", strokePrimary: "#6fa87d", strokeSecondary: "#ffffff" },
};

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
};

export function Logo({ variant = "onLight", className }: LogoProps) {
  const colors = VARIANT_COLORS[variant];

  return (
    <span className={`inline-flex flex-col items-center ${className ?? ""}`}>
      <span className="flex items-center gap-[0.41em]">
        <svg aria-hidden="true" viewBox="0 0 52 42" className="h-[0.95em] w-[1.18em] shrink-0">
          <polyline
            points="2,34 12,14 20,24 30,6 40,22 50,12"
            fill="none"
            stroke={colors.strokePrimary}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="2,38 12,20 20,28 30,15 40,26 50,18"
            fill="none"
            stroke={colors.strokeSecondary}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.8}
          />
        </svg>
        <span
          className="font-heading whitespace-nowrap text-[1em] font-extrabold tracking-[-0.04em]"
          style={{ color: colors.word }}
        >
          MetaVosgiens
        </span>
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="mt-[0.18em] block h-[0.32em] w-[7.66em]"
      >
        <polyline
          points="1,10 34,4 68,11 102,3 136,10 168,4 199,9"
          fill="none"
          stroke={colors.strokePrimary}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="1,12.5 34,7.5 68,13.5 102,6.5 136,12.5 168,7.5 199,11.5"
          fill="none"
          stroke={colors.strokeSecondary}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.75}
        />
      </svg>
    </span>
  );
}
