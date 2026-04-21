import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useLang } from "@/contexts/LanguageContext";
import { Facebook, Instagram, Twitter, Apple, Smartphone } from "lucide-react";

export const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="mt-24 bg-sidebar text-sidebar-foreground">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <div className="[&_*]:text-sidebar-foreground">
            <Logo />
          </div>
          <p className="text-sm text-sidebar-foreground/70 leading-relaxed">{t.footer.aboutDesc}</p>
          <div className="flex gap-2">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full bg-sidebar-foreground/10 hover:bg-gold hover:text-sidebar grid place-items-center transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">{t.footer.links}</h4>
          <ul className="space-y-2 text-sm text-sidebar-foreground/75">
            <li><Link to="/" className="hover:text-gold">{t.nav.home}</Link></li>
            <li><Link to="/search" className="hover:text-gold">{t.nav.providers}</Link></li>
            <li><Link to="/dashboard" className="hover:text-gold">{t.nav.dashboard}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">{t.footer.forPros}</h4>
          <ul className="space-y-2 text-sm text-sidebar-foreground/75">
            <li><Link to="/provider" className="hover:text-gold">{t.nav.provider}</Link></li>
            <li><Link to="/auth?role=provider" className="hover:text-gold">{t.nav.signup}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">{t.footer.download}</h4>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-2 rounded-lg border border-sidebar-foreground/20 px-3 py-2 hover:border-gold hover:text-gold transition-colors">
              <Apple className="h-5 w-5" />
              <div className="text-xs leading-tight">
                <div className="opacity-70">App Store</div>
                <div className="font-semibold">iOS</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-2 rounded-lg border border-sidebar-foreground/20 px-3 py-2 hover:border-gold hover:text-gold transition-colors">
              <Smartphone className="h-5 w-5" />
              <div className="text-xs leading-tight">
                <div className="opacity-70">Google Play</div>
                <div className="font-semibold">Android</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-sidebar-foreground/15 py-5 text-center text-xs text-sidebar-foreground/60">
        {t.footer.rights}
      </div>
    </footer>
  );
};