/* eslint-disable typescript-sort-keys/interface */

import qs from 'query-string';
import urlJoin from 'url-join';

import { BRANDING_NAME } from '@/const/branding';
import { DEFAULT_LANG } from '@/const/locale';
import { EMAIL_BUSINESS, EMAIL_SUPPORT, OFFICIAL_SITE, OFFICIAL_URL, X } from '@/const/url';
import { Locales } from '@/locales/resources';
import { getCanonicalUrl } from '@/server/utils/url';

import pkg from '../../package.json';

const LAST_MODIFIED = new Date().toISOString();

// Define the AUTHOR_LIST type with a string index signature to avoid type errors
type AuthorList = {
  [key: string]: {
    avatar: string;
    desc: string;
    name: string;
    url: string;
  };
};

export const AUTHOR_LIST: AuthorList = {
  hounddeepmind: {
    avatar: 'https://avatars.githubusercontent.com/u/182780129?v=4',
    desc: 'Official Organization Account',
    name: 'HoundDeepMind',
    url: 'https://github.com/HoundDeepmind',
  },
  wesamoyo: {
    avatar: 'https://avatars.githubusercontent.com/u/152051064?v=4',
    desc: 'Founder & CEO, Software Developer',
    name: 'Wesamoyo Louis',
    url: 'https://github.com/wesamoyo',
  },
};

export class Ld {
  generate({
    image = '/og/cover.png',
    article,
    url,
    title,
    description,
    date,
    locale = DEFAULT_LANG,
    webpage = {
      enable: true,
    },
  }: {
    article?: {
      author: string[];
      enable?: boolean;
      identifier: string;
      tags?: string[];
    };
    date?: string;
    description: string;
    image?: string;
    locale?: Locales;
    title: string;
    url: string;
    webpage?: {
      enable?: boolean;
      search?: string;
    };
  }) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        this.genWebSite(),
        article?.enable && this.genArticle({ ...article, date, description, locale, title, url }),
        webpage?.enable &&
          this.genWebPage({
            ...webpage,
            date,
            description,
            image,
            locale,
            title,
            url,
          }),
        image && this.genImageObject({ image, url }),
        this.genOrganization(),
      ].filter(Boolean),
    };
  }

  genOrganization() {
    return {
      '@id': this.getId(OFFICIAL_URL, '#organization'),
      '@type': 'Organization',
      'alternateName': 'HoundDeepMind',
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer support',
        'email': EMAIL_SUPPORT,
      },
      'description':
        'We are a company of engineers and developers focused on delivering cutting-edge AI solutions, fostering collaboration, and building innovative tools for businesses and developers.',
      'email': EMAIL_BUSINESS,
      'founders': [this.getAuthors(['hounddeepmind']), this.getAuthors(['wesamoyo'])],
      'image': urlJoin(OFFICIAL_SITE, '/icon-512x512.png'),
      'logo': {
        '@type': 'ImageObject',
        'height': 512,
        'url': urlJoin(OFFICIAL_SITE, '/icon-512x512.png'),
        'width': 512,
      },
      'name': 'HoundDeepMind',
      'sameAs': [
        X,
        'https://github.com/HoundDeepmind',
        'https://medium.com/@hound_ai',
        'https://www.youtube.com/@hounddeepmind',
      ],
      'url': OFFICIAL_SITE,
    };
  }

  getAuthors(ids: string[] = []): { '@type': string; [key: string]: string } {
    const defaultAuthor = {
      '@id': this.getId(OFFICIAL_URL, '#organization'),
      '@type': 'Organization',
    };
    if (!ids || ids.length === 0) return defaultAuthor;
    if (ids.length === 1 && ids[0] === 'hounddeepmind') return defaultAuthor;
    const personId = ids.find((id) => id !== 'hounddeepmind');
    if (!personId) return defaultAuthor;
    const person = AUTHOR_LIST[personId];
    if (!person) return defaultAuthor;
    return {
      '@type': 'Person',
      'name': person.name,
      'url': person.url,
    };
  }

  genWebPage({
    date,
    image,
    search,
    description,
    title,
    locale = DEFAULT_LANG,
    url,
  }: {
    breadcrumbs?: { title: string; url: string }[];
    date?: string;
    description: string;
    image?: string;
    locale?: Locales;
    search?: string;
    title: string;
    url: string;
  }) {
    const fixedUrl = getCanonicalUrl(url);
    const dateCreated = date ? new Date(date).toISOString() : LAST_MODIFIED;
    const dateModified = date ? new Date(date).toISOString() : LAST_MODIFIED;

    const baseInfo: any = {
      '@id': fixedUrl,
      '@type': 'WebPage',
      'about': {
        '@id': this.getId(OFFICIAL_URL, '#organization'),
      },
      'breadcrumbs': {
        '@id': this.getId(fixedUrl, '#breadcrumb'),
      },
      'dateModified': dateModified,
      'datePublished': dateCreated,
      'description': description,
      'image': {
        '@id': this.getId(fixedUrl, '#primaryimage'),
      },
      'inLanguage': locale,
      'isPartOf': {
        '@id': this.getId(OFFICIAL_URL, '#website'),
      },
      'name': this.fixTitle(title),
      'primaryImageOfPage': {
        '@id': this.getId(fixedUrl, '#primaryimage'),
      },
      'thumbnailUrl': image,
    };

    if (search)
      baseInfo.potentialAction = {
        '@type': 'SearchAction',
        'query-input': 'required name=search_term_string',
        'target': qs.stringifyUrl({
          query: { q: '{search_term_string}' },
          url: getCanonicalUrl(search),
        }),
      };

    return baseInfo;
  }

  genImageObject({ image, url }: { image: string; url: string }) {
    const fixedUrl = getCanonicalUrl(url);

    return {
      '@id': this.getId(fixedUrl, '#primaryimage'),
      '@type': 'ImageObject',
      'contentUrl': image,
      'inLanguage': DEFAULT_LANG,
      'url': image,
    };
  }

  genWebSite() {
    const baseInfo: any = {
      '@id': this.getId(OFFICIAL_URL, '#website'),
      '@type': 'WebSite',
      'description': pkg.description,
      'inLanguage': DEFAULT_LANG,
      'name': BRANDING_NAME,
      'publisher': {
        '@id': this.getId(OFFICIAL_URL, '#organization'),
      },
      'url': OFFICIAL_URL,
    };

    return baseInfo;
  }

  genArticle({
    description,
    title,
    url,
    author,
    date,
    locale = DEFAULT_LANG,
    tags,
    identifier,
  }: {
    author: string[];
    date?: string;
    description: string;
    identifier: string;
    locale: Locales;
    tags?: string[];
    title: string;
    url: string;
  }) {
    const fixedUrl = getCanonicalUrl(url);

    const dateCreated = date ? new Date(date).toISOString() : LAST_MODIFIED;
    const dateModified = date ? new Date(date).toISOString() : LAST_MODIFIED;

    const baseInfo: any = {
      '@type': 'Article',
      'author': this.getAuthors(author),
      'creator': author,
      'dateCreated': dateCreated,
      'dateModified': dateModified,
      'datePublished': dateCreated,
      'description': description,
      'headline': this.fixTitle(title),
      'identifier': identifier,
      'image': {
        '@id': this.getId(fixedUrl, '#primaryimage'),
      },
      'inLanguage': locale,
      'keywords': tags?.join(' ') || 'HoundDeepMind AI',
      'mainEntityOfPage': fixedUrl,
      'name': title,
      'publisher': {
        '@id': this.getId(OFFICIAL_URL, '#organization'),
      },
      'url': fixedUrl,
    };

    return {
      ...baseInfo,
    };
  }

  private getId(url: string, id: string) {
    return [url, id].join('/');
  }

  private fixTitle(title: string) {
    return title.includes(BRANDING_NAME) ? title : `${title} · ${BRANDING_NAME}`;
  }
}

export const ldModule = new Ld();
