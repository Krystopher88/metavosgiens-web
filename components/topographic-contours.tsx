export type TopographicEmphasis = "focus" | "compact" | "expand" | "shift";

type TopographicContoursProps = {
  side: "left" | "right";
  emphasis?: TopographicEmphasis | null;
};

const RINGS = [
  { top: "24%", offset: "-6%", rotate: -10, scale: 1 },
  { top: "34%", offset: "4%", rotate: -8, scale: 0.9 },
  { top: "45%", offset: "12%", rotate: -6, scale: 0.8 },
];

const EMPHASIS_DELTA: Record<
  TopographicEmphasis,
  { scale: number; rotate: number; opacity: number; borderColor?: string }
> = {
  focus: { scale: 1.1, rotate: 0, opacity: 1, borderColor: "#3f6b52" },
  compact: { scale: 0.78, rotate: 6, opacity: 0.65 },
  expand: { scale: 1.22, rotate: 0, opacity: 0.75 },
  shift: { scale: 1, rotate: 26, opacity: 0.75 },
};

export function TopographicContours({ side, emphasis }: TopographicContoursProps) {
  const sideProp = side === "right" ? "right" : "left";
  const delta = emphasis ? EMPHASIS_DELTA[emphasis] : null;

  return (
    <>
      {RINGS.map((ring, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="pointer-events-none absolute h-[250px] w-[470px] rounded-[45%_55%_52%_48%] border-[1.5px] border-[#8aab98] opacity-65 transition-[transform,opacity,border-color] duration-500 ease-out before:absolute before:inset-[28px_-18px] before:rounded-[inherit] before:border-[inherit] before:content-[''] after:absolute after:inset-[56px_-36px] after:rounded-[inherit] after:border-[inherit] after:content-[''] motion-reduce:transition-none"
          style={{
            top: ring.top,
            [sideProp]: ring.offset,
            opacity: delta?.opacity ?? undefined,
            borderColor: delta?.borderColor,
            transform: `rotate(${ring.rotate + (delta?.rotate ?? 0)}deg) scale(${ring.scale * (delta?.scale ?? 1)})`,
          }}
        />
      ))}
    </>
  );
}
