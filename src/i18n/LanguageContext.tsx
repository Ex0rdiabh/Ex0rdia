import React from 'react';
import { translations, type Language } from './translations';

type Copy = (typeof translations)['en'];

type LanguageContextValue = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  toggleLanguage: () => void;
  isArabic: boolean;
  copy: Copy;
};

const STORAGE_KEY = 'exordia-language';

const LanguageContext = React.createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    return savedLanguage === 'ar' ? 'ar' : 'en';
  });

  const isArabic = language === 'ar';

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.body.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic, language]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'en' ? 'ar' : 'en'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isArabic,
        copy: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
