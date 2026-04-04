import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EnquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EnquiryDialog = ({ open, onOpenChange }: EnquiryDialogProps) => {
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
      toast({ title: "Enquiry Submitted", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", organization: "", email: "", phone: "", interest: "", message: "" });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Request a Quote</DialogTitle>
          <DialogDescription>Fill in the details below and our team will get back to you within 24 hours.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="enq-name">Name</Label>
              <Input id="enq-name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="enq-org">Organization</Label>
              <Input id="enq-org" maxLength={150} value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder="Hospital / Clinic name" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="enq-email">Email</Label>
              <Input id="enq-email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@hospital.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="enq-phone">Phone</Label>
              <Input id="enq-phone" type="tel" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+966 5XX XXX XXXX" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="enq-interest">Equipment Interest</Label>
            <Input id="enq-interest" maxLength={200} value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} placeholder="e.g., MRI System, Patient Monitors" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="enq-message">Message</Label>
            <Textarea id="enq-message" maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your requirements..." rows={3} />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnquiryDialog;
