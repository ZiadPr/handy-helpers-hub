import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLang } from "@/contexts/LanguageContext";
import { providers, sampleReviews } from "@/data/mock";
import { Stars } from "@/components/site/Stars";
import { Inbox, DollarSign, Star, TrendingUp, Crown, Award, Eye, Check, X } from "lucide-react";

const me = providers[0];

const ProviderDashboard = () => {
  const { lang } = useLang();

  const stats = [
    { icon: Inbox, lbl: lang === "ar" ? "طلبات جديدة" : "New requests", v: "8", color: "text-primary" },
    { icon: DollarSign, lbl: lang === "ar" ? "إيرادات الشهر" : "Month revenue", v: "12,450", color: "text-success" },
    { icon: Star, lbl: lang === "ar" ? "متوسط التقييم" : "Avg rating", v: me.rating.toFixed(1), color: "text-gold" },
    { icon: TrendingUp, lbl: lang === "ar" ? "ترتيبك" : "Your rank", v: "#3", color: "text-primary" },
  ];

  const newRequests = [
    { id: "REQ-1042", t: lang === "ar" ? "كشف تسريب" : "Leak detection", a: lang === "ar" ? "المعادي" : "Maadi", time: "10 د" },
    { id: "REQ-1041", t: lang === "ar" ? "تركيب سخان" : "Heater install", a: lang === "ar" ? "الزمالك" : "Zamalek", time: "1 س" },
    { id: "REQ-1040", t: lang === "ar" ? "صيانة حمام" : "Bathroom service", a: lang === "ar" ? "مدينة نصر" : "Nasr City", time: "3 س" },
  ];

  return (
    <div className="container py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">{lang === "ar" ? "لوحة المحترف" : "Provider portal"}</h1>
        <p className="text-muted-foreground mt-1">{lang === "ar" ? "شغلك، إيراداتك، وترتيبك في مكان واحد" : "Your jobs, revenue and rank — all in one place"}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.lbl} className="p-5">
            <div className="flex items-center justify-between">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="font-display text-3xl font-bold mt-3">{s.v}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.lbl}</div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="requests">
        <TabsList>
          <TabsTrigger value="requests">{lang === "ar" ? "الطلبات" : "Requests"}</TabsTrigger>
          <TabsTrigger value="profile">{lang === "ar" ? "ملفي" : "Profile"}</TabsTrigger>
          <TabsTrigger value="rewards">{lang === "ar" ? "النقاط والشارات" : "Rewards"}</TabsTrigger>
          <TabsTrigger value="reviews">{lang === "ar" ? "التقييمات" : "Reviews"}</TabsTrigger>
          <TabsTrigger value="analytics">{lang === "ar" ? "التحليلات" : "Analytics"}</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-6 space-y-3">
          {newRequests.map((r) => (
            <Card key={r.id} className="p-4 flex items-center gap-4 hover:shadow-card-soft transition-shadow">
              <div className="h-11 w-11 rounded-xl bg-gold-gradient grid place-items-center text-primary font-bold">
                {r.id.slice(-2)}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{r.t}</div>
                <div className="text-sm text-muted-foreground">{r.a} • {r.time}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-destructive border-destructive/30">
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">
                  <Check className="h-4 w-4 me-1" />
                  {lang === "ar" ? "قبول" : "Accept"}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <Card className="p-6 max-w-2xl space-y-4">
            <div className="flex items-center gap-4">
              <img src={me.avatar} alt="" className="h-20 w-20 rounded-2xl" />
              <div>
                <h3 className="font-display font-bold text-lg">{lang === "ar" ? me.nameAr : me.nameEn}</h3>
                <p className="text-sm text-muted-foreground">{lang === "ar" ? me.bioAr : me.bioEn}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Field lbl={lang === "ar" ? "السعر/ساعة" : "Hourly rate"} val={`${me.pricePerHour} EGP`} />
              <Field lbl={lang === "ar" ? "المنطقة" : "Area"} val={lang === "ar" ? me.area : me.areaEn} />
              <Field lbl={lang === "ar" ? "ساعات العمل" : "Hours"} val="9 - 21" />
              <Field lbl={lang === "ar" ? "أيام الراحة" : "Off days"} val={lang === "ar" ? "الجمعة" : "Friday"} />
            </div>
            <Button className="bg-primary-gradient text-primary-foreground">{lang === "ar" ? "حفظ التعديلات" : "Save changes"}</Button>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="mt-6 grid md:grid-cols-2 gap-4">
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 to-purple-400" />
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-300 to-purple-400 grid place-items-center">
                <Crown className="h-7 w-7 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{lang === "ar" ? "مستواك الحالي" : "Current level"}</div>
                <div className="font-display text-2xl font-bold">{me.level}</div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">{me.points} / 10000</span>
                <span className="font-bold text-primary">{me.points} pts</span>
              </div>
              <Progress value={(me.points / 10000) * 100} />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-gold" />
              <h3 className="font-display font-semibold">{lang === "ar" ? "شاراتك" : "Your badges"}</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-gold-gradient grid place-items-center shadow-gold">
                  <Award className="h-7 w-7 text-primary" />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6 space-y-3">
          {sampleReviews.map((r) => (
            <Card key={r.id} className="p-5">
              <div className="flex justify-between">
                <div className="font-semibold">{lang === "ar" ? r.authorAr : r.authorEn}</div>
                <Stars value={r.rating} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{lang === "ar" ? r.textAr : r.textEn}</p>
              {!r.reply && (
                <Button size="sm" variant="outline" className="mt-3">{lang === "ar" ? "رد" : "Reply"}</Button>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            { lbl: lang === "ar" ? "مشاهدات الملف" : "Profile views", v: "1,245", trend: "+18%" },
            { lbl: lang === "ar" ? "معدل التحويل" : "Conversion", v: "12.4%", trend: "+3%" },
            { lbl: lang === "ar" ? "ساعة الذروة" : "Peak hour", v: "18:00", trend: lang === "ar" ? "مساءً" : "evening" },
          ].map((a) => (
            <Card key={a.lbl} className="p-5">
              <div className="text-sm text-muted-foreground">{a.lbl}</div>
              <div className="font-display text-3xl font-bold mt-2">{a.v}</div>
              <Badge variant="outline" className="mt-2 text-success border-success/30">{a.trend}</Badge>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Field = ({ lbl, val }: { lbl: string; val: string }) => (
  <div className="rounded-xl bg-secondary/50 p-3">
    <div className="text-xs text-muted-foreground">{lbl}</div>
    <div className="font-semibold mt-1">{val}</div>
  </div>
);

export default ProviderDashboard;