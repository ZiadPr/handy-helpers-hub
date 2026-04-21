import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LanguageContext";
import { categories, providers, areas } from "@/data/mock";
import { ProviderCard } from "@/components/site/ProviderCard";
import { Search, MapPin, ArrowLeft, ArrowRight, Wrench, Store, Home as HomeIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { t, lang, dir } = useLang();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const topRated = [...providers].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const featured = providers.filter((p) => p.pro || p.topRated).slice(0, 4);

  const mainGateways = [
    { icon: Wrench, key: "pros" as const, to: "/search?type=pro", grad: "from-primary to-primary-glow" },
    { icon: Store, key: "shops" as const, to: "/search?type=shop", grad: "from-gold to-amber-700" },
    { icon: HomeIcon, key: "home" as const, to: "/search?type=home", grad: "from-emerald-700 to-emerald-500" },
  ];

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-gold/20 text-gold border-gold/30 hover:bg-gold/20">
              <Sparkles className="h-3 w-3 me-1" />
              {t.hero.eyebrow}
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-balance">
              {t.hero.title}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto text-balance">
              {t.hero.subtitle}
            </p>

            <Card className="p-2 md:p-3 mt-8 max-w-2xl mx-auto bg-card/95 backdrop-blur shadow-elegant">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={t.hero.searchPlaceholder}
                    className="border-0 shadow-none focus-visible:ring-0 h-11 px-0"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 md:border-s md:border-border">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <select className="bg-transparent text-sm h-11 outline-none w-full text-foreground">
                    {areas.map((a, i) => (
                      <option key={i}>{lang === "ar" ? a.ar : a.en}</option>
                    ))}
                  </select>
                </div>
                <Button
                  className="bg-primary-gradient text-primary-foreground h-11 px-6 shadow-gold"
                  onClick={() => nav("/search")}
                >
                  {t.hero.searchBtn}
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-8">
              {[
                { v: "12K+", k: t.hero.stats.pros },
                { v: "85K+", k: t.hero.stats.orders },
                { v: "4.8★", k: t.hero.stats.rating },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-gold">{s.v}</div>
                  <div className="text-xs md:text-sm text-primary-foreground/70 mt-1">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORIES STRIP */}
      <section className="container -mt-8 relative z-10">
        <Card className="p-4 md:p-6 shadow-elegant">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-3">
            {categories.map(({ key, icon: Icon, color }) => (
              <Link
                key={key}
                to={`/search?cat=${key}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-accent-soft transition-colors group"
              >
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} grid place-items-center group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-center leading-tight">
                  {t.categories[key]}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      </section>

      {/* MAIN GATEWAYS — equal cards */}
      <section className="container py-20">
        <SectionHeader title={t.sections.mainTitle} sub={t.sections.mainSub} />
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {mainGateways.map(({ icon: Icon, key, to, grad }) => (
            <Link key={key} to={to}>
              <Card className="group relative overflow-hidden p-8 h-full hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute -end-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${grad} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${grad} grid place-items-center shadow-gold`}>
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold mt-6">{t.main[key]}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t.main[`${key}Desc` as const]}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
                  {t.main.explore} <Arrow className="h-4 w-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* TOP RATED */}
      <section className="container py-12">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader title={t.sections.topRatedTitle} sub={t.sections.topRatedSub} align="start" />
          <Link to="/search" className="text-sm text-primary font-semibold hover:underline shrink-0">
            {t.main.explore} <Arrow className="inline h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topRated.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container py-12">
        <SectionHeader title={t.sections.featuredTitle} sub="" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {featured.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-secondary/40 py-20 mt-12">
        <div className="container">
          <SectionHeader title={t.sections.howTitle} sub={t.sections.howSub} />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {t.how.map((step, i) => (
              <Card key={i} className="p-8 text-center relative overflow-hidden">
                <div className="absolute top-4 end-4 font-display text-7xl font-bold text-gold/15 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="relative">
                  <div className="h-14 w-14 mx-auto rounded-2xl bg-gold-gradient grid place-items-center shadow-gold">
                    <span className="font-display text-xl font-bold text-primary">{i + 1}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mt-5">{step.t}</h3>
                  <p className="text-muted-foreground mt-2">{step.d}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const SectionHeader = ({ title, sub, align = "center" }: { title: string; sub: string; align?: "center" | "start" }) => (
  <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
    <h2 className="font-display text-3xl md:text-4xl font-bold text-balance">{title}</h2>
    {sub && <p className="text-muted-foreground mt-3 text-balance">{sub}</p>}
  </div>
);

export default Index;
