import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  { icon: MapPin, label: "123 Medical Center Blvd, Suite 200, Houston, TX 77001" },
  { icon: Phone, label: "1-800-555-0000" },
  { icon: Mail, label: "sales@medequippro.com" },
  { icon: Clock, label: "Mon – Fri: 8:00 AM – 6:00 PM" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <span className="text-sm font-semibold tracking-wider uppercase text-primary">Get In Touch</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-5">
              Request a Quote or Consultation
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our equipment specialists are ready to help you find the right solution for your facility. Fill out the form and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <Input placeholder="John Smith" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Organization</label>
                  <Input placeholder="Hospital / Clinic name" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <Input type="email" placeholder="john@hospital.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                  <Input type="tel" placeholder="(555) 000-0000" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Equipment Interest</label>
                <Input placeholder="e.g., MRI System, Patient Monitors" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <Textarea placeholder="Tell us about your requirements..." rows={4} />
              </div>
              <Button className="w-full" size="lg">Submit Inquiry</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
