import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LanguageContext";
import { providers, services } from "@/data/mock";
import { translations } from "@/i18n/translations";
import { Check, ImagePlus, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const steps = ["service", "details", "schedule", "review"] as const;

const ServiceRequest = () => {
  const { id } = useParams();
  const { lang, t, dir } = useLang();
  const nav = useNavigate();
  const { toast } = useToast();
  const provider = providers.find((p) => p.id === id) ?? providers[0];

  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(services[0].id);
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [done, setDone] = useState(false);

  const Prev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const Next = dir === "rtl" ? ChevronLeft : ChevronRight;

  const labels = {
    service: lang === "ar" ? "اختر الخدمة" : "Pick service",
    details: lang === "ar" ? "وصف المشكلة" : "Describe issue",
    schedule: lang === "ar" ? "الموعد والعنوان" : "Schedule & address",
    review: lang === "ar" ? "مراجعة وتأكيد" : "Review & confirm",
  };

  const submit = () => {
    setDone(true);
    toast({
      title: lang === "ar" ? "تم إرسال الطلب ✨" : "Request sent ✨",
      description: lang === "ar" ? "هتوصلك إشعار لما المحترف يقبل الطلب" : "You'll be notified when the pro accepts.",
    });
  };

  if (done) {
    const stages = [
      { k: "Pending", ar: "قيد الانتظار", en: "Pending" },
      { k: "Accepted", ar: "تم القبول", en: "Accepted" },
      { k: "InProgress", ar: "قيد التنفيذ", en: "In progress" },
      { k: "Completed", ar: "مكتمل", en: "Completed" },
    ];
    return (
      <div className="container py-16 max-w-2xl animate-fade-in">
        <Card className="p-8 text-center">
          <div className="h-16 w-16 mx-auto rounded-full bg-success text-success-foreground grid place-items-center">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="font-display text-2xl font-bold mt-5">
            {lang === "ar" ? "طلبك تم استلامه" : "Your request was received"}
          </h2>
          <p className="text-muted-foreground mt-2">#REQ-{Math.floor(Math.random() * 10000)}</p>

          <div className="mt-8 flex items-center justify-between relative">
            <div className="absolute top-5 inset-x-6 h-0.5 bg-border" />
            <div className="absolute top-5 start-6 h-0.5 bg-gold" style={{ width: "10%" }} />
            {stages.map((s, i) => (
              <div key={s.k} className="relative flex flex-col items-center gap-2 z-10">
                <div className={cn(
                  "h-10 w-10 rounded-full grid place-items-center text-sm font-bold",
                  i === 0 ? "bg-gold text-primary" : "bg-secondary text-muted-foreground"
                )}>
                  {i + 1}
                </div>
                <span className="text-xs">{lang === "ar" ? s.ar : s.en}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-8 justify-center">
            <Button variant="outline" onClick={() => nav("/dashboard")}>{lang === "ar" ? "طلباتي" : "My requests"}</Button>
            <Button className="bg-primary-gradient text-primary-foreground" onClick={() => nav("/chat")}>
              {t.common.chat}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10 max-w-3xl animate-fade-in">
      <Card className="p-3 mb-6">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={cn(
                "h-9 w-9 rounded-full grid place-items-center text-sm font-bold shrink-0",
                i <= step ? "bg-primary-gradient text-primary-foreground" : "bg-secondary text-muted-foreground"
              )}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={cn("flex-1 h-0.5 mx-2", i < step ? "bg-primary" : "bg-border")} />
              )}
            </div>
          ))}
        </div>
        <h2 className="font-display font-semibold text-center mt-3">{labels[steps[step]]}</h2>
      </Card>

      <Card className="p-6">
        {step === 0 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setServiceId(s.id)}
                className={cn(
                  "text-start p-4 rounded-xl border-2 transition-all",
                  serviceId === s.id ? "border-primary bg-accent-soft" : "border-border hover:border-primary/40"
                )}
              >
                <div className="font-display font-semibold">{lang === "ar" ? s.titleAr : s.titleEn}</div>
                <div className="text-sm text-muted-foreground mt-1">{t.common.from} {s.price} {lang === "ar" ? "ج.م" : "EGP"}</div>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label>{lang === "ar" ? "اوصف المشكلة بالتفصيل" : "Describe the issue"}</Label>
              <Textarea
                rows={5}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={lang === "ar" ? "مثال: في تسريب تحت الحوض من ساعتين..." : "e.g. There's a leak under the sink..."}
                className="mt-2"
              />
            </div>
            <div>
              <Label>{lang === "ar" ? "صور (اختياري)" : "Photos (optional)"}</Label>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className="aspect-square border-2 border-dashed border-border rounded-xl grid place-items-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <ImagePlus className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {lang === "ar" ? "الموعد المفضل" : "Preferred date"}</Label>
              <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2" />
            </div>
            <div>
              <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {lang === "ar" ? "العنوان" : "Address"}</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder={lang === "ar" ? "العنوان بالتفصيل" : "Full address"} className="mt-2" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
              <img src={provider.avatar} alt="" className="h-12 w-12 rounded-xl" />
              <div>
                <div className="font-semibold">{lang === "ar" ? provider.nameAr : provider.nameEn}</div>
                <div className="text-sm text-muted-foreground">{translations[lang].categories[provider.trade]}</div>
              </div>
            </div>
            <Row label={lang === "ar" ? "الخدمة" : "Service"} value={(() => { const s = services.find(x => x.id === serviceId)!; return lang === "ar" ? s.titleAr : s.titleEn; })()} />
            <Row label={lang === "ar" ? "الوصف" : "Description"} value={desc || "—"} />
            <Row label={lang === "ar" ? "الموعد" : "Date"} value={date || "—"} />
            <Row label={lang === "ar" ? "العنوان" : "Address"} value={address || "—"} />
            <Row label={lang === "ar" ? "السعر التقديري" : "Estimated price"} value={<Badge className="bg-gold-gradient text-primary border-0">{services.find(x => x.id === serviceId)!.price} {lang === "ar" ? "ج.م" : "EGP"}</Badge>} />
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            <Prev className="h-4 w-4 me-1" /> {t.common.back}
          </Button>
          {step < steps.length - 1 ? (
            <Button className="bg-primary-gradient text-primary-foreground" onClick={() => setStep((s) => s + 1)}>
              {t.common.next} <Next className="h-4 w-4 ms-1" />
            </Button>
          ) : (
            <Button className="bg-gold-gradient text-primary border-0 shadow-gold" onClick={submit}>
              {t.common.submit}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="font-medium text-end">{value}</span>
  </div>
);

export default ServiceRequest;