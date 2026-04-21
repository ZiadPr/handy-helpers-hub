import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stars } from "./Stars";
import { useLang } from "@/contexts/LanguageContext";
import type { Provider } from "@/data/mock";
import { translations } from "@/i18n/translations";
import { MapPin, MessageCircle, ShieldCheck, Trophy, Zap } from "lucide-react";

export const ProviderCard = ({ provider }: { provider: Provider }) => {
  const { lang, t } = useLang();
  const name = lang === "ar" ? provider.nameAr : provider.nameEn;
  const area = lang === "ar" ? provider.area : provider.areaEn;
  const trade = translations[lang].categories[provider.trade];

  return (
    <Card className="group relative overflow-hidden p-5 hover:shadow-elegant transition-all duration-300 hover:-translate-y-0.5 border-border/70">
      <div className="absolute inset-x-0 top-0 h-1 bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <img src={provider.avatar} alt={name} className="h-16 w-16 rounded-2xl object-cover ring-2 ring-accent-soft" />
          {provider.verified && (
            <span className="absolute -bottom-1 -end-1 h-6 w-6 rounded-full bg-success text-success-foreground grid place-items-center ring-2 ring-card">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-base truncate">{name}</h3>
              <p className="text-sm text-muted-foreground">{trade}</p>
            </div>
            {provider.pro && (
              <Badge className="bg-gold-gradient text-primary border-0 shrink-0">PRO</Badge>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Stars value={provider.rating} />
            <span className="text-sm font-semibold">{provider.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({provider.reviews} {t.common.reviews})
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {area}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {provider.topRated && (
          <Badge variant="secondary" className="gap-1">
            <Trophy className="h-3 w-3 text-gold" />
            {t.common.topRated}
          </Badge>
        )}
        {provider.fastResponse && (
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3 text-gold" />
            {t.common.fastResponse}
          </Badge>
        )}
        {provider.pricePerHour > 0 && (
          <Badge variant="outline">
            {t.common.from} {provider.pricePerHour} {t.common.perHour}
          </Badge>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        <Link to={`/provider/${provider.id}`} className="flex-1">
          <Button className="w-full bg-primary-gradient text-primary-foreground hover:opacity-95">
            {t.common.viewProfile}
          </Button>
        </Link>
        <Link to="/chat">
          <Button variant="outline" size="icon" aria-label={t.common.chat}>
            <MessageCircle className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};