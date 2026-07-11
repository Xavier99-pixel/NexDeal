import Link from "next/link";
import Image from "next/image";

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
      <div className="relative h-12 w-12 overflow-hidden rounded-[18px] bg-white shadow-[0_10px_24px_rgba(15,39,86,0.16)] ring-1 ring-black/5">
        <Image
          src="/nexdeal-logo-ai.png"
          alt=""
          fill
          sizes="48px"
          className="object-cover"
          priority
        />
      </div>
      {!compact && (
        <div className="leading-none">
          <p className={`text-2xl font-black tracking-normal ${inverted ? "text-white" : "text-foreground"}`}>
            <span className="text-[#0057a8]">Nex</span>
            <span className="text-[#e63516]">Deal</span>
          </p>
          <p className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${inverted ? "text-white/75" : "text-muted-foreground"}`}>
            Better picks daily
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
