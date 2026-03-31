import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import imagingImg from "@/assets/product-imaging.jpg";
import monitoringImg from "@/assets/product-monitoring.jpg";
import surgicalImg from "@/assets/product-surgical.jpg";
import labImg from "@/assets/product-lab.jpg";

const products = [
  {
    title: "Diagnostic Imaging",
    description: "MRI, CT scanners, X-ray, and ultrasound systems from top manufacturers.",
    image: imagingImg,
  },
  {
    title: "Patient Monitoring",
    description: "Vital signs monitors, telemetry systems, and bedside monitoring solutions.",
    image: monitoringImg,
  },
  {
    title: "Surgical Instruments",
    description: "Precision surgical tools, electrosurgical units, and OR equipment.",
    image: surgicalImg,
  },
  {
    title: "Laboratory Equipment",
    description: "Analyzers, centrifuges, and diagnostic testing instruments.",
    image: labImg,
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">Our Products</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Equipment You Can Rely On
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            We supply a comprehensive range of medical equipment to hospitals, clinics, and laboratories across the country.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <Card
              key={product.title}
              className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="font-display font-semibold text-lg text-foreground mb-1">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <Button variant="ghost" size="sm" className="gap-1 px-0 text-primary hover:text-primary/80">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
