import { DEFAULT_LANG } from '@/const/locale';
import resources from './default';

export const locales = [
  'ar',
  'bg-BG',
  'de-DE',
  'en-US',
  'es-ES',
  'fr-FR',
  'ja-JP',
  'ko-KR',
  'pt-BR',
  'ru-RU',
  'tr-TR',
  'zh-CN',
  'zh-TW',
  'vi-VN',
  'fa-IR',
  'sw-KE',  // Swahili (Kenya)
  'lg-UG',  // Luganda (Uganda)
  'zu-ZA',  // Zulu (South Africa)
  'yo-NG',  // Yoruba (Nigeria)
  'am-ET',  // Amharic (Ethiopia)
  'ha-NG',  // Hausa (Nigeria)
  'ig-NG',  // Igbo (Nigeria)
  'af-ZA',  // Afrikaans (South Africa)
  'sn-ZW',  // Shona (Zimbabwe)
  'st-ZA',  // Sesotho (South Africa)
  'ti-ER',  // Tigrinya (Eritrea)
  'ber-MA', // Berber (Morocco)
  'wo-SN',  // Wolof (Senegal)
] as const;

export type DefaultResources = typeof resources;
export type NS = keyof DefaultResources;
export type Locales = (typeof locales)[number];

export const normalizeLocale = (locale?: string): string => {
  if (!locale) return DEFAULT_LANG;

  if (locale.startsWith('ar')) return 'ar';
  if (locale.startsWith('fa')) return 'fa-IR';
  if (locale.startsWith('cn')) return 'zh-CN';

  for (const l of locales) {
    if (l.startsWith(locale)) {
      return l;
    }
  }

  return DEFAULT_LANG;
};

type LocaleOptions = {
  label: string;
  value: Locales;
}[];

export const localeOptions: LocaleOptions = [
  {
    label: 'English',
    value: 'en-US',
  },
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: '繁體中文',
    value: 'zh-TW',
  },
  {
    label: '日本語',
    value: 'ja-JP',
  },
  {
    label: '한국어',
    value: 'ko-KR',
  },
  {
    label: 'Deutsch',
    value: 'de-DE',
  },
  {
    label: 'Español',
    value: 'es-ES',
  },
  {
    label: 'العربية',
    value: 'ar',
  },
  {
    label: 'Français',
    value: 'fr-FR',
  },
  {
    label: 'Português',
    value: 'pt-BR',
  },
  {
    label: 'Русский',
    value: 'ru-RU',
  },
  {
    label: 'Türkçe',
    value: 'tr-TR',
  },
  {
    label: 'Polski',
    value: 'pl-PL',
  },
  {
    label: 'Nederlands',
    value: 'nl-NL',
  },
  {
    label: 'Italiano',
    value: 'it-IT',
  },
  {
    label: 'Tiếng Việt',
    value: 'vi-VN',
  },
  {
    label: 'Български',
    value: 'bg-BG',
  },
  {
    label: 'فارسی',
    value: 'fa-IR',
  },
  {
    label: 'Swahili (Kenya)',
    value: 'sw-KE',
  },
  {
    label: 'Luganda (Uganda)',
    value: 'lg-UG',
  },
  {
    label: 'Zulu (South Africa)',
    value: 'zu-ZA',
  },
  {
    label: 'Yoruba (Nigeria)',
    value: 'yo-NG',
  },
  {
    label: 'Amharic (Ethiopia)',
    value: 'am-ET',
  },
  {
    label: 'Hausa (Nigeria)',
    value: 'ha-NG',
  },
  {
    label: 'Igbo (Nigeria)',
    value: 'ig-NG',
  },
  {
    label: 'Afrikaans (South Africa)',
    value: 'af-ZA',
  },
  {
    label: 'Shona (Zimbabwe)',
    value: 'sn-ZW',
  },
  {
    label: 'Sesotho (South Africa)',
    value: 'st-ZA',
  },
  {
    label: 'Tigrinya (Eritrea)',
    value: 'ti-ER',
  },
  {
    label: 'Berber (Morocco)',
    value: 'ber-MA',
  },
  {
    label: 'Wolof (Senegal)',
    value: 'wo-SN',
  },
] as LocaleOptions;

export const supportLocales: string[] = [...locales, 'en', 'zh'];
