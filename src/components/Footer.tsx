const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/70 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold">D</span>
              </div>
              <span className="font-display font-bold text-lg text-primary-foreground">Deem Medical Technology</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted partner for premium medical equipment, serving healthcare facilities nationwide.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-3">Products</h4>
            <ul className="space-y-2 text-sm">
              {["Diagnostic Imaging", "Patient Monitoring", "Surgical Instruments", "Laboratory Equipment"].map((item) => (
                <li key={item}><a href="#products" className="hover:text-primary-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              {["Installation", "Training", "Maintenance", "Technical Support"].map((item) => (
                <li key={item}><a href="#services" className="hover:text-primary-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Certifications", "Careers", "Contact"].map((item) => (
                <li key={item}><a href="#about" className="hover:text-primary-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs">© 2026 Deem Medical Technology. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
