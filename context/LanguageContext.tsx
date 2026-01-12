import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string; // Simple static translator for UI labels
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const UI_LABELS: Record<string, Record<Language, string>> = {
  'nav.home': { kz: 'Басты бет', ru: 'Главная', en: 'Home' },
  'nav.about': { kz: 'Біз туралы', ru: 'О нас', en: 'About Us' },
  'nav.prices': { kz: 'Бағалар', ru: 'Цены', en: 'Prices' },
  'nav.vacancies': { kz: 'Бос орындар', ru: 'Вакансии', en: 'Vacancies' },
  'nav.documents': { kz: 'Құжаттар', ru: 'Документы', en: 'Documents' },
  'nav.licenses': { kz: 'Лицензиялар', ru: 'Лицензии', en: 'Licenses' },
  'nav.contacts': { kz: 'Байланыс', ru: 'Контакты', en: 'Contacts' },
  'btn.readMore': { kz: 'Толығырақ', ru: 'Подробнее', en: 'Read More' },
  'btn.download': { kz: 'Жүктеп алу', ru: 'Скачать', en: 'Download' },
  'footer.rights': { kz: 'Барлық құқықтар қорғалған', ru: 'Все права защищены', en: 'All rights reserved' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);

  const t = (key: string): string => {
    return UI_LABELS[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};