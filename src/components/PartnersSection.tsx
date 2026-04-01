import { useEffect, useRef } from "react";
import allergensLogo from "@/assets/partners/allengers.jpg";

const partners = [
  { name: "Allengers", logo: allergensLogo },
  { name: "Partner 2", logo: null },
  { name: "Partner 3", logo: null },
  { name: "Partner 4", logo: null },
  { name: "Partner 5", logo: null },
  { name: "Partner 6", logo: null },
];

const PartnersSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;

    const scroll = () => {
      scrollPos += 0.5;
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => { animationId = requestAnimationFrame(scroll); };

    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
    };
  }, []);

  // Duplicate items for seamless loop
  const items = [...partners, ...partners];

  return (
    <section id="partners" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Partners
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We collaborate with world-leading medical equipment manufacturers to bring you the best in healthcare technology.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-hidden"
        >
          {items.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-40 h-24 bg-background border border-border rounded-xl flex items-center justify-center shadow-sm p-3"
            >
              {partner.logo ? (
                <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <span className="text-sm text-muted-foreground font-medium">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
