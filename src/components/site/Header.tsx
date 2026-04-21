import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { useLang } from "@/contexts/LanguageContext";
import { MessageCircle, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { t } = useLang();
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/search", label: t.nav.providers },
    { to: "/search?type=shop", label: t.nav.shops },
    { to: "/#how", label: t.nav.howItWorks },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary hover:bg-accent-soft",
                  loc.pathname === l.to ? "text-primary" : "text-muted-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <Link to="/chat" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden lg:inline">{t.nav.chat}</span>
            </Button>
          </Link>
          <Link to="/dashboard" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden lg:inline">{t.nav.dashboard}</span>
            </Button>
          </Link>
          <LanguageToggle />
          <Link to="/auth" className="hidden sm:inline-flex">
            <Button size="sm" className="bg-primary-gradient text-primary-foreground hover:opacity-95 shadow-elegant">
              {t.nav.signup}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container flex flex-col py-3 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium hover:bg-accent-soft"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/chat" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-md text-sm hover:bg-accent-soft">
              {t.nav.chat}
            </Link>
            <Link to="/dashboard" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-md text-sm hover:bg-accent-soft">
              {t.nav.dashboard}
            </Link>
            <Link to="/auth" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full bg-primary-gradient text-primary-foreground">{t.nav.signup}</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};