import { useContext } from 'react';

import {
  LanguageContext,
  locales,
} from '../contexts/LanguageContext';

export default function useTranslation() {
  const [locale, setLocale] = useContext(LanguageContext);

  return { locale, setLocale, locales };
}
