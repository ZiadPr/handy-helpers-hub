import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stars } from "@/components/site/Stars";
import { VerifiedBadge } from "@/components/site/VerifiedBadge";
import { useLang } from "@/contexts/LanguageContext";
import { providers, categories } from "@/data/mock";
import { translations } from "@/i18n/translations";
import { Crown, Trophy, Medal, Award, MapPin } from "lucide-react";

const podiumStyle = [
  { rank: 1, glow: "shadow-gold", ring: "ring-gold", icon: Crown, scale: "md:scale-110 md:-translate-y-4" },
  { rank: 2, glow: "shadow-elegant", ring: "ring-muted-foreground/30", icon: Trophy, scale: "" },
  { rank: 3, glow: "shadow-elegant", ring: "ring-amber-700/40", icon: Medal, scale: "" },
];

const Leaderboard = () => {
  const { lang, t } = useLang();
  const [cat, setCat] = useState<"all" | string>("all");

  const ranked = useMemo(() => {
    const list = cat === "all" ? providers : providers.filter((p) => p.trade === cat);
    return [...list].sort((a, b) => b.points - a.points);
  }, [cat]);

  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  return (
    <div className="animate-fade-in">
      <section className="bg-hero text-primary-foreground">
        <div className="container py-14 text-center">
          <Badge className="bg-gold/20 text-gold border-gold/30 hover:bg-gold/20">
            <Award className="h-3 w-3 me-1" /> {t.sections.leaderboardTitle}
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-4">
            {t.sections.leaderboardTitle}
          </h1>
          <p className="text-primary-foreground/80 mt-3 max-w-xl mx-auto">
            {t.sections.leaderboardSub}
          </p>
        </div>
      </section>

      <div className="container py-10">
        <Tabs value={cat} onValueChange={setCat} className="mb-10">
          <TabsList className="w-full justify-start overflow-x-auto h-auto flex-wrap">
            <TabsTrigger value="all">{lang === "ar" ? "الكل" : "All"}</TabsTrigger>
            {categories.map((c) => (
              <TabsTrigger key={c.key} value={c.key}>
                {translations[lang].categories[c.key]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* PODIUM */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12 items-end">
          {[top3[1], top3[0], top3[2]].filter(Boolean).map((p, idx) => {
            const realRank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
            const meta = podiumStyle[realRank - 1];
            const Icon = meta.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={meta.scale}
              >
                <Card className={`p-6 text-center relative overflow-hidden ${meta.glow}`}>
                  <div className={`absolute inset-x-0 top-0 h-1 ${realRank === 1 ? "bg-gold-gradient" : "bg-primary-gradient"}`} />
                  <div className="absolute top-3 end-3">
                    <div className={`h-9 w-9 rounded-full grid place-items-center ${realRank === 1 ? "bg-gold-gradient" : "bg-secondary"}`}>
                      <Icon className={`h-4 w-4 ${realRank === 1 ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                  </div>
                  <div className="relative inline-block">
                    <img
                      src={p.avatar}
                      alt={lang === "ar" ? p.nameAr : p.nameEn}
                      className={`h-24 w-24 rounded-full object-cover ring-4 ${meta.ring} mx-auto`}
                    />
                    {p.verified && (
                      <div className="absolute -bottom-1 -end-1">
                        <VerifiedBadge provider={p} size="sm" />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 font-display font-bold text-lg">
                    {lang === "ar" ? p.nameAr : p.nameEn}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {translations[lang].categories[p.trade]}
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1">
                    <Stars value={p.rating} />
                    <span className="text-sm font-semibold ms-1">{p.rating}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-soft">
                    <Award className="h-3.5 w-3.5 text-gold" />
                    <span className="font-display font-bold text-primary">{p.points.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">{t.common.points}</span>
                  </div>
                  <Link to={`/provider/${p.id}`} className="block mt-4">
                    <Button size="sm" variant="outline" className="w-full">{t.common.viewProfile}</Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* TABLE */}
        <Card className="overflow-hidden">
          <div className="divide-y divide-border">
            {rest.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 p-4 hover:bg-accent-soft/40 transition-colors"
              >
                <div className="w-10 text-center font-display font-bold text-muted-foreground">
                  #{i + 4}
                </div>
                <div className="relative shrink-0">
                  <img src={p.avatar} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-accent-soft" />
                  {p.verified && (
                    <div className="absolute -bottom-1 -end-1">
                      <VerifiedBadge provider={p} size="sm" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link to={`/provider/${p.id}`} className="font-semibold truncate hover:text-primary">
                      {lang === "ar" ? p.nameAr : p.nameEn}
                    </Link>
                    {p.pro && <Badge className="bg-gold-gradient text-primary border-0 text-[10px]">PRO</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-3 mt-0.5">
                    <span>{translations[lang].categories[p.trade]}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{lang === "ar" ? p.area : p.areaEn}</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Stars value={p.rating} />
                  <span className="text-sm font-semibold ms-1">{p.rating}</span>
                </div>
                <div className="text-end">
                  <div className="font-display font-bold text-primary">{p.points.toLocaleString()}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{p.level}</div>
                </div>
              </motion.div>
            ))}
            {rest.length === 0 && (
              <div className="p-10 text-center text-muted-foreground">
                {lang === "ar" ? "لا يوجد محترفون في هذا التخصص بعد" : "No pros in this category yet"}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
