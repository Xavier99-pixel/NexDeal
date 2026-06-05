"use client";

export function DealsMarquee() {
  const deals = [
    "Deals | Tap to get Flat 50% Off ?",
    "Jackpot Deals | Tap to get Flat 50% Off ?",
    "Flash Sale | Limited Time Offers",
    "Member Exclusive | Extra 10% Off",
  ];

  return (
    <div className="bg-accent overflow-hidden py-3">
      <div className="flex animate-marquee-fast whitespace-nowrap">
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex">
            {deals.map((deal, index) => (
              <span
                key={`${setIndex}-${index}`}
                className="mx-8 text-sm font-semibold text-accent-foreground cursor-pointer hover:underline"
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
