import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { providers, categories, areas } from "@/data/mock";
import { ProviderCard } from "@/components/site/ProviderCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LanguageContext";
import { Search as SearchIcon, SlidersHorizontal, ShieldCheck } from "lucide-react";

const Search = () => {
  const { t, lang } = useLang();
  const [params] = useSearchParams();
  const [cat, setCat] = useState<string>(params.get("cat") ?? "all");
  const [area, setArea] = useState<string>("all");
  const [verified, setVerified] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<"rating" | "price" | "popular">("rating");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let arr = providers.filter((p) => {
      if (cat !== "all" && p.trade !== cat) return false;
      if (area !== "all" && p.area !== area && p.areaEn !== area) return false;
      if (verified && !p.verified) return false;
      if (minRating && p.rating < minRating) return false;
      const name = (lang === "ar" ? p.nameAr : p.nameEn).toLowerCase();
      if (q && !name.includes(q.toLowerCase())) return false;
      return true;
    });
    if (sort === "rating") arr = arr.sort((a, b) => b.rating - a.rating);
    if (sort === "price") arr = arr.sort((a, b) => a.pricePerHour - b.pricePerHour);
    if (sort === "popular") arr = arr.sort((a, b) => b.jobs - a.jobs);
    return arr;
  }, [cat, area, verified, minRating, sort, q, lang]);

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="flex-1 relative">
          <SearchIcon className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.hero.searchPlaceholder}
            className="ps-10 h-12"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="h-12 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="rating">{lang === "ar" ? "الأعلى تقييماً" : "Top rated"}</option>
          <option value="price">{lang === "ar" ? "الأرخص" : "Lowest price"}</option>
          <option value="popular">{lang === "ar" ? "الأكثر طلباً" : "Most popular"}</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="h-4 w-4" />
              <h3 className="font-display font-semibold">{lang === "ar" ? "الفلاتر" : "Filters"}</h3>
            </div>

            <FilterGroup label={lang === "ar" ? "التصنيف" : "Category"}>
              <ChipBtn active={cat === "all"} onClick={() => setCat("all")}>
                {lang === "ar" ? "الكل" : "All"}
              </ChipBtn>
              {categories.map((c) => (
                <ChipBtn key={c.key} active={cat === c.key} onClick={() => setCat(c.key)}>
                  {t.categories[c.key]}
                </ChipBtn>
              ))}
            </FilterGroup>

            <FilterGroup label={lang === "ar" ? "المنطقة" : "Area"}>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="all">{lang === "ar" ? "كل المناطق" : "All areas"}</option>
                {areas.slice(1).map((a, i) => (
                  <option key={i} value={lang === "ar" ? a.ar : a.en}>
                    {lang === "ar" ? a.ar : a.en}
                  </option>
                ))}
              </select>
            </FilterGroup>

            <FilterGroup label={lang === "ar" ? "أقل تقييم" : "Min rating"}>
              <div className="flex gap-1">
                {[0, 3, 4, 4.5].map((r) => (
                  <ChipBtn key={r} active={minRating === r} onClick={() => setMinRating(r)}>
                    {r === 0 ? (lang === "ar" ? "أي" : "Any") : `${r}+★`}
                  </ChipBtn>
                ))}
              </div>
            </FilterGroup>

            <label className="flex items-center gap-2 mt-4 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={verified}
                onChange={(e) => setVerified(e.target.checked)}
                className="accent-primary"
              />
              <ShieldCheck className="h-4 w-4 text-success" />
              {lang === "ar" ? "موثّق فقط" : "Verified only"}
            </label>
          </Card>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted-foreground">
              {list.length} {lang === "ar" ? "نتيجة" : "results"}
            </p>
            <Badge variant="outline">{t.categories[cat as keyof typeof t.categories] ?? (lang === "ar" ? "الكل" : "All")}</Badge>
          </div>
          {list.length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">
              {lang === "ar" ? "لا توجد نتائج مطابقة" : "No matching results"}
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {list.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{label}</h4>
    <div className="flex flex-wrap gap-1.5">{children}</div>
  </div>
);

const ChipBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <Button
    variant={active ? "default" : "outline"}
    size="sm"
    onClick={onClick}
    className={active ? "bg-primary text-primary-foreground" : ""}
  >
    {children}
  </Button>
);

export default Search;