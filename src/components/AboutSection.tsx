import { CheckCircle } from "lucide-react";

const stats = [
  { value: "100%", label: "Quality Commitment" },
  { value: "5,000+", label: "Products Delivered" },
  { value: "500+", label: "Healthcare Partners" },
  { value: "24/7", label: "Technical Support" },
];

const features = [
  "Authorized dealer for leading global brands",
  "Certified installation and calibration teams",
  "Comprehensive maintenance and service contracts",
  "Regulatory compliance and documentation support",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">About Us</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-5">
              Your Trusted Partner in Medical Equipment
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Deem Medical Technology is your preferred medical equipment supplier for hospitals, clinics, and diagnostic centers. We combine deep industry expertise with an unwavering commitment to quality and compliance.
            </p>
            <ul className="space-y-3">
              {features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-6 text-center border border-border shadow-sm"
              >
                <div className="font-display text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
