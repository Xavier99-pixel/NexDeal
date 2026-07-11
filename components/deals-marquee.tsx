"use client";

export function DealsMarquee() {
  const deals = [
    "Fresh tech picks updated daily",
    "Style, gadgets, home and beauty collections",
    "Compare price, rating and store context",
    "Open the official store when ready",
  ];

  return (
    <div className="bg-[#ffb000] overflow-hidden py-3">
      <div className="flex animate-marquee-fast whitespace-nowrap">
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex">
            {deals.map((deal, index) => (
              <span
                key={`${setIndex}-${index}`}
                className="mx-8 text-sm font-black text-[#111827]"
              >
                {deal}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
