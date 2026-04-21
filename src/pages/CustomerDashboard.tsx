import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/contexts/LanguageContext";
import { providers } from "@/data/mock";
import { ProviderCard } from "@/components/site/ProviderCard";
import { Stars } from "@/components/site/Stars";
import { Coins, Gift, Users, Star, Heart, Settings, Package, Clock, CheckCircle2, XCircle } from "lucide-react";

const points = 340;
const nextReward = 500;

const CustomerDashboard = () => {
  const { lang } = useLang();

  const orders = [
    { id: "REQ-1024", trade: "plumber", status: "in", date: "2026-04-18", price: 350 },
    { id: "REQ-1019", trade: "ac", status: "done", date: "2026-04-10", price: 540 },
    { id: "REQ-1003", trade: "cleaning", status: "done", date: "2026-03-22", price: 220 },
    { id: "REQ-0998", trade: "painter", status: "cancel", date: "2026-03-12", price: 0 },
  ];

  return (
    <div className="container py-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">{lang === "ar" ? "أهلاً، أحمد 👋" : "Hi Ahmed 👋"}</h1>
          <p className="text-muted-foreground mt-1">{lang === "ar" ? "هتعمل إيه النهارده؟" : "What will you book today?"}</p>
        </div>
        <Card className="p-4 bg-primary-gradient text-primary-foreground border-0 min-w-[280px]">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gold-gradient grid place-items-center">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-xs opacity-80">{lang === "ar" ? "نقاط الولاء" : "Loyalty points"}</div>
              <div className="font-display text-2xl font-bold">{points}</div>
            </div>
          </div>
          <Progress value={(points / nextReward) * 100} className="mt-3 h-1.5 bg-primary-foreground/20" />
          <p className="text-xs mt-2 opacity-80">{nextReward - points} {lang === "ar" ? "نقطة للمكافأة القادمة" : "pts to next reward"}</p>
        </Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders"><Package className="h-4 w-4 me-1" /> {lang === "ar" ? "طلباتي" : "Orders"}</TabsTrigger>
          <TabsTrigger value="points"><Coins className="h-4 w-4 me-1" /> {lang === "ar" ? "النقاط" : "Points"}</TabsTrigger>
          <TabsTrigger value="favs"><Heart className="h-4 w-4 me-1" /> {lang === "ar" ? "المفضلة" : "Favorites"}</TabsTrigger>
          <TabsTrigger value="reviews"><Star className="h-4 w-4 me-1" /> {lang === "ar" ? "تقييماتي" : "Reviews"}</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="h-4 w-4 me-1" /> {lang === "ar" ? "الإعدادات" : "Settings"}</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6 space-y-3">
          {orders.map((o) => {
            const Icon = o.status === "done" ? CheckCircle2 : o.status === "cancel" ? XCircle : Clock;
            const cls = o.status === "done" ? "text-success" : o.status === "cancel" ? "text-destructive" : "text-gold";
            const lbl = o.status === "done" ? (lang === "ar" ? "مكتمل" : "Completed") : o.status === "cancel" ? (lang === "ar" ? "ملغي" : "Cancelled") : (lang === "ar" ? "جاري" : "In progress");
            return (
              <Card key={o.id} className="p-4 flex items-center gap-4">
                <div className={`h-11 w-11 rounded-xl bg-secondary grid place-items-center ${cls}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{o.id}</div>
                  <div className="text-sm text-muted-foreground">{o.date}</div>
                </div>
                <div className="text-end">
                  <Badge variant="outline" className={cls}>{lbl}</Badge>
                  {o.price > 0 && <div className="text-sm font-semibold mt-1">{o.price} {lang === "ar" ? "ج.م" : "EGP"}</div>}
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="points" className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            { icon: Package, t: lang === "ar" ? "كل طلب" : "Each order", v: "+10" },
            { icon: Star, t: lang === "ar" ? "كل تقييم" : "Each review", v: "+5" },
            { icon: Users, t: lang === "ar" ? "دعوة صديق" : "Invite friend", v: "+20" },
          ].map((c, i) => (
            <Card key={i} className="p-5">
              <c.icon className="h-6 w-6 text-gold" />
              <div className="font-display text-2xl font-bold mt-3">{c.v}</div>
              <div className="text-sm text-muted-foreground">{c.t}</div>
            </Card>
          ))}
          <Card className="p-6 md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="h-5 w-5 text-gold" />
              <h3 className="font-display font-semibold">{lang === "ar" ? "استبدل نقاطك" : "Redeem points"}</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[100, 250, 500].map((pts) => (
                <Card key={pts} className="p-4 text-center hover:shadow-elegant transition-shadow">
                  <div className="font-display text-2xl font-bold text-primary">{pts}</div>
                  <div className="text-sm text-muted-foreground">{lang === "ar" ? "نقطة =" : "pts ="} {pts / 10} {lang === "ar" ? "ج.م خصم" : "EGP off"}</div>
                  <Button size="sm" className="mt-3 w-full bg-primary-gradient text-primary-foreground" disabled={points < pts}>
                    {lang === "ar" ? "استبدل" : "Redeem"}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="favs" className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {providers.slice(0, 3).map((p) => <ProviderCard key={p.id} provider={p} />)}
        </TabsContent>

        <TabsContent value="reviews" className="mt-6 space-y-3">
          {[1, 2].map((i) => (
            <Card key={i} className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{lang === "ar" ? providers[i].nameAr : providers[i].nameEn}</div>
                  <Stars value={5} />
                </div>
                <span className="text-xs text-muted-foreground">2026-04-{10 + i}</span>
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                {lang === "ar" ? "خدمة محترمة جداً وفي الميعاد." : "Very respectable service and on time."}
              </p>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="p-6 max-w-xl">
            <h3 className="font-display font-semibold mb-4">{lang === "ar" ? "بيانات الحساب" : "Account info"}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">{lang === "ar" ? "الاسم" : "Name"}</span><span>Ahmed Mohamed</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{lang === "ar" ? "الموبايل" : "Phone"}</span><span dir="ltr">+20 100 000 0000</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{lang === "ar" ? "البريد" : "Email"}</span><span>ahmed@example.com</span></div>
            </div>
            <Button variant="outline" className="mt-4">{lang === "ar" ? "تعديل" : "Edit"}</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDashboard;