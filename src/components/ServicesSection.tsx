import { Wrench, Headphones, GraduationCap, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Wrench,
    title: "Installation & Setup",
    description: "Professional installation with certified technicians ensuring optimal equipment performance from day one.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock technical support with rapid response times to minimize downtime.",
  },
  {
    icon: GraduationCap,
    title: "Training Programs",
    description: "Comprehensive staff training to ensure safe and efficient operation of all equipment.",
  },
  {
    icon: RefreshCw,
    title: "Maintenance Contracts",
    description: "Preventive maintenance and service agreements to extend equipment lifespan and reliability.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Our Services</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
            End-to-End Equipment Solutions
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Beyond supply, we provide comprehensive support throughout the equipment lifecycle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="border-border hover:border-primary/30 transition-colors group">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
