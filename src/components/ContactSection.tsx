import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: MapPin, label: "Riyadh, Saudi Arabia" },
  { icon: Phone, label: "+966 XX XXX XXXX" },
  { icon: Mail, label: "info@deemmedical.com" },
  { icon: Clock, label: "Mon – Fri: 8:00 AM – 6:00 PM" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", organization: "", email: "", phone: "", interest: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert(form);
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Inquiry Submitted", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", organization: "", email: "", phone: "", interest: "", message: "" });
    }
  };

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
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <Input required maxLength={100} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Organization</label>
                  <Input maxLength={150} placeholder="Hospital / Clinic name" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <Input type="email" required maxLength={255} placeholder="email@hospital.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                  <Input type="tel" maxLength={20} placeholder="(555) 000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Equipment Interest</label>
                <Input maxLength={200} placeholder="e.g., MRI System, Patient Monitors" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <Textarea maxLength={1000} placeholder="Tell us about your requirements..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <Button className="w-full" size="lg" type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
