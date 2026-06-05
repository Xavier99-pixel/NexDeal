import Link from "next/link";

interface BrandLogoProps {
  href?: string;
  inverted?: boolean;
  compact?: boolean;
  className?: string;
}

export function BrandLogo({
  href = "/",
  inverted = false,
  compact = false,
  className = "",
}: BrandLogoProps) {
  const logo = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0057a8_0%,#0057a8_42%,#ffb000_43%,#ff6b00_58%,#e63516_59%,#e63516_100%)]" />
        <div className="absolute left-2 top-2 h-7 w-7 rounded-md bg-white/92 shadow-inner" />
        <span className="absolute left-[13px] top-[7px] text-xl font-black tracking-normal text-[#0057a8]">N</span>
        <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-[#ffb000]" />
      </div>
      {!compact && (
        <div className="leading-none">
          <p className={`text-2xl font-black tracking-normal ${inverted ? "text-white" : "text-foreground"}`}>
            <span className="text-[#0057a8]">Nex</span>
            <span className="text-[#e63516]">Deal</span>
          </p>
          <p className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${inverted ? "text-white/75" : "text-muted-foreground"}`}>
            We pick better
          </p>
        </div>
      )}
    </div>
  );

  return (
    <Link href={href} aria-label="NexDeal home" className="inline-flex">
      {logo}
    </Link>
  );
}
