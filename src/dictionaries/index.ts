export const supportedLanguages = ['en', 'zh'] as const;

export const DEFAULT_LANG = 'en';

export type LangCode = typeof supportedLanguages[number];

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  zh: () => import('./zh-CN.json').then((module) => module.default),
}

export const hasLocale = (locale: string): locale is LangCode =>
  locale in dictionaries

export const resolveLocale = (locale: string): LangCode => {
  if (hasLocale(locale)) return locale
  return DEFAULT_LANG
}

export const getDictionary = async (locale: LangCode) => dictionaries[locale]()