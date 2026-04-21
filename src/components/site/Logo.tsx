import { useLang } from "@/contexts/LanguageContext";
import { Hammer } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = () => {
  const { t } = useLang();
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient shadow-gold transition-transform group-hover:scale-105">
        <Hammer className="h-5 w-5 text-primary" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold text-foreground">{t.brand}</span>
        <span className="text-[10px] text-muted-foreground">{t.tagline}</span>
      </span>
    </Link>
  );
};