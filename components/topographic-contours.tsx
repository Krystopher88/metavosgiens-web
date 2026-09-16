type TopographicContoursProps = {
  side: "left" | "right";
};

const RINGS = [
  { top: "24%", offset: "-6%", rotate: "-10deg", scale: 1 },
  { top: "34%", offset: "4%", rotate: "-8deg", scale: 0.9 },
  { top: "45%", offset: "12%", rotate: "-6deg", scale: 0.8 },
];

export function TopographicContours({ side }: TopographicContoursProps) {
  const sideProp = side === "right" ? "right" : "left";

  return (
    <>
      {RINGS.map((ring, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="pointer-events-none absolute h-[250px] w-[470px] rounded-[45%_55%_52%_48%] border-[1.5px] border-[#8aab98] opacity-65 before:absolute before:inset-[28px_-18px] before:rounded-[inherit] before:border-[inherit] before:content-[''] after:absolute after:inset-[56px_-36px] after:rounded-[inherit] after:border-[inherit] after:content-['']"
          style={{
            top: ring.top,
            [sideProp]: ring.offset,
            transform: `rotate(${ring.rotate}) scale(${ring.scale})`,
          }}
        />
      ))}
    </>
  );
}
