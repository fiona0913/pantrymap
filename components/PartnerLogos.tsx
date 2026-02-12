import type { CSSProperties } from "react";

type Partner = {
  name: string;
  src: string;
  scale?: number;
  maxWidthClass?: string;
  softenBlendMode?: CSSProperties["mixBlendMode"];
  softenOpacity?: number;
};

const partners: Partner[] = [
  {
    name: "Urban Freight Lab",
    src: "/partners/uw-urban-freight-lab.png",
    scale: 1.35,
    maxWidthClass: "max-w-[220px]",
  },
  {
    name: "UW Paul G. Allen School",
    src: "/partners/uw-paul-allen-school.png",
    scale: 1.35,
    maxWidthClass: "max-w-[220px]",
  },
  {
    name: "UW School of Public Health",
    src: "/partners/uw-school-of-public-health.png",
    scale: 1.35,
    maxWidthClass: "max-w-[220px]",
  },
  {
    name: "Washington State Department of Health",
    src: "/partners/wa-doh.svg",
  },
  {
    name: "Ridwell",
    src: "/partners/ridwell.png",
  },
  {
    name: "University District Food Bank",
    src: "/partners/university-district-food-bank.png",
    softenBlendMode: "darken",
    softenOpacity: 0.9,
    scale: 1.05,
  },
  {
    name: "Cascade Bicycle Club",
    src: "/partners/cascade-bicycle-club.svg",
  },
  {
    name: "Pedaling Relief Project",
    src: "/partners/pedaling-relief-project.png",
    scale: 1.35,
    maxWidthClass: "max-w-[220px]",
    softenBlendMode: "darken",
    softenOpacity: 0.9,
  },
  {
    name: "Sustainable Connections",
    src: "/partners/sustainable-connections.png",
    scale: 1.6,
    maxWidthClass: "max-w-[220px]",
  },
];

export default function PartnerLogos() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="flex min-h-[96px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-center text-xs font-medium uppercase tracking-wide text-zinc-500 shadow-sm"
        >
          <div
            className={`flex h-12 w-full items-center justify-center md:h-14 ${
              partner.maxWidthClass ?? "max-w-[180px]"
            }`}
          >
            {partner.src === "/partners/uw-paul-allen-school.png" ? (
              <img
                src={partner.src}
                alt={partner.name}
                className="h-full w-full object-contain opacity-90"
                style={{
                  ...(partner.scale
                    ? { transform: `scale(${partner.scale})` }
                    : undefined),
                  mixBlendMode: "multiply",
                  filter: "contrast(1.15) saturate(1.05)",
                  opacity: 0.98,
                }}
              />
            ) : (
              <img
                src={partner.src}
                alt={partner.name}
                className="h-full w-full object-contain opacity-90"
                style={{
                  ...(partner.scale
                    ? { transform: `scale(${partner.scale})` }
                    : undefined),
                  ...(partner.softenBlendMode
                    ? { mixBlendMode: partner.softenBlendMode }
                    : undefined),
                  ...(partner.softenOpacity
                    ? { opacity: partner.softenOpacity }
                    : undefined),
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
