import { Link, useParams } from "react-router-dom";
import { providers, sampleReviews, services, galleryImages } from "@/data/mock";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Stars } from "@/components/site/Stars";
import { VerifiedBadge } from "@/components/site/VerifiedBadge";
import { useLang } from "@/contexts/LanguageContext";
import { translations } from "@/i18n/translations";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Trophy, Zap, Crown, Award } from "lucide-react";

const levelColor: Record<string, string> = {
  Bronze: "from-amber-700 to-amber-500",
  Silver: "from-slate-400 to-slate-300",
  Gold: "from-yellow-500 to-amber-400",
  Platinum: "from-cyan-300 to-purple-400",
};

const ProviderProfile = () => {
  const { id } = useParams();
  const { lang, t } = useLang();
  const p = providers.find((x) => x.id === id) ?? providers[0];
  const name = lang === "ar" ? p.nameAr : p.nameEn;
  const area = lang === "ar" ? p.area : p.areaEn;
  const bio = lang === "ar" ? p.bioAr : p.bioEn;
  const trade = translations[lang].categories[p.trade];

  const nextLevel = p.level === "Bronze" ? 500 : p.level === "Silver" ? 2000 : p.level === "Gold" ? 5000 : 10000;

  return (
    <div className="animate-fade-in">
      {/* HEADER */}
      <div className="bg-hero text-primary-foreground">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative">
              <img src={p.avatar} alt={name} className="h-32 w-32 rounded-full object-cover ring-4 ring-gold/30" />
              {p.verified && (
                <div className="absolute -bottom-2 -end-2">
                  <VerifiedBadge provider={p} size="lg" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="font-display text-3xl md:text-4xl font-bold">{name}</h1>
                {p.pro && <Badge className="bg-gold-gradient text-primary border-0">PRO</Badge>}
              </div>
              <p className="text-primary-foreground/80 text-lg">{trade}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Stars value={p.rating} size="md" />
                  <span className="font-semibold">{p.rating}</span>
                  <span className="text-primary-foreground/70">({p.reviews} {t.common.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-primary-foreground/80">
                  <MapPin className="h-4 w-4" /> {area}
                </div>
                <div className="flex items-center gap-1 text-primary-foreground/80">
                  <Clock className="h-4 w-4" /> {p.jobs} {lang === "ar" ? "طلب منفذ" : "jobs done"}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.topRated && <Badge className="bg-primary-foreground/15 text-primary-foreground border-0"><Trophy className="h-3 w-3 me-1 text-gold" /> {t.common.topRated}</Badge>}
                {p.fastResponse && <Badge className="bg-primary-foreground/15 text-primary-foreground border-0"><Zap className="h-3 w-3 me-1 text-gold" /> {t.common.fastResponse}</Badge>}
                {p.verified && <Badge className="bg-primary-foreground/15 text-primary-foreground border-0"><ShieldCheck className="h-3 w-3 me-1" /> {t.common.verified}</Badge>}
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <Link to={`/request/${p.id}`}>
                  <Button className="bg-gold-gradient text-primary border-0 shadow-gold hover:opacity-95">
                    {t.common.orderNow}
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button variant="secondary" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 border-0">
                    <MessageCircle className="h-4 w-4 me-2" /> {t.common.chat}
                  </Button>
                </Link>
                <Button variant="secondary" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 border-0">
                  <Phone className="h-4 w-4 me-2" /> {t.common.call}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10 grid lg:grid-cols-[1fr_320px] gap-8">
        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">{lang === "ar" ? "نظرة عامة" : "Overview"}</TabsTrigger>
            <TabsTrigger value="services">{lang === "ar" ? "الخدمات" : "Services"}</TabsTrigger>
            <TabsTrigger value="gallery">{lang === "ar" ? "المعرض" : "Gallery"}</TabsTrigger>
            <TabsTrigger value="reviews">{lang === "ar" ? "التقييمات" : "Reviews"}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card className="p-6">
              <h3 className="font-display font-semibold mb-3">{lang === "ar" ? "نبذة" : "About"}</h3>
              <p className="text-muted-foreground leading-relaxed">{bio}</p>
            </Card>
            <Card className="p-6">
              <h3 className="font-display font-semibold mb-4">{lang === "ar" ? "ساعات العمل" : "Working hours"}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {(lang === "ar" ? ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"] : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]).map((d, i) => (
                  <div key={i} className="flex justify-between rounded-lg bg-secondary/50 px-3 py-2">
                    <span className="font-medium">{d}</span>
                    <span className="text-muted-foreground">{i === 6 ? "—" : "9-21"}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <Card key={s.id} className="p-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-semibold">{lang === "ar" ? s.titleAr : s.titleEn}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t.common.from} <span className="text-foreground font-bold">{s.price}</span> {lang === "ar" ? "ج.م" : "EGP"}
                    </p>
                  </div>
                  <Link to={`/request/${p.id}`}>
                    <Button size="sm" className="bg-primary-gradient text-primary-foreground">{t.common.orderNow}</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryImages.map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-muted">
                  <img src={src} alt="" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-4">
            <Card className="p-6 grid sm:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="font-display text-5xl font-bold text-primary">{p.rating}</div>
                <Stars value={p.rating} size="lg" />
                <p className="text-sm text-muted-foreground mt-1">{p.reviews} {t.common.reviews}</p>
              </div>
              <div className="space-y-2">
                {[
                  { k: lang === "ar" ? "الجودة" : "Quality", v: 4.9 },
                  { k: lang === "ar" ? "السرعة" : "Speed", v: 4.7 },
                  { k: lang === "ar" ? "السعر" : "Price", v: 4.4 },
                  { k: lang === "ar" ? "الاحترافية" : "Pro", v: 4.8 },
                ].map((a) => (
                  <div key={a.k} className="flex items-center gap-3">
                    <span className="text-sm w-20">{a.k}</span>
                    <Progress value={(a.v / 5) * 100} className="flex-1 h-2" />
                    <span className="text-sm font-semibold w-10 text-end">{a.v}</span>
                  </div>
                ))}
              </div>
            </Card>

            {sampleReviews.map((r) => (
              <Card key={r.id} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent-soft grid place-items-center font-semibold text-primary">
                      {(lang === "ar" ? r.authorAr : r.authorEn).charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{lang === "ar" ? r.authorAr : r.authorEn}</div>
                      <div className="text-xs text-muted-foreground">{lang === "ar" ? r.dateAr : r.dateEn}</div>
                    </div>
                  </div>
                  <Stars value={r.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed">{lang === "ar" ? r.textAr : r.textEn}</p>
                {r.reply && (
                  <div className="mt-3 ms-4 ps-4 border-s-2 border-gold rounded bg-accent-soft/40 p-3 text-sm">
                    <span className="font-semibold text-primary">{lang === "ar" ? "رد المحترف:" : "Pro reply:"} </span>
                    {lang === "ar" ? r.reply.textAr : r.reply.textEn}
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* SIDE: Level + points */}
        <aside className="space-y-4">
          <Card className="p-6 overflow-hidden relative">
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${levelColor[p.level]}`} />
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${levelColor[p.level]} grid place-items-center`}>
                <Crown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{t.common.level}</div>
                <div className="font-display font-bold text-lg">{p.level}</div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{p.points} / {nextLevel}</span>
                <span className="font-semibold text-primary">{p.points} {t.common.points}</span>
              </div>
              <Progress value={(p.points / nextLevel) * 100} />
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-display font-semibold mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 text-gold" />
              {lang === "ar" ? "الشارات" : "Badges"}
            </h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary"><ShieldCheck className="h-3 w-3 me-1 text-success" /> {t.common.verified}</Badge>
              <Badge variant="secondary"><Trophy className="h-3 w-3 me-1 text-gold" /> {t.common.topRated}</Badge>
              <Badge variant="secondary"><Zap className="h-3 w-3 me-1 text-gold" /> {t.common.fastResponse}</Badge>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default ProviderProfile;