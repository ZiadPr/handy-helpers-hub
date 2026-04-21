import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";
import { Languages } from "lucide-react";

export const LanguageToggle = () => {
  const { lang, toggle } = useLang();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      className="gap-1.5 font-medium"
      aria-label="Toggle language"
    >
      <Languages className="h-4 w-4" />
      <span>{lang === "ar" ? "EN" : "ع"}</span>
    </Button>
  );
};