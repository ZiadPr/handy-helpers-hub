import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/contexts/LanguageContext";
import { Logo } from "@/components/site/Logo";
import { Hammer, Store, User, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const { lang } = useLang();
  const nav = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [role, setRole] = useState<"customer" | "provider" | "shop">("customer");

  const roles = [
    { k: "customer" as const, icon: User, ar: "عميل", en: "Customer", arDesc: "ابحث واطلب خدمات", enDesc: "Search and book services" },
    { k: "provider" as const, icon: Hammer, ar: "صنايعي", en: "Pro", arDesc: "قدّم خدماتك واكسب", enDesc: "Offer your services" },
    { k: "shop" as const, icon: Store, ar: "محل", en: "Shop", arDesc: "اعرض منتجاتك", enDesc: "List your products" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 animate-fade-in">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative [&_*]:text-primary-foreground">
          <Logo />
        </div>
        <div className="relative space-y-6 max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight">
            {lang === "ar" ? "انضم لأكبر شبكة صنايعية وخدمات في المنطقة" : "Join the region's largest network of pros & services"}
          </h2>
          <ul className="space-y-3 text-primary-foreground/80">
            {[
              lang === "ar" ? "12,000+ محترف موثّق" : "12,000+ verified pros",
              lang === "ar" ? "نظام نقاط ومكافآت" : "Points & rewards system",
              lang === "ar" ? "شات وتقييمات حقيقية" : "Real chat and reviews",
            ].map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-gold/20 grid place-items-center"><Check className="h-3.5 w-3.5 text-gold" /></span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-primary-foreground/60">{lang === "ar" ? "© 2025 صنايعي" : "© 2025 Sanaye3i"}</p>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <Card className="w-full max-w-md p-7">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-secondary mb-6">
            <button
              onClick={() => setMode("signin")}
              className={cn("flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
                mode === "signin" ? "bg-card shadow-sm" : "text-muted-foreground")}
            >
              {lang === "ar" ? "تسجيل دخول" : "Sign in"}
            </button>
            <button
              onClick={() => setMode("signup")}
              className={cn("flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
                mode === "signup" ? "bg-card shadow-sm" : "text-muted-foreground")}
            >
              {lang === "ar" ? "حساب جديد" : "Sign up"}
            </button>
          </div>

          {mode === "signup" && (
            <div className="mb-5">
              <Label className="mb-2 block">{lang === "ar" ? "نوع الحساب" : "Account type"}</Label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.k}
                    onClick={() => setRole(r.k)}
                    className={cn(
                      "p-3 rounded-xl border-2 text-center transition-all",
                      role === r.k ? "border-primary bg-accent-soft" : "border-border hover:border-primary/40"
                    )}
                  >
                    <r.icon className="h-5 w-5 mx-auto text-primary" />
                    <div className="text-xs font-semibold mt-1">{lang === "ar" ? r.ar : r.en}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast({
                title: lang === "ar" ? "تم بنجاح ✨" : "Success ✨",
                description: lang === "ar" ? "أهلاً بيك في صنايعي" : "Welcome to Sanaye3i",
              });
              nav(role === "provider" ? "/provider" : "/dashboard");
            }}
            className="space-y-4"
          >
            {mode === "signup" && (
              <div>
                <Label>{lang === "ar" ? "الاسم" : "Name"}</Label>
                <Input className="mt-1.5" required />
              </div>
            )}
            <div>
              <Label>{lang === "ar" ? "الموبايل أو البريد" : "Phone or email"}</Label>
              <Input className="mt-1.5" required />
            </div>
            <div>
              <Label>{lang === "ar" ? "كلمة المرور" : "Password"}</Label>
              <Input type="password" className="mt-1.5" required />
            </div>
            <Button type="submit" className="w-full bg-primary-gradient text-primary-foreground shadow-elegant">
              {mode === "signin" ? (lang === "ar" ? "دخول" : "Sign in") : (lang === "ar" ? "إنشاء الحساب" : "Create account")}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-5">
            {lang === "ar" ? "بإنشاء الحساب فأنت توافق على " : "By signing up you agree to our "}
            <Link to="#" className="text-primary hover:underline">{lang === "ar" ? "الشروط والأحكام" : "Terms"}</Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Auth;