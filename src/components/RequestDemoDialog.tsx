import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ksaCities = [
  "Riyadh", "Jeddah", "Mecca", "Medina", "Dammam",
  "Khobar", "Dhahran", "Tabuk", "Abha", "Taif",
  "Buraidah", "Najran", "Jazan", "Yanbu", "Al Ahsa",
  "Jubail", "Hail", "Khamis Mushait", "Al Qatif", "Sakaka",
];

const demoProducts = [
  "Patient Monitors", "Ultrasound Systems", "Ventilators", "Defibrillators",
  "Infusion Pumps", "ECG Machines", "Surgical Lights", "Anesthesia Machines",
];

interface RequestDemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RequestDemoDialog = ({ open, onOpenChange }: RequestDemoDialogProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", hospital: "", city: "", email: "", phone: "", product: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("demo_requests").insert(formData);
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Demo Request Submitted", description: "Our team will contact you shortly to schedule your demo." });
      setFormData({ name: "", hospital: "", city: "", email: "", phone: "", product: "" });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Request a Demo</DialogTitle>
          <DialogDescription>Fill in the details below and our team will arrange a product demonstration.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="demo-name">Name</Label>
            <Input id="demo-name" required maxLength={100} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your full name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="demo-hospital">Hospital / Medical Center</Label>
            <Input id="demo-hospital" required maxLength={150} value={formData.hospital} onChange={(e) => setFormData({ ...formData, hospital: e.target.value })} placeholder="Organization name" />
          </div>
          <div className="space-y-1.5">
            <Label>City</Label>
            <Select value={formData.city} onValueChange={(v) => setFormData({ ...formData, city: v })} required>
              <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
              <SelectContent>
                {ksaCities.map((city) => (<SelectItem key={city} value={city}>{city}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="demo-email">Email</Label>
              <Input id="demo-email" type="email" required maxLength={255} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-phone">Phone</Label>
              <Input id="demo-phone" type="tel" required maxLength={20} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+966 5XX XXX XXXX" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Product</Label>
            <Select value={formData.product} onValueChange={(v) => setFormData({ ...formData, product: v })} required>
              <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
              <SelectContent>
                {demoProducts.map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDemoDialog;
