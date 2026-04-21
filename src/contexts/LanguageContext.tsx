import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang, type Translations } from "@/i18n/translations";

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Translations;
  toggle: () => void;
  setLang: (l: Lang) => void;
};

const defaultCtx: Ctx = {
  lang: "ar",
  dir: "rtl",
  t: translations.ar,
  toggle: () => {},
  setLang: () => {},
};

const LanguageContext = createContext<Ctx>(defaultCtx);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    return stored ?? "ar";
  });

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("lang", lang);
  }, [lang, dir]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir,
      t: translations[lang],
      toggle: () => setLangState((p) => (p === "ar" ? "en" : "ar")),
      setLang: setLangState,
    }),
    [lang, dir],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => useContext(LanguageContext);