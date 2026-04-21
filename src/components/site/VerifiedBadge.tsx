import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ShieldCheck, Calendar, BadgeCheck, Phone, FileCheck2, IdCard } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import type { Provider } from "@/data/mock";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, { box: string; icon: string; ring: string }> = {
  sm: { box: "h-6 w-6", icon: "h-3.5 w-3.5", ring: "ring-2" },
  md: { box: "h-8 w-8", icon: "h-4 w-4", ring: "ring-2" },
  lg: { box: "h-10 w-10", icon: "h-5 w-5", ring: "ring-4" },
};

const formatDate = (iso: string | undefined, lang: "ar" | "en") => {
  if (!iso) return "—";
  const d = new Date(iso);
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

export const VerifiedBadge = ({
  provider,
  size = "sm",
  className,
}: {
  provider: Provider;
  size?: Size;
  className?: string;
}) => {
  const { lang, t } = useLang();
  const v = (t as any).verification;
  const s = sizeMap[size];

  const Row = ({ icon: Icon, label, value, ok }: { icon: any; label: string; value: string; ok?: boolean }) => (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-2 text-sm">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-foreground/80">{label}</span>
      </div>
      <span className={cn("text-sm font-medium", ok ? "text-success" : "text-muted-foreground")}>{value}</span>
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={v.title}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "inline-grid place-items-center rounded-full bg-success text-success-foreground",
            "ring-card hover:scale-110 transition-transform cursor-pointer shadow-sm",
            s.box,
            s.ring,
            className,
          )}
        >
          <ShieldCheck className={s.icon} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 overflow-hidden"
        align={lang === "ar" ? "end" : "start"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary-gradient text-primary-foreground p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-success grid place-items-center ring-4 ring-primary-foreground/20">
            <BadgeCheck className="h-5 w-5 text-success-foreground" />
          </div>
          <div>
            <div className="font-display font-semibold">{v.verifiedBadge}</div>
            <div className="text-xs opacity-80">{lang === "ar" ? provider.nameAr : provider.nameEn}</div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-3">{v.desc}</p>
          <Row icon={Calendar} label={v.joinedAt} value={formatDate(provider.joinedAt, lang)} />
          <Row
            icon={ShieldCheck}
            label={v.verifiedSince}
            value={provider.verifiedAt ? formatDate(provider.verifiedAt, lang) : v.no}
            ok={!!provider.verifiedAt}
          />
          <Row
            icon={IdCard}
            label={v.idVerified}
            value={provider.idVerified ? v.yes : v.no}
            ok={!!provider.idVerified}
          />
          <Row
            icon={Phone}
            label={v.phoneVerified}
            value={provider.phoneVerified ? v.yes : v.no}
            ok={!!provider.phoneVerified}
          />
          <Row
            icon={FileCheck2}
            label={v.licenseVerified}
            value={provider.licenseVerified ? v.yes : v.no}
            ok={!!provider.licenseVerified}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
