import { createContext, useEffect, useState } from 'react';

export const defaultLocale = "cn";
export const locales = ["cn", "en"];
export const LanguageContext = createContext([]);

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("cn");

  useEffect(() => {
    if (!window) {
      return;
    }

    const language = localStorage.getItem('lang') || locale;
    setLocale(language);
  }, [locale]);

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  );
}
